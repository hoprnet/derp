import React, { useState, Fragment, useCallback } from "react";
import styled from "@emotion/styled";
import { hexValue } from "@ethersproject/bytes";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Brick from '../components/Brick/index.jsx'
import GrayButton from '../components/Button/gray.jsx'
import Button from '../components/Button'
import RpcSelect from '../components/Select'
import CopyButton from '../components/CopyButton'

import { chains } from "../shared/chains.js"

const SSection = styled(Section)`
  padding-bottom: 40px;
  padding-top: 40px;
  align-items: flex-start;
`

const Container = styled.div`
  overflow-wrap: anywhere;
`
const SwitchContainer = styled(Container)`
  margin-top: 10px;
`
function SwitchChain(props) {
    return (
        <SwitchContainer>
            <Button
                hopr
                onClick={props.handleSwitchChain}
            >
                Switch
            </Button>
        </SwitchContainer>

    )
}


function RpcInformation() {
    const host = window.location.host;
    const [rpc, setRpc] = useState('ETH');
    const [nm, setNm] = useState('DERP - ETH Mainnet');
    const [url, setUrl] = useState(`https://${host}/rpc/eth/mainnet`);
    const [id, setId] = useState('1');
    const [symbol, setSymbol] = useState('ETH');
    const [blockExplorerUrl, setBlockExplorerUrl] = useState('https://etherscan.io');

    const handleChange = (event) => {
        setRpc(event.target.value);
        let chosenChain = chains.filter(chain => chain.value === event.target.value)[0];
        if (chosenChain) {
            setNm(`DERP - ${chosenChain.name}`);
            setUrl(`https://${host}${chosenChain.derpUrl}`);
            setId(chosenChain.chainId);
            setSymbol(chosenChain.coin);
            setBlockExplorerUrl(chosenChain.blockExplorerUrl)
        }
    };

    const switchChain = useCallback(async () => {
        if (!window.ethereum) return;
        const rawEthereumProvider = window.ethereum;
        const chainIdHex = hexValue(parseInt(id));
        try {
            await rawEthereumProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainIdHex }]
            })
        } catch (error) {
            try {
                if (error.code === 4902) {
                    await rawEthereumProvider.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: chainIdHex,
                            chainName: nm,
                            nativeCurrency: {
                                symbol: symbol,
                                decimals: 18
                            },
                            rpcUrls: [url],
                            blockExplorerUrls: [blockExplorerUrl],
                        }],
                    })
                } else {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [nm, id, url, symbol, blockExplorerUrl])

    return (
        <Container>
            <RpcSelect
                value={rpc}
                chains={chains}
                onChange={handleChange}
            />
            <br />
            <b>Network Name:</b> {nm}
            <CopyButton
                copy={nm}
            />
            <br/>
            <b>New RPC Url:</b> {url}
            <CopyButton
                copy={url}
            />
            <br />
            <b>Chain ID:</b> {id}
            <CopyButton
                copy={id}
            />
            <br />
            <b>Currency Symbol:</b> {symbol}
            <CopyButton
                copy={symbol}
            />
            <br />
            {
                blockExplorerUrl &&
                <>
                    <b>Block Explorer:</b> {blockExplorerUrl}
                    <CopyButton
                        copy={symbol}
                    />
                    <br />
                </>
            }

            <SwitchChain
                handleSwitchChain={switchChain}
            />
        </Container>
    )
}

function Section5(props) {
    return (
        <Fragment>
            <SSection
                darkGradient
                id='setup-section'
                center
            >
                <Typography
                    type="h6"
                    className="mb32"
                    white
                >
                    Set up your DERP RPC endpoint to your crypto wallet.
                </Typography>
                <GrayButton
                    className="unifiedSize"
                    onClick={() => { props.setShowSetup(current => !current) }}
                >
                    SETUP
                </GrayButton>
            </SSection>
            {props.showSetup &&
                <SSection
                    grey
                >
                    <Brick
                        title="SETUP"
                        text={<div>
                            To start using DERP, you’ll need to set it up as your ETH RPC provider in your wallet.
                            Instructions are for MetaMask, but DERP will work for any wallet that allows you to manage
                            RPC endpoints. DERP currently only works with Ethereum mainnet, but other chains have the
                            same problems and may be added in the future.
                            <br /><br />
                            Click “Networks” (1) and then “Add Network” (2)
                            <br /><br />
                        </div>}
                        image={"/hopr_derp_setup_1.png"}
                        reverse
                        noShadow
                    />
                    <Typography>
                        In the window that appears, fill in the fields by copy / pasting the RPC information (3):
                        <RpcInformation />
                    </Typography>
                    <Brick
                        text={<div>
                            A warning will appear for Chain ID (4), because MetaMask already has an ETH RPC Network as
                            standard. It’s safe to ignore this.
                            <br /><br />
                            Click Save (5). Visit a DeFi service of your choice and connect your wallet. DERP will now
                            make transparent all the RPC calls which are normally hidden from you.
                            <br /><br />
                            DERP doesn’t store or share your information or display inaccurate blockchain data: it
                            simply reveals what goes on under the hood when you connect to an RPC endpoint.
                        </div>}
                        image={"/hopr_derp_setup_2.png"}
                        reverse
                        noShadow
                    />
                </SSection>
            }
        </Fragment>
    );
}

export default Section5;
