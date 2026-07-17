import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");

    if (!authorization) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Access denied. Invalid token format.",
      });
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Access denied. User no longer exists.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default verifyToken;
