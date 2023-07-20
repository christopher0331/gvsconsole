import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Overview from './components/Overview.js';
import Customers from './components/Customers.js';
import Financial from './components/Financial.js';
import Marketing from './components/Marketing.js';
import Projects from './components/Projects.js';
import Forms from './components/Forms.js';
import AWS from 'aws-sdk';
import axios from 'axios';
import { DataProvider } from './components/Context.js';
import './App.css';

async function configureAWS() {
  try {
    const response = await axios.get("https://379pj43m47.execute-api.us-west-2.amazonaws.com/default/gvsGetCreds");
    AWS.config.update({
      region: 'us-west-2',
      accessKeyId: response.data.accessKeyId,
      secretAccessKey: response.data.secretAccessKey,
    });
  } catch (err) {
    console.log('error', err);
  }
}

configureAWS();
function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/" element={<Overview />} /> {/* default route */}
          </Routes>
        </div>
      </Router>
      </DataProvider>
  );
}

export default App;
