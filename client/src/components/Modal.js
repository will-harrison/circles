import React from 'react';
import styled from 'styled-components';

const Modal = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 75vh;
  height: 75vh;
  background-color: rgba(0, 0, 0, .6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 100;
`;

export default Modal;