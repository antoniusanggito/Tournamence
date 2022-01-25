import React, { Component } from 'react';
import ListPlayers from './ListPlayers';

export default class Match extends Component {
  render() {
    return (
      <div>
        Player
        <ListPlayers />
      </div>
    );
  }
}
