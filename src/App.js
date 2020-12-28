import './App.css';

import { useEffect, useState } from 'react'
//import components
import CredentialFrom from "./components/CredentialForm"
import PresentationFrom from "./components/PresentationForm"

function App() {
  const [loading, setLoading] = useState(false)

 // handler for AddCredential Event 
  const handleNewCredential = async credentialObj => {}

  function Render() {
    if (loading) {
      return <span>Wait... Dock is initializing accounts</span>
    } else {
      return (
        <>
          <CredentialFrom />
          <PresentationFrom />
        </>
      )
    }
  }

  return (
    <div className="App">
      <h1>GUI for Dock SDK</h1>
      <div className="form">
        <Render />
      </div>
    </div>
  );
}

export default App;
