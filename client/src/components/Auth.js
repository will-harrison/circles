import React from 'react';
import styled from 'styled-components';

const Auth = ({ authed, authType, onSignOut }) => {
  return (
    <Container>
      {!authed &&
        <div>
          <Title>
            <Links onClick={() => authType("signup")}>Sign Up</Links> or &nbsp;
            <Links onClick={() => authType("login")}>Log In</Links></Title>
          <Title>to save your scores.</Title>
        </div>
      }
      {authed && <Links onClick={onSignOut}>Sign Out</Links>}
    </Container>
  );
};

const Container = styled.div`
  text-align: center
`;

const Title = styled.div.attrs({ className: "fw1" }) ``

const Links = styled.span.attrs({ className: "fw1" }) `
  &:hover {
    text-decoration: underline;
    color: #ddd;
    cursor: pointer;
  }
`;

export default Auth;