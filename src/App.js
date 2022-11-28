import React, { useState } from "react";
import './App.css';
import typingBotAnimation from './assets/typing-bot-animation.json';

import Layout from './components/Layout/index.jsx'


import Section1 from './sections/Section1.jsx'
import Section2 from './sections/Section2.jsx'
import Section3 from './sections/Section3.jsx'
import Section4 from './sections/Section4.jsx'
import Section5 from './sections/Section5.jsx'
import Section6 from './sections/Section6.jsx'
import EncourageSection from "./components/EncourageSection/index.js";

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
          <Section4/>
          <Section3/>
          <Section5
            showSetup={showSetup}
            setShowSetup={setShowSetup}
          />
          <Section6/>
          <EncourageSection
            title='BE PART OF THE HOPR ECOSYSTEM'
            text='HOPR is building the transport layer privacy needed to make web3 work. Work with us to build dApps that change data privacy for good.'
            animationData={typingBotAnimation}
          />
          {/*<OriginalWebsite/>*/}
      </Layout>
    </div>
  );
}

export default App;
