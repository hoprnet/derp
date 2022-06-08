import './App.css';
import styled from "@emotion/styled";

import OriginalWebsite from './components/OriginalWebsite/index.jsx'
import Layout from './components/Layout/index.jsx'

import Section1 from './sections/Section1.jsx'
import Section2 from './sections/Section2.jsx'

function App() {
  return (
    <div className="App">
      <Layout>
          <Section1/>
          <Section2/>
          <OriginalWebsite/>
      </Layout>
    </div>
  );
}

export default App;
