import styled from "@emotion/styled";

const SSection = styled.section`
  overflow: hidden;
  &.section--gradient{
    background: linear-gradient(180deg,#0000b4 -110.52%,hsla(0,0%,85%,0) 60.89%);
  }
  &.section--yellow{
    background: #FFFFA0;
  }
  &.section--light-blue-gradient{
    background: linear-gradient(180deg,#1ad1ff -110.52%,hsla(0,0%,85%,0) 105%);
  }
  &.section--light-blue{
    background: #7ee5ff;
  }
  &.section--dark-gradient{
    background: linear-gradient(180deg, #000050 0.5%, #0000B4 100%);
  }
  &.section--grey {
    background: #EEEEEE;
  }
  &.full-height-min {
    min-height: calc( 100vh - 68px - 170px);
    @media (max-width: 850px) {
      min-height: calc( 100vh - 68px - 294px);
    }
  }
  &.full-height {
    min-height: calc( 100vh - 60px);
  }
  
  padding-bottom: 40px;
  padding-top: 40px;
`

const Content = styled.div`
  max-width: 1098px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 16px;
  padding-right: 16px;
  &.content--center {
    align-items: center;
  }
`

function Section(props) {
    return (
        <SSection
          className={`Section ${props.className} 
            ${props.gradient ? ' section--gradient' : ''}
            ${props.yellow ? ' section--yellow' : ''}
            ${props.darkGradient ? ' section--dark-gradient' : ''}
            ${props.lightBlueGradient ? ' section--light-blue-gradient' : ''}
            ${props.lightBlue ? ' section--light-blue' : ''}
            ${props.grey ? ' section--grey' : ''}
            ${props.fullHeightMin ? ' full-height-min' : ''}
            ${props.fullHeight ? ' full-height' : ''}`
          }
          id={props.id}
        >
            <Content className={`Content ${props.center ? ' content--center' : ''}`}>
                {props.children}
            </Content>
        </SSection>
    );
}

export default Section;
