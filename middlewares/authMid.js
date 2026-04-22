import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
// import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
    const token = authHeader.split(" ")[1];
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
 
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
    } else {
    res.status(403).json({ message: "Only admins can perform this action" });
  }
};