import express from "express";
import { getShard } from "./shardRouter.js";

const app = express();
app.use(express.json());

// Write to the appropriate shard
app.post("/users", async (req, res) => {
  try {
    const { id, name } = req.body;
    const db = getShard(id);

    const [rows] = await db.execute(
      "INSERT INTO users (id, name) VALUES (?, ?)",
      [id, name]
    );

    res.status(201).json({ id, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read from the appropriate shard
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = getShard(id);

    const [rows] = await db.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});