import React from "react";
import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Button from '../components/Button'

import PoweredByHopr from '../components/PoweredByHOPR'

const SSection = styled(Section)`
  padding-bottom: 40px;
  padding-top: 40px;
  align-items: flex-start;
  background-image: url('/images/RPCh-BG.jpg');
  background-position: top;
  background-size: cover;
`

const SButton = styled(Button)`

`

function Section4() {
    return (
        <SSection
            center
        >
            <Typography
                type="h6"
                className="mb32"
                style={{color: '#000050'}}
            >
                Want to know how RPCh – the first private Ethereum RPC provider – fixes all this?
            </Typography>
            <Button
                hopr
                href='https://rpch.net/'
                target="_blank"
                style={{
                    width: 'unset', 
                    maxWidth: 'unset',
                    height: 'unset',
                    lineHeight: '28px'
                }}
            >
                Tell me more to Our solution: RPCh
            </Button>
            <PoweredByHopr
                style={{
                    marginTop: '20px',
                    marginBottom: '-16px',
                }}
            />
        </SSection>
    );
}

export default Section4;
