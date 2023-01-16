import React, { useEffect } from "react";
import styled from "@emotion/styled";

import Section from "../components/Section/index.jsx";
import Typography from "../components/Typography/index.jsx";
import Button from "../components/Button/index.jsx";

import { ReactComponent as HoprBall } from "../assets/hopr-ball.svg";
import derpAnimation from "../assets/derp-animation.json";
import lottie from "lottie-web";

const SSection = styled(Section)`
  padding-bottom: 80px;
  padding-top: 0;
`;

const ImageContainer = styled.div`
  max-width: 780px;
  width: 100%;
  position: relative;
`;

const Animation = styled.div`
  max-width: 400px;
  max-height: 400px;
  width: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Subtext = styled(Typography)`
  max-width: 640px;
  margin-top: ${(props) => props.marginTop && `${props.marginTop}px`};
`;

const Disclaimer = styled(Subtext)`
  margin-top: 32px;
  font-size: 14px;
  text-align: center;
`;

function Section1(props) {
  let animationLoaded = false;
  useEffect(() => {
    // check to prevent double animation load on page remount
    if (!animationLoaded) {
      lottie.loadAnimation({
        container: document.querySelector(`#derp-animation`),
        animationData: derpAnimation,
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    animationLoaded = true;
  }, []);

  return (
    <SSection id={"Section1"} gradient center>
      <ImageContainer>
        <HoprBall />
        {/*<Image*/}
        {/*    alt="Hopr logo"*/}
        {/*    src={'/images/derp_top-header.png'}*/}
        {/*/>*/}
        <Animation id="derp-animation" />
      </ImageContainer>

      <Typography type="h2">
        DERP
        <br />
        DUMB ETHEREUM RPC PROVIDER
      </Typography>

      <Subtext center>
        Add the DERP RPC endpoint to your crypto wallet to see exactly what
        information is being leaked about you every time you connect to a crypto
        service.
      </Subtext>
      <Button hopr onClick={props.setShowSetup}>
        SETUP
      </Button>
      <Disclaimer>
        Disclaimer: DERP is only an educational tool to showcase all the data
        your wallet leaks about you. It does not solve the issue! If you want a
        truly secure and private RPC provider, use{" "}
        <a
          href="https://hoprnet.org/rpch"
          target="_blank"
          rel="noopener noreferrer"
        >
          RPCh.
        </a>
      </Disclaimer>
    </SSection>
  );
}

export default Section1;
