import React, { Fragment } from "react";
import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Brick from '../components/Brick/index.jsx'
import GrayButton from '../components/Button/gray.jsx'


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


function Section3(props) {
    return (
        <Fragment>
            <SSection
                darkGradient
                id='setup-section'
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
                    onClick={()=>{props.setShowSetup(current => !current)}}
                >
                    SETUP
                </GrayButton>
            </SSection>
            { props.showSetup &&
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
                            <br/><br/>
                            Click “Networks” (1) and then “Add Network” (2)
                            <br/><br/>
                        </div>}
                        image={"/hopr_derp_setup_1.png"}
                        reverse
                        noShadow
                    />
                    <Brick
                        text={<div>
                            In the window that appears, fill in the fields by copy / pasting the RPC information in the
                            DERP panel below this box (3).
                            <br/><br/>
                            A warning will appear for Chain ID (4), because MetaMask already has an ETH RPC Network as
                            standard. It’s safe to ignore this.
                            <br/><br/>
                            Click Save (5). Visit a DeFi service of your choice and connect your wallet. DERP will now
                            make transparent all the RPC calls which are normally hidden from you.
                            <br/><br/>
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

export default Section3;
