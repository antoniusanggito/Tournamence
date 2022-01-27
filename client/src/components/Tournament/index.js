import React, { Component } from 'react';
import InputTournament from './Input';
import ListTournaments from './List';

export class Tournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: []
    };
  }

  addTournament = newTournament => {
    this.setState(({ tournaments }) => ({ tournaments: [ ...tournaments, newTournament ] }));
  }

  setTournaments = newTournaments => {
    this.setState({ tournaments: newTournaments });
  }

  render() {
    return (
      <div>
        <h2>Tournament</h2>
        <InputTournament addTournament={this.addTournament} />
        <ListTournaments tournaments={this.state.tournaments} setTournaments={this.setTournaments} />
      </div>
    );
  }
}

export default Tournament;
