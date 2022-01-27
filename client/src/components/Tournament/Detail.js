import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// Using functional component to get data passed
function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const tournament = location.state;
  const [playerId, setPlayerId] = useState("");
  const [tourPlayers, setTourPlayers] = useState([]);
  const [forceUpdate, setforceUpdate] = useState(false);

  useEffect(() => {
    getPlayers();
  }, [forceUpdate]);

  const getPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tournament/player/${id}`);
      const jsonData = await response.json();
      setTourPlayers(jsonData);
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
      const jsonData = await response.json();
      // console.log(jsonData);
      setforceUpdate((forceUpdate) => !forceUpdate);
      setPlayerId("");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <h2>{tournament.tour_id} {tournament.tour_name}</h2>
      {tourPlayers.map((player, key) => (
        <div key={key}>
          <p>{player.p_id} {player.p_name}</p>
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          value={playerId} 
          onChange={e => setPlayerId(e.target.value)} 
        />
        <button type="submit">Join</button>
      </form>
    </>
  );
}

export default Detail;