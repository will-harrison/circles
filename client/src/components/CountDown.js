import React from 'react';
import styled from 'styled-components';

const CountDown = (props) => {
  return (
    <Counter>
      {props.time > 0 && <Title>Time Left</Title>}
      {props.time > 0 ? Math.floor(props.time) : "Game Over"}
    </Counter>
  );
};

const Counter = styled.div.attrs({ className: "f1" }) `
  position: absolute;
  color: #fff;
  user-select: none;
  text-align: center;
  margin: 35px auto;
  left: 0;
  right: 0
  `;

const Title = styled.div.attrs({ className: "f2" }) `

`;

export default CountDown;