import React, { Component } from 'react';
import ListMatches from './ListMatches';
import InputMatch from './InputMatch';

export default class Match extends Component {
  render() {
    return (
      <div>
        <h2>Match</h2>
        <ListMatches />
        <InputMatch />
      </div>
    );
  }
}
