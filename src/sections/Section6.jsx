import React from "react";

import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Brick from '../components/Brick/index.jsx'


const SSection = styled(Section)`
  padding-bottom: 40px;
  padding-top: 40px;
`

function Section3() {
    return (
        <SSection
            id={'Section6'}
        >
            <Typography type="h2">
                BE PART OF THE HOPR ECOSYSTEM
            </Typography>
            <Brick
                text={"HOPR is building the transport layer privacy needed to make web3 work. Work with us to build dApps that change data privacy for good."}
                image={"/images/bounty.svg"}
                reverse
                noShadow
                centerText
            />

        </SSection>
    );
}

export default Section3;
