
export const validate=(schema)=>{
    return(req,res,next)=>{
        const {error}=schema.validate(req.body,{abortEarly:false});
         if (error) {
                const message =error.details[0].message;
            console.log("Validation failed",message);
            return res.status(400).json({
                 success: false,
                 error:message
             });
        }
         console.log("validation passed");
        next();
    }
}