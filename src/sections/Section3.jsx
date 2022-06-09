import React from "react";

import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Brick from '../components/Brick/index.jsx'



const SSection = styled(Section)`
  padding-bottom: 80px;
  padding-top: 80px;
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


function Section3() {
    return (
        <SSection>
            <Typography type="h2">
                FURTHER EXAMPLES
            </Typography>
            <Brick
                className='mbt80'
                title="METAMASK LINKABILITY"
                text="When you connect to your MetaMask, it needs to find out your balance(s) so it can populate the UI. To achieve this, a single call (eth_call) is sent requesting the balance of ALL your addresses. But it gets worse! Remember, the RPC provider knows your IP address."
                image="/images/hopr_rpc_linkability.gif"
                button="LEARN MORE"
                reverse
            />
            <Brick
                className='mbt80'
                title="NFT FRONTRUN"
                text="When you bid on an NFT in a marketplace, your wallet will send a request to estimate the necessary gas price. As part of this request, the RPC endpoint will learn your IP address, your wallet address, the precise NFT you intend to buy and the amount of your bid."            image="/images/hopr_rpc_linkability.gif"
                image="/images/hopr_nft_frontrun.gif"
                button="LEARN MORE"
            />
            <Brick
                className='mbt80'
                title="DEX MEV"
                text="When you use a DEX like Uniswap, many RPC requests are needed to populate the UI with data about your balances, the token pair you want to swap and details like price and slippage. All this information is sent to the RPC provider before your transaction is broadcast."
                image="/images/hopr_dex_mev.gif"
                button="LEARN MORE"
                reverse
            />
        </SSection>
    );
}

export default Section3;
