import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentName : ""
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { tour_name: this.state.tournamentName };
      const response = await fetch("http://localhost:5000/tournament", {
        method: 'POST',
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(body)
      });
      const jsonData = await response.json();
      this.props.addTournament(jsonData);
      this.setState({tournamentName: ""});
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <input 
            type="text" 
            value={this.state.tournamentName} 
            onChange={e => this.setState({ tournamentName: e.target.value })} 
          />
          <button type="submit">Create</button>
        </form>
      </>
    );
  }
}
