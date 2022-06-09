import styled from "@emotion/styled";

const SSection = styled.section`
  overflow: hidden;
  &.section--gradient{
    background: linear-gradient(180.13deg, #0000B4 -110.52%, rgba(216, 216, 216, 0.0001) 99.89%);
  }
  &.section--yellow{
    background: #FFFFA0;
  }
  &.section--dark-gradient{
    background: linear-gradient(180deg, #0000B4 0.5%, #000050 100%);
  }
  &.section--grey {
    background: #EEEEEE;
  }
`

const Content = styled.div`
  max-width: 1098px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`

function Section(props) {
    return (
        <SSection
            className={`Section ${props.className} ${props.gradient ? ' section--gradient' : ''}${props.yellow ? ' section--yellow' : ''}${props.darkGradient ? ' section--dark-gradient' : ''}${props.grey ? ' section--grey' : ''}`}
        >
            <Content className="Content">
                {props.children}
            </Content>
        </SSection>
    );
}

export default Section;
