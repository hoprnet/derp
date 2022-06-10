import React from "react";

import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Derp from '../components/DERP/index.jsx'

const SSection = styled(Section)`
  padding-bottom: 40px;
  padding-top: 40px;
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
  max-width: 960px;
`


function Section5() {
    return (
        <SSection>
            <Derp/>
        </SSection>
    );
}

export default Section5;
