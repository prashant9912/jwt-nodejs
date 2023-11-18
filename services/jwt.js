import "dotenv/config";
import jwt from "jsonwebtoken";

export const jwtService = {
  getToken: (json) => {
    return jwt.sign(json, process.env.jwtKey, { expiresIn: "1h" });
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.jwtKey);
    } catch {
      return false;
    }
  },
};
