import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tournament from './components/Tournament';
import TournamentDetail from './components/Tournament/Detail';
import Player from './components/Player';
import Match from './components/Match';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/tournament" element={<Tournament />} />
          <Route path="/tournament/:id" element={<TournamentDetail />} />
          <Route path="/player" element={<Player />} />
          <Route path="/match" element={<Match />} />
        </Routes>
      </div>
    )
  }
}

export default App;
