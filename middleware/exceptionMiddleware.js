export const handleError = (err, req, res, next) => {
    console.log(err);
    if (err.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
    });
}