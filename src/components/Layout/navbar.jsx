import React from 'react';
import styled from "@emotion/styled";
import Logo from './logo.svg'

const SNavBar = styled.div`
  height: 68px;
  position: fixed;
  top: 0;
  width: 100vw;
  background: white;
  z-index: 10;
`

const Container = styled.div`
  height: 100%;
  max-width: 1096px;
  margin: auto;
  display: flex;
  align-items: center;
`

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  margin-left: 10px;
`

const NavBar = () => {
  return (
    <SNavBar>
      <Container>
        <LogoImage
          alt="Hopr logo"
          src={Logo}
        />
      </Container>
    </SNavBar>
  );
};

export default NavBar;
