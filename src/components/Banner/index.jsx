import React from 'react';
import styled from "@emotion/styled";
import MuiButton from '@mui/material/Button'

const SBanner = styled.div`
  height: 58px;
  background: linear-gradient(#000050,#0000b4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`

const Text = styled.div`
    font-family: 'Source Code Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 38px;
    /* or 211% */
    
    letter-spacing: 0.25px;
    
    color: #FFFFFF;
`

const Button = styled(MuiButton)`
  background: #FFFFFF;
  border-radius: 42.3px;
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 45px;
  /* or 250% */

  text-align: center;
  letter-spacing: 0.25px;

  color: #414141;

  &:hover {
    background-color: #dfdfdf;
    color: #414141;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.75);
    color: #000;
  }
`


const Banner = () =>
    <SBanner>
        <Text>Add the DERP RPC endpoint to your crypto wallet</Text>
        <Button
            variant="contained"
        >SETUP</Button>
    </SBanner>

export default Banner;
