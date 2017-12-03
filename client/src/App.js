import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';
import Splash from './components/Splash';
import Header from './components/Header';
import api from './api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      gameDuration: 15,
      timeLeft: "",
      gameStart: "",
      gameId: "",
      user: "",
      turn: {
        cx: this.randRange(0, window.innerWidth),
        cy: this.randRange(0, window.innerHeight),
        r: this.randRange(100, 800),
        xOffset: "",
        yOffset: "",
        strokeWidth: this.randRange(8, 14),
        turnStart: "",
        turnDuration: ""
      }
    }
  }

  startNewGame = () => {
    let user = this.state.user;
    console.log(user)
    api.games.createGame(user).then(game => {
      console.log(game)
      this.setState(state => {
        return {
          gameStart: new Date(),
          timeLeft: this.state.gameDuration,
          gameId: game.id,
          started: true
        }
      }, () => {
        this.countDown()
        this.drawCircle();
      })
    })
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      let user = jwt.decode(token).id;
      this.setState(state => {
        return {
          ...state,
          user
        }
      })
    } else {
      const defaultUser = 1;
      this.setState(state => {
        return {
          ...state,
          user: defaultUser
        };
      });
    }
  }

  countDown = () => {
    let { gameDuration, gameStart } = this.state;
    if (gameDuration + (gameStart - new Date()) / 1000 >= 0) {
      setTimeout(() => {
        this.setState(state => {
          return {
            ...state,
            timeLeft: gameDuration + (gameStart - new Date()) / 1000
          }
        })
        this.countDown();
      }, 500)
    } else {
      this.setState(state => {
        return {
          ...state,
          timeLeft: 0
        }
      })
    }
  }

  randRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shrinkCircle = () => {
    let { r } = this.state.turn;
    if (r > 1) {
      this.setState(state => {
        return {
          turn: {
            ...state.turn,
            r: state.turn.r - 1
          }
        }
      }, () => {
        setTimeout(() => {
          this.shrinkCircle()
        }, 16)
      })
    }
  }

  drawCircle = () => {
    this.setState(state => {
      return {
        ...state,
        turn: {
          ...state.turn,
          cx: this.randRange(0, window.innerWidth),
          cy: this.randRange(0, window.innerHeight),
          r: this.randRange(50, 800),
          strokeWidth: this.randRange(5, 12),
          turnStart: new Date()
        }
      };
    }, () => this.shrinkCircle());
  }

  circleClicked = (e) => {
    let { timeLeft, turn, gameId } = this.state;
    let { cx, cy } = this.state.turn;
    if (timeLeft > 0) {
      let duration = new Date() - turn.turnStart;
      let xOffset = e.pageX - cx;
      let yOffset = e.pageY - cy;
      this.setState(state => {
        return {
          turn: {
            ...state.turn,
            xOffset: xOffset,
            yOffset: yOffset,
            turnDuration: duration,
          }
        };
      }, () => {
        api.turns.createTurn({ gameId, xOffset, yOffset, duration })
        this.drawCircle();
      });
    }
  }

  render() {
    let { timeLeft, started, gameId } = this.state;
    let { cx, cy, r, xOffset, yOffset } = this.state.turn;
    return (
      <Container onClick={this.circleClicked}>
        {!started && <Splash startNewGame={this.startNewGame} />}
        {started &&
          <div>
            <Header timeLeft={timeLeft} xOffset={xOffset} yOffset={yOffset} startNewGame={this.startNewGame} gameId={gameId} />
            <svg
              width={"100%"}
              height={"100%"}
              viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`} >
              <circle
                cx={cx}
                cy={cy}
                r={r}
                stroke={`#fff`}
                strokeWidth={2}
                fill={"transparent"} />
            </svg>
          </div>
        }
      </Container>
    );
  }
}

const Container = styled.div.attrs({ className: "avenir" }) `
  height: 100vh;
  width: 100vw;
`;

export default App;
