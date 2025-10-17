
export const attachCurrentUser = (req, res, next) => {
  // If verifyToken middleware already added req.user from JWT
  if (req.user) {
    // Store in sequelize options so hooks can access
    req.sequelizeOptions = { user: req.user };
  } else {
    req.sequelizeOptions = {};
  }
  next();
};
