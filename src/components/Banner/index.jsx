import React from 'react';
import styled from "@emotion/styled";
import GrayButton from '../Button/gray.jsx'

const SBanner = styled.section`
  background: linear-gradient(#000050,#0000b4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding-right: 8px;
  padding-left: 8px;
  padding: 10px;
  @media (max-width: 440px) {
    flex-direction: column;
    gap: 5px;
    button {
      
    }
  }
  
`

const Text = styled.div`
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 38px;
    /* or 211% */
    
    letter-spacing: 0.25px;
   // padding: 10px;
    color: #FFFFFF;
`

const Banner = () =>
    <SBanner>
        <Text>Add the DERP RPC endpoint to your crypto wallet</Text>
        <GrayButton
            variant="contained"
        >SETUP</GrayButton>
    </SBanner>

export default Banner;
