import express from "express";
import { jwtService } from "./services/jwt.js";

const app = express();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) res.sendStatus(401);

  if (jwtService.verifyToken(token)) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (request, response) => {
  response.json({ success: true });
});

app.get("/getToken", (req, res) => {
  res.json({ token: jwtService.getToken({ name: "prashant" }) });
});

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ data: { name: "prashant", age: 25 } });
});

app.get("/userProfile", authMiddleware, (req, res) => {
  res.json({ data: { name: "profilePage", age: 25 } });
});

app.delete("/userProfile", authMiddleware, (req, res) => {
  res.json({ data: { name: "profilePage", age: 25 } });
});

app.listen("5000", () => {
  console.log("Server is now started");
});
