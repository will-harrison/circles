import React, { Component } from 'react';
import api from '../api';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    };
  }

  componentDidMount() {
    let { gameId } = this.props;
    api.turns.getGameStats(gameId)
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Stats;