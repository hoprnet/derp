import styled from "@emotion/styled";

const SSection = styled.section`
  overflow: hidden;
  &.section--gradient{
    background: linear-gradient(180.13deg, #0000B4 -110.52%, rgba(216, 216, 216, 0.0001) 99.89%);
  }
  &.section--yellow{
    background: #FFFFA0;
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
            className={`${props.className} Section${props.gradient ? ' section--gradient' : ''}${props.yellow ? ' section--yellow' : ''}${props.gradient ? ' Section-gradient' : ''}`}
        >
            <Content className="Content">
                {props.children}
            </Content>
        </SSection>
    );
}

export default Section;
