import React from 'react';
import styled from 'styled-components';

const GameStats = (props) => {
  return (
    <Container>
      <div>X: {props.xOffset}</div>
      <div>Y: {props.yOffset}</div>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;  
  user-select: none;
  color: #fff;
`;

export default GameStats;