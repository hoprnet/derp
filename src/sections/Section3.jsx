import React from "react";
import styled from "@emotion/styled";
import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Brick from '../components/Brick/index.jsx'


const SSection = styled(Section)`
  padding-bottom: 80px;
  padding-top: 80px;
`

function Section3() {
    return (
        <SSection
            id={'Section3'}
        >
            <Typography type="h2">
                FURTHER EXAMPLES
            </Typography>
            <Brick
                className='mbt80'
                title="METAMASK LINKABILITY"
                text="When you connect to your MetaMask, it needs to find out your balance(s) so it can populate the UI. To achieve this, a single call (eth_call) is sent requesting the balance of ALL your addresses. But it gets worse! Remember, the RPC provider knows your IP address."
                image="/images/hopr_rpc_linkability.gif"
                button="LEARN MORE"
                buttonHref="https://medium.com/hoprnet/derp-example-1-metamask-linkability-6b26ba42072f"
                reverse
            />
            <Brick
                className='mbt80'
                title="NFT FRONTRUN"
                text="When you bid on an NFT in a marketplace, your wallet will send a request to estimate the necessary gas price. As part of this request, the RPC endpoint will learn your IP address, your wallet address, the precise NFT you intend to buy and the amount of your bid."            image="/images/hopr_rpc_linkability.gif"
                image="/images/hopr_nft_frontrun.gif"
                button="LEARN MORE"
                buttonHref="https://medium.com/hoprnet/derp-example-2-nft-marketplace-7d3e4b4e8e2a"
            />
            <Brick
                className='mbt80'
                title="DEX MEV"
                text="When you use a DEX like Uniswap, many RPC requests are needed to populate the UI with data about your balances, the token pair you want to swap and details like price and slippage. All this information is sent to the RPC provider before your transaction is broadcast."
                image="/images/hopr_dex_mev.gif"
                button="LEARN MORE"
                buttonHref="https://medium.com/hoprnet/derp-example-3-uniswap-mev-c2a8d3417c8"
                reverse
            />
        </SSection>
    );
}

export default Section3;
