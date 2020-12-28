import './App.css';

import { useEffect, useState } from 'react'
//import components
import CredentialFrom from "./components/CredentialForm"
import PresentationFrom from "./components/PresentationForm"
// Constants
import { address, secretUri, secretUri2, secretUri3, secretUri4 } from './utils/shared-constants';
// Dock and Polkadot neede modules
import { DockAPI } from '@docknetwork/sdk';

function App() {
  const [loading, setLoading] = useState(false)
   //Initialize a new custom dock API
  const [dock, setDock] = useState(new DockAPI())

  useEffect(() => { 
    async function initDock() { 
      console.log('initializing the Dock Api')
        await dock.init({address, keyring:Keyring})
        //Setting Alice as the issuer authority
        const issuer = dock.keyring.addFromUri(secretUri, null, 'sr25519');
        dock.setAccount(issuer);
    }
    initDock()
    return  () => {
      console.log("App unmounting")
      // disconnect from the node(WIP)
      dock.disconnect()
    }
  })

 // handler for AddCredential Event 
  const handleNewCredential = async credentialObj => { 
    console.log("CREDENTIAL Object ==>", credentialObj)
    let vc = new VerifiableCredential(credentialObj.id);
    vc.addContext(credentialObj.context)
    vc.addSubject({id: credentialObj.subject})
    vc.addType(credentialObj.type)
    vc.setStatus({id: credentialObj.status, type : "CredentialStatusList2017"})
  }
  
  // handler for AddPresentation Event 
  const handleNewPresentation = async presentationObj => {
    console.log("PRESENTATION Object==>", presentationObj)
    let vp = new VerifiablePresentation(presentationObj.id);
    vp.addContext(presentationObj.context)
    vp.addType(presentationObj.type)
    vp.setHolder(presentationObj.holder.did)
    vp.addCredential(presentationObj.credential)
   }

  function Render() {
    if (loading) {
      return <span>Wait... Dock is initializing accounts</span>
    } else {
      return (
        <>
          <CredentialFrom onAddCredential={ handleNewCredential}/>
          <PresentationFrom onAddPresentation={handleNewPresentation} />
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
