const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db")

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
// Get all players
app.get("/player", async (req, res) => {
  try {
    const allPlayers = await pool.query("SELECT * FROM player;");
    res.json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// Create a player (user)
app.post("/player", async (req, res) => {
  try {
    const { p_name } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO player(p_name) VALUES($1) RETURNING *;",
      [p_name]
    )
    res.json(newPlayer.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
})

// Get all tournaments
app.get("/tournament", async (req, res) => {
  try {
    const allTournaments = await pool.query("SELECT * FROM tournament;");
    res.json(allTournaments.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// Get tournament by id
app.get("/tournament/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await pool.query(
      "SELECT * FROM tournament WHERE tour_id = $1;", 
      [id]
    );
    res.json(tournament.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// Create a tournament
app.post("/tournament", async (req, res) => {
  try {
    const { tour_name } = req.body;
    const newTournament = await pool.query(
      "INSERT INTO tournament(tour_name) VALUES($1) RETURNING *;",
      [tour_name]
    )
    res.json(newTournament.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
})

// Join a tournament
app.post("/join", async (req, res) => {
  try {
    const { p_id, tour_id } = req.body;
    const newParticipation = await pool.query(
      "INSERT INTO participates_on(p_id, tour_id) VALUES($1, $2) RETURNING *;",
      [p_id, tour_id]
    )
    res.json(newParticipation.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
})

// Get all player in a tournament
app.get("/tournament/player/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const players = await pool.query(
      "SELECT p_id, p_name FROM tournament NATURAL JOIN participates_on NATURAL JOIN player WHERE tour_id = $1;", 
      [id]
    );
    res.json(players.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// Create a match
app.post("/match", async (req, res) => {
  try {
    const { tour_id, p1_id, p2_id } = req.body;
    const newMatch = await pool.query(
      "INSERT INTO match(tour_id, p1_id, p2_id) VALUES($1, $2, $3) RETURNING *;", 
      [tour_id, p1_id, p2_id]
    );
    res.json(newMatch.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
})

// Get all matches
app.get("/match", async (req, res) => {
  try {
    const allMatches = await pool.query("SELECT * FROM match;");
    res.json(allMatches.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// Get match by id
app.get("/match/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const match = await pool.query(
      "SELECT * FROM match WHERE match_id = $1;", 
      [id]
    );
    res.json(match.rows);
  } catch (error) {
    console.error(error.message);
  }
})

// Update match score
app.put("/match/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { score_p1, score_p2 } = req.body;
    const updateMatch = await pool.query(
      "UPDATE match SET score_p1 = $1, score_p2 = $2 WHERE match_id = $3;", 
      [score_p1, score_p2, id]
    );
    res.json("Match score updated");
  } catch (error) {
    console.error(error.message);
  }
})

// Delete a match
app.delete("/match/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMatch = await pool.query(
      "DELETE FROM match WHERE match_id = $1;",
      [id]
    );
    res.json("Match deleted")
  } catch (error) {
    console.error(error.message);
  }
})

// Start server
app.listen(5000, () => {
  console.log("Server started on port 5000.")
})