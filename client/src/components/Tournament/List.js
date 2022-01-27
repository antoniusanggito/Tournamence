import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class List extends Component {
  componentDidMount() {
    this.getTournaments();
  }

  async getTournaments() {
    try {
      const response = await fetch("http://localhost:5000/tournament");
      const jsonData = await response.json();
      this.props.setTournaments(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  render() {
    return (
      <>
        {this.props.tournaments.map((tournament, key) => (
          // <Link to={`/tournament/${tournament.tour_id}`}>
          <div key={key}>
            <Link to={`/tournament/${tournament.tour_id}`} state={tournament}>
              <p>{tournament.tour_id} {tournament.tour_name}</p>
            </Link>
          </div>
        ))}
      </>
    );
  }
}
