import React, { Fragment, useState} from "react";
import './App.css';
import styled from "@emotion/styled";

import OriginalWebsite from './components/OriginalWebsite/index.jsx'
import Layout from './components/Layout/index.jsx'

import Section1 from './sections/Section1.jsx'
import Section2 from './sections/Section2.jsx'
import Section3 from './sections/Section3.jsx'
import Section4 from './sections/Section4.jsx'
import Section5 from './sections/Section5.jsx'
import Section6 from './sections/Section6.jsx'

function App() {
  const [showSetup, setShowSetup] = useState(false);


  function showSetupWithScroll () {
      setShowSetup(true);
      const section = document.querySelector( '#setup-section' );
      section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  }

  return (
    <div className="App">
      <Layout
          setShowSetup={showSetupWithScroll}
      >
          <Section1
              setShowSetup={showSetupWithScroll}
          />
          <Section2/>
          <Section3/>
          <Section4
              showSetup={showSetup}
              setShowSetup={setShowSetup}
          />
          <Section5/>
          <Section6/>
          {/*<OriginalWebsite/>*/}
      </Layout>
    </div>
  );
}

export default App;
