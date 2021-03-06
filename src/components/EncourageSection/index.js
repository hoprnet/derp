import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Section from '../Section/index.jsx'
import Typography from "../Typography/index.jsx";
import { useId } from "react-id-generator";
import lottie from "lottie-web";

const Container = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const Left = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
`

const Right = styled.div`
  flex: 6;
  display: flex;
  align-items: center;
`

const Animation = styled.div`
  max-width: 300px;
  max-height: 300px;
  overflow: hidden;
`

function EncourageSection(props) {
    const [htmlId] = useId();

    let animationLoaded = false;

    useEffect(() => {
        // check to prevent double animation load on page remount
        if (!animationLoaded) {
            lottie.loadAnimation({
                container: document.querySelector(`#${htmlId}`),
                animationData: props.animationData,
        });
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
        animationLoaded = true;
    }, []);


    return (
        <Section
            className={`EncourageSectionSection ${props.className}`}
            id={props.id}
        >
            <Typography type="h2" center fullWidth>
                {props.title}
            </Typography>
            <Container>
                <Left>
                    <Animation id={htmlId}/>
                </Left>
                <Right>
                    <Typography center>
                        {props.text}
                    </Typography>
                </Right>
            </Container>

        </Section>
    );
}

export default EncourageSection;
