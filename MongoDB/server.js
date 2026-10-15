import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db.js";

const app = express();
app.use(express.json());

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    age: Number,
  })
);

// Create
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Read all
app.get("/users", async (req, res) => {
  res.json(await User.find());
});

// Read one
app.get("/users/:id", async (req, res) => {
  res.json(await User.findById(req.params.id));
});

// Update
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

// Delete
app.delete("/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ message: "User deleted" });
});

await connectDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});