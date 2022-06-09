import React from "react";

import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Button from '../components/Button/index.jsx'



const SSection = styled(Section)`
  padding-bottom: 200px;
`



const ImageContainer = styled.div`
  max-width: 780px;
  width: 100%;
  margin-top: -140px;
  @media (max-width: 600px) {
    margin-top: -90px;
  }
  @media (max-width: 400px) {
    margin-top: -65px;
  }
  @media (max-width: 300px) {
    margin-top: -40px;
  }
`

const Image = styled.img`
  height: auto;
  max-width: 100%;
 // margin-top: -140px;
`

const Center = styled.div`
  max-width: 1098px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`


const Subtext = styled(Typography)`
  max-width: 640px;
`



function Section2() {
    return (
        <SSection
            gradient
        >
            <ImageContainer>
                <Image
                    alt="Hopr logo"
                    src={'/images/derp_top-header.png'}
                />
            </ImageContainer>

            <Typography type="h2">
                D.E.R.P.<br/>
                DUMB ETHEREUM RPC PROVIDER
            </Typography>

            <Subtext>
                Add the DERP RPC endpoint to your crypto wallet to see exactly what information is being leaked about you every time you connect to a crypto service.
            </Subtext>

            <Button
                hopr
            >
                SETUP
            </Button>


        </SSection>
    );
}

export default Section2;
