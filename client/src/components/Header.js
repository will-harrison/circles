import React from 'react';
import styled from 'styled-components';
import CountDown from './CountDown';
import GameStats from './GameStats';
import GameOver from './GameOver';


const Header = (props) => {
  return (
    <Container>
      {props.timeLeft ?
        <div>
          <CountDown time={props.timeLeft} />
          <GameStats xOffset={props.xOffset} yOffset={props.yOffset} />
        </div>
        :
        <GameOver gameId={props.gameId} startNewGame={props.startNewGame} />
      }
    </Container>
  );
};

const Container = styled.div.attrs({ className: "f2" }) `
  position: absolute;
  color: #fff;
  margin: 30px auto;
  left: 0;
  right: 0;
`;

export default Header;