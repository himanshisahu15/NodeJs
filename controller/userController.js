import xlsx from 'xlsx';
import { importUserService, listUserService } from '../service/userService.js';
import { schema } from '../middleware/schema.js';

export const uploadAndImportUserFile = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                error: "No file uploaded"
            })
        }

        const workbook = xlsx.read(file.buffer, { type: "buffer" });
        //gets first sheet name
        const sheetName = workbook.SheetNames[0];
        //convert sheet data into array of object
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const validUsers = [];

        for (const r of rows) {
            const user = {
                id: Number(r.id ?? r.ID ),
                firstName: (r.firstName || r.firstname || "").trim(),
                lastName: (r.lastName || r.lastname || "").trim(),
                age: Number(r.age ?? 0) ,
                city: (r.city || r.City || "").trim(),
            }
            const { error, value } = schema.validate(user);
            if (!error) {
                validUsers.push(value);
            }
        };

        if (!validUsers.length) {
            return res.status(400).json({
                success: false,
                error: "No valid user records found."
            });
        }

        await importUserService(validUsers);

        res.status(200).json({
            success: true,
            message: "Users imported successfully",
            importedCount: validUsers.length,
        });
    } catch (err) {
        console.error("Import Error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to import users"
        });
    }
}

export const getAllUser = async (req, res) => {
    try {
        let { page = 1, pageSize = 10, q = "", sortBy = "firstName", orderBy = "asc" } = req.query;

        page = Math.max(1, parseInt(page));
        pageSize = Math.min(100, Math.max(1, parseInt(pageSize)));
        const { rows, count } = await listUserService({ page, pageSize, q, sortBy, orderBy });

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }
        res.status(200).json({
            success: true,
            data: rows,
            page,
            pageSize,
            total: count,
            totalPages: Math.ceil(count / pageSize),
            sortBy,
            orderBy,
            q,
        });
    } catch (err) {
        console.error("List Error:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}