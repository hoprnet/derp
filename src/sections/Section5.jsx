import React from "react";
import styled from "@emotion/styled";
import Section from '../components/Section/index.jsx'
import Derp from '../components/DERP/index.jsx'

const SSection = styled(Section)`
  padding-bottom: 40px;
  padding-top: 40px;
`

function Section5() {
    return (
        <SSection
            id={'Section5'}
        >
            <Derp/>
        </SSection>
    );
}

export default Section5;
