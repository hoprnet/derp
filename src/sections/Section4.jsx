import React from "react";
import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Button from '../components/Button'

const SSection = styled(Section)`
  padding-bottom: 40px;
  padding-top: 40px;
  align-items: flex-start;
`

function Section4() {
    return (
        <SSection
            yellow
            center
        >
            <Typography
                type="h6"
                className="mb32"
            >
                Want to know how RPCh – the first private Ethereum RPC provider – fixes all this?
            </Typography>
            <Button
                hopr
                href='https://hoprnet.org/rpch'
                target="_blank"
            >
                TELL ME MORE
            </Button>
        </SSection>
    );
}

export default Section4;
