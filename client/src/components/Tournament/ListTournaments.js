import React, { Component } from 'react';

export default class ListTournaments extends Component {
  componentDidMount() {
    this.getTournaments();
  }

  async getTournaments() {
    console.log("getting")
    try {
      const response = await fetch("http://localhost:5000/tournament");
      const jsonData = await response.json();
      // console.log(jsonData);
      this.props.setTournaments(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  render() {
    console.log(this.props.tournaments);
    return (
      <>
        {this.props.tournaments.map((tournament, key) => (
          <div key={key}>
            <p>{tournament.tour_id} {tournament.tour_name}</p>
          </div>
        ))}
      </>
    );
  }
}
