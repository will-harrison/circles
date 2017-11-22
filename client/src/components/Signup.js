import React, { Component } from 'react';
import styled from 'styled-components';
import vgng from 'video-game-name-generator';
import Modal from './Modal';
import api from '../api';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamerName: "",
      password: "",
      generatedName: "",
      authType: [
        {
          name: "signup",
          title: "Sign Up",
          process: this.signUp
        },
        {
          name: "login",
          title: "Log In",
          process: this.logIn
        }

      ]
    };
  }

  componentDidMount() {
    this.setState(state => {
      return {
        generatedName: vgng.random()
      };
    });
  }

  onInputChange = (e) => {
    e.persist();
    this.setState(state => {
      return {
        ...state,
        [e.target.name]: e.target.value
      };
    });
  }

  logIn = () => {
    let { gamerName, password } = this.state;
    api.users.login({ gamerName, password }).then(user => {
    })
  }

  render() {
    console.log(this.state)
    return (
      <Container>
        <Modal>
          <Title>Sign Up</Title>
          <form>
            <InputRow>
              <Label>Gamer Name</Label>
              <Input
                name={"gamerName"}
                value={this.state.gamerName}
                onChange={this.onInputChange}
                placeholder={this.state.generatedName}
                autoFocus />
            </InputRow>
            <InputRow>
              <Label>Password</Label>
              <Input
                type={"password"}
                name={"password"}
                value={this.state.password}
                onChange={this.onInputChange} />
            </InputRow>
            <InputRow>
              <Button type={"submit"}>SEND</Button>
            </InputRow>
          </form>
        </Modal>
      </Container>
    );
  }
};

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input.attrs({ className: "w5-ns f5 input-reset ba b--black-20 pv1 ph1 border-box georgia" }) `
`;
const InputRow = styled.div`
  padding: 5px 0;
  margin-bottom: 5px;
`;
const Title = styled.div.attrs({ className: "f1 fw1" }) `
  margin-top: -50px;
  margin-bottom: 25px;
  color: #fff;
`;

const Label = styled.div.attrs({ className: "f4 fw1" }) `
  color: #fff;
`;

const Button = styled.button.attrs({ className: "f5 fw1" }) `
border: 1px solid #fff;
border-radius: 0;
padding: 5px 15px;
width: 30%;
margin: 5px auto;
transition: all .3s;
user-select: none;
text-align: center;
display: flex;

&:hover {
  background-color: #fff;
  color: #000;
  font-weight: 400;
}
`;

export default Signup;