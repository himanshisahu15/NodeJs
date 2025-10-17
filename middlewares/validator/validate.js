// export const validate = (schema) => {
//     return (req, res, next) => {
      
//         const {error} = schema.validate(req.body);
//         if (error) {
//                 const message =error.details[0].message;
//             console.log("Validation failed"),message
//             return res.status(400).json({
//                  success: false,
//                  error:message
//              });
//         }
//          console.log("validation passed");
//         next();
//     }
// }
export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // run async validation
      await schema.validateAsync(req.body, {context: { id: req.params.id } , abortEarly: false });
      console.log("Validation passed ");
      next();
    } catch (error) {
      console.log("Validation failed ", error.message);

      return res.status(400).json({
        success: false,
        message: error.message || "Validation error",
      });
    }
  };
};
