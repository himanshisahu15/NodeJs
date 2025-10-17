import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from "../config/storjConfig.js";
import XLSX from "xlsx";

const allowedTypes = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel"
];

export const generatePresignedUrl = async (filename) => {

  const command = new PutObjectCommand({
    Bucket: process.env.STORJ_BUCKET,
    Key: filename,
    ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return uploadUrl;
};

export const getPreSignedUrl = async (req, res) => {
  try {
    const { filename } = req.query;
    if (!filename) {
      return res.status(400).send("Filename is required")
    }
    if (!filename.endsWith(".xlsx") && !filename.endsWith(".xls")) {
      return res.status(400).json({ error: "Invalid file type. Only Excel files are allowed." });
    }

    const uploadUrl = await generatePresignedUrl(filename);

    res.json({
      uploadUrl, filename
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating upload url")
  }
}

export const uploadAndCountController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded");
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type. Only Excel files are allowed." });
    }

    // Parse Excel file from buffer
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const rowCount = jsonData.length;

    if (rowCount === 0) {
      return res.status(400).send("Excel sheet is empty. Cannot upload.");
    }

    const contentType = file.mimetype || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const uploadUrl = await generatePresignedUrl(file.originalname, contentType);

    res.json({ uploadUrl, filename: file.originalname, rowCount });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing file");
  }
};
