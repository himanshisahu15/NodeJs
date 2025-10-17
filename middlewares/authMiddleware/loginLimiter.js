import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per IP
  keyGenerator: (req, res) => req.body.email,
  message: "Too many login attempts, try again later"
});

export default loginLimiter