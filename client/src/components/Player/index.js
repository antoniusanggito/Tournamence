import React, { Component } from 'react';
import ListPlayers from './ListPlayers';

export default class Match extends Component {
  render() {
    return (
      <div>
        <h2>Player</h2>
        <ListPlayers />
      </div>
    );
  }
}
