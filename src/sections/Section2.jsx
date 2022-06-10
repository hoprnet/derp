import React from "react";

import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Brick from '../components/Brick/index.jsx'



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
  max-width: 960px;
`



function Section2() {
    return (
        <SSection
            yellow
        >
            <Typography type="h2">
                I THOUGHT WEB3<br/>
                WAS PRIVATE?<br/>
                NOT A CHANCE.
            </Typography>

            <Subtext>
                Crypto services are flashier and more user-friendly than ever, but few understand what goes on under the hood. The DERP tool from HOPR duplicates the functionality of a typical RPC provider, but it makes explicit the sheer amount of identifying data these services expose. As you’ll see, this happens as soon as you connect your wallet, and all without you needing to make a transaction.
            </Subtext>
            <Subtext className='mb80'>
                Add the DERP RPC endpoint to your crypto wallet to see exactly what information is being leaked about you every time you connect to a crypto service.
            </Subtext>
            <Brick
                title="HOW IS THIS DONE?"
                text="As soon as you start a wallet, it gets in touch with the RPC provider to find out basic information such as your token balances and network (Ethereum, Polygon, Gnosis Chain, etc.)"
                image="/images/hopr_derp.gif"
                button="LEARN MORE"
                buttonHref="https://medium.com/hoprnet/intro-to-d-e-r-p-9e09a5e54904"
            />
        </SSection>
    );
}

export default Section2;
