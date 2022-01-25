import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <Link to="/tournament">Tournament</Link> |{" "}
        <Link to="/player">Player</Link> |{" "}
        <Link to="/match">Match</Link>
      </div>
      );
  }
}

export default Navbar;
