import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowed = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv",
        ];
        if (!allowed.includes(file.mimetype)) {
            const error = new Error("Invalid file type. Only Excel/CSV allowed.");
            error.code = "INVALID_FILE_TYPE";
            return cb(error, false);
        }
        cb(null, true);
    },
});

//stored file as a buffer in ram
//useful when dont need of physical copy in server
//cb means accept or reject the file