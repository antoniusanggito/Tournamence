import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Using functional component to get data passed
function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const tournament = location.state;
  const [playerId, setPlayerId] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);
  const [tourPlayers, setTourPlayers] = useState([]);
  const [tourMatches, setTourMatches] = useState([]);
  const [forceUpdate, setforceUpdate] = useState(false);

  useEffect(() => {
    getAllPlayers();
    getPlayers();
    getMatches();
  }, [forceUpdate]);

  const getAllPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/player`);
      const jsonData = await response.json();
      setAllPlayers(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tournament/${id}/player`);
      const jsonData = await response.json();
      setTourPlayers(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getMatches = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tournament/${id}/match`);
      const jsonData = await response.json();
      setTourMatches(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { p_id: playerId, tour_id: id };
      const response = await fetch("http://localhost:5000/join", {
        method: 'POST',
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(body)
      });
      setforceUpdate((forceUpdate) => !forceUpdate);
      setPlayerId("");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <h2>{tournament.tour_id}. {tournament.tour_name}</h2>
      <h3>Players</h3>
      {tourPlayers.map((player, key) => (
        <div key={key}>
          <p>{player.p_id} {player.p_name}</p>
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <select name="players" onChange={e => setPlayerId(e.target.value)}>
          <option value={null} selected disabled></option>
          {allPlayers.map((player, key) => (
            <option key={key} value={player.p_id}>{player.p_name}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      <h3>Matches</h3>
      {tourMatches.map((match, key) => (
        <div key={key}>
          <p>{match.p1_name} ({match.score_p1}) - ({match.score_p2}) {match.p2_name}</p>
        </div>
      ))}
    </>
  );
}

export default Detail;