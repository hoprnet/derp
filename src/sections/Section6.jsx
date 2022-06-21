import React from "react";

import styled from "@emotion/styled";

import Section from '../components/Section/index.jsx'
import Typography from '../components/Typography/index.jsx'
import Brick from '../components/Brick/index.jsx'
import GrayButton from '../components/Button/gray.jsx'


const SSection = styled(Section)`
  padding-bottom: 40px;
  padding-top: 40px;
`

const SBrick = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`

const TextContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  div {
    text-align: left;
  }
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-start;
  flex: 5;
  @media (max-width: 699px) {
    display: none;
  }
`

const Image = styled.img`
  height: auto;
  max-width: 100%;
  box-shadow: 0px 2px 34px -7px rgb(0 0 0 / 50%);
  border-radius: 28px;
  &.mobileOnly {
    margin-bottom: 16px;
    @media (min-width: 700px) {
      display: none;
    }
  }
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
