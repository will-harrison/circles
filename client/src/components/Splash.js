import React, { Component } from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import Auth from './Auth';
import Signup from './Signup';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      authType: "signup",
      authed: true
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const validToken = token && jwt.decode(token).id;
    let authed = validToken ? true : false;
    this.setState(state => {
      return {
        ...state,
        authed
      }
    })
  }

  setAuthType = (type) => {
    this.setState(state => {
      return {
        ...state,
        modal: true,
        authType: type
      }
    })
  }

  signOut = () => {
    console.log("signOut")
    localStorage.removeItem("token");
    this.setState(state => {
      return {
        ...state,
        authed: false
      }
    })
  }

  isAuthed = (authed) => {
    this.setState(state => {
      return {
        ...state,
        authed,
        modal: false
      }
    })
  }

  cancelClick = (e) => {
    this.setState(state => {
      return {
        ...state,
        modal: false
      }
    })
  }

  render() {
    let { modal, authType, authed } = this.state;
    let { startNewGame } = this.props;
    return (
      <div>
        {modal &&
          <Signup
            authType={authType}
            isAuthed={(authed) => this.isAuthed(authed)}
            cancelClick={this.cancelClick} />
        }
        <Container modal={modal}>
          <Title>Circles</Title>
          <Instructions>
            <div>Click or touch the center of the circle.</div>
            <div>Be fast. Be accurate.</div>
          </Instructions>
          <NewGame onClick={startNewGame}>New Game</NewGame>
          <Auth
            authed={authed}
            authType={(type) => this.setAuthType(type)}
            onSignOut={this.signOut} />
        </Container>
      </div>
    );
  }
};

const Container = styled.div`
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: blur(${props => props.modal ? "5px" : "0"})
  `;

const Title = styled.div.attrs({ className: "f-headline fw1" }) `
  text-transform: uppercase;  
`;

const Instructions = styled.div.attrs({ className: "f1 fw1" }) `
  text-align: center;
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
    cursor: pointer;
  }
`


export default Splash;