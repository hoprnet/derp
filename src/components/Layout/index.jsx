// Packages
import React from 'react';
import styled from '@emotion/styled'

// Components
import NavBar from './navbar';
import Footer from './footer';
import Banner from "../Banner/index.jsx";


const SLayout = styled.div`

`

const Content = styled.div`
  margin-top: 68px;
//  max-width: 1096px;
  
  //@media screen and (max-width: 700px) {
  //  margin-top: 128px;
  //}
  //@media screen and (max-width: 293px) {
  //  margin-top: 216px;
  //}
`

const Layout = ({ className = '', children }) => {
    return (
        <SLayout className="Layout">
            <NavBar />
            <Content className="Content">
                <Banner/>
                {children}
            </Content>
            <Footer />
        </SLayout>
    );
};

export default Layout;
