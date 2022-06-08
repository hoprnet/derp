import React from "react";

import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Button from '../components/Button/index.jsx'



const SSection = styled(Section)`
  padding-bottom: 120px;
  padding-top: 120px;
`


const Image = styled.img`
  height: 590px;
  width: auto;
  margin-top: -140px;
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



function Section1() {
    return (
        <SSection
            yellow
        >
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

export default Section1;
