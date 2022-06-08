import styled from "@emotion/styled";

const H2 = styled.h2`
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 55px;
  line-height: 60px;

  text-align: center;
  letter-spacing: 0.5px;

  color: #414141;
`

const PlainText = styled.span`
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  /* or 144% */

  text-align: center;
  letter-spacing: 0.25px;

  color: #414141;
  margin-bottom: 32px;
`


function Typography(props) {

    if (props.type==="h2") {
        return (
            <H2 className={props.className} >
                {props.children}
            </H2>
        );
    }

    return (
        <PlainText
            className={props.className}
        >
            {props.children}
        </PlainText>
    );

}

export default Typography;
