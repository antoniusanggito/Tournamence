import React, { Component } from 'react';
import InputTournament from './InputTournament';
import ListTournaments from './ListTournaments';

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
        Tournament
        <InputTournament addTournament={this.addTournament} />
        <ListTournaments tournaments={this.state.tournaments} setTournaments={this.setTournaments} />
      </div>
    );
  }
}

export default Tournament;
