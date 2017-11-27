import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../api';
import Stats from './Stats';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.buildStats();
  }

  buildStats = () => {
    let { gameId } = this.props;
    console.log(gameId)
    api.turns.getGameStats({ gameId }).then(turns => {
      console.log(turns);
    })
  }

  render() {
    let { startNewGame } = this.props;
    return (
      <Container>
        <Stats />
        <Status>Game Over</Status>
        <NewGame onClick={startNewGame}>New Game</NewGame>
      </Container>
    );
  }
}

const Container = styled.div.attrs({ className: "f1" }) `
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -10%;
`;
const Status = styled.div.attrs({ className: "f1 fw1" }) `
  user-select: none;
`;

const NewGame = styled.div.attrs({ className: "f3 fw1" }) `
  border: 1px solid #fff;
  padding: 5px 15px;
  width: 200px;
  margin: 20px auto;
  transition: all .3s;
  user-select: none;
  text-align: center;
  
  &:hover {
    background-color: #fff;
    color: #336699;
  }
  `

export default GameOver;