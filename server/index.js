const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db")

// middleware
app.use(cors());
app.use(express.json());

// routes
// POST a match
app.post("/match", async (req, res) => {
  try {
    console.log(req.body);
    const { player_1, player_2 } = req.body;
    const newMatch = await pool.query(
      "INSERT INTO match(player_1, player_2) VALUES($1, $2) RETURNING *", 
      [player_1, player_2]
    );
    res.json(newMatch.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
})

// GET all matches
app.get("/match", async (req, res) => {
  try {
    const allMatches = await pool.query("SELECT * FROM match");
    res.json(allMatches.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// GET match by id
app.get("/match/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const match = await pool.query(
      "SELECT * FROM match WHERE match_id = $1", 
      [id]
    );
    res.json(match.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// PUT a match
app.put("/match/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { player_1, player_2 } = req.body;
    const updateMatch = await pool.query(
      "UPDATE match SET player_1 = $1, player_2 = $2 WHERE match_id = $3", 
      [player_1, player_2, id]
    );
    res.json("Match updated");
  } catch (error) {
    console.error(error.message);
  }
})

// DELETE a match
app.delete("/match/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMatch = await pool.query(
      "DELETE FROM match WHERE match_id = $1",
      [id]
    );
    res.json("Match deleted")
  } catch (error) {
    console.error(error.message);
  }
})

app.listen(5000, () => {
  console.log("Server started on port 5000")
})