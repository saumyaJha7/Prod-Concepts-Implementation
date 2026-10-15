import express from "express";
import driver from "./neo4j.js";

const app = express();
app.use(express.json());

// 1. Create a person
app.post("/people", async (req, res) => {
  const session = driver.session();

  try {
    const { name, age } = req.body;

    const result = await session.run(
      `CREATE (p:Person {name: $name, age: $age})
       RETURN p`,
      { name, age }
    );

    res.json({
      person: result.records[0].get("p").properties,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

// 2. Get all people
app.get("/people", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (p:Person) RETURN p"
    );

    res.json(
      result.records.map((record) =>
        record.get("p").properties
      )
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

// 3. Create a friendship
app.post("/friendships", async (req, res) => {
  const session = driver.session();

  try {
    const { name1, name2 } = req.body;

    const result = await session.run(
      `MATCH (a:Person {name: $name1})
       MATCH (b:Person {name: $name2})
       MERGE (a)-[:FRIENDS_WITH]->(b)
       RETURN a.name AS person1, b.name AS person2`,
      { name1, name2 }
    );

    if (result.records.length === 0) {
      return res.status(404).json({
        error: "One or both people were not found",
      });
    }

    res.json(result.records[0].toObject());
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

// 4. Delete a person
app.delete("/people/:name", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (p:Person {name: $name})
       DETACH DELETE p
       RETURN count(p) AS deleted`,
      { name: req.params.name }
    );

    const deleted = result.records[0].get("deleted").toNumber();

    if (deleted === 0) {
      return res.status(404).json({
        error: "Person not found",
      });
    }

    res.json({ message: "Person deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await session.close();
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});