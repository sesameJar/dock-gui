import './App.css';

import {useEffect, useState} from 'react'
//import components
import CredentialFrom from "./components/CredentialForm"
import PresentationFrom from "./components/PresentationForm"
// Constants
import { address, secretUri, secretUri2, secretUri3, secretUri4 } from './utils/shared-constants';
// Dock and Polkadot neede modules
import Keyring from '@polkadot/keyring';
import { PublicKeySr25519 } from '@docknetwork/sdk';
import { createKeyDetail, createNewDockDID } from '@docknetwork/sdk/utils/did';

import getKeyDoc from "@docknetwork/sdk/utils/vc/helpers.js"

// import {connectToNode} from "./utils/dockSdkInit"
import { DockAPI } from '@docknetwork/sdk';
import VerifiableCredential from '@docknetwork/sdk/verifiable-credential';
import VerifiablePresentation from "@docknetwork/sdk/verifiable-presentation"

function App() {
  const [loading, setLoading] = useState(false)
   //Initialize a new custom dock API
  const [dock, setDock] = useState(new DockAPI())
  const [credentials, setCredentials] = useState([]);
  const [presentations, setPresentations] = useState([]);
  const [authorityDID, setAuthorityDID] = useState()
  const [holdersDID, setHoldersDID] = useState([])

   useEffect(() => {
    async function initDock (){
      setLoading(true)
      if (!dock.isInitialized() && !dock.isConnected) {
        console.log('initializing the Dock Api')
        await dock.init({address, keyring:Keyring})
        //Setting Alice as the issuer authority
        const issuer = dock.keyring.addFromUri(secretUri, null, 'sr25519');
        dock.setAccount(issuer);

        const issuerDid = await generateDID(secretUri)
        setAuthorityDID(issuerDid)
        console.log("DID", issuerDid)
        
        //Mock Holder1
        const holder2DID = await generateDID(secretUri2)
        console.log("DID holder", holder2DID)
        //Mock Holder2
        const holder3DID = await generateDID(secretUri3)
        console.log("DID holder", holder3DID)
        //Mock Holder3
        const holder4DID = await generateDID(secretUri4)
        console.log("DID holder", holder4DID)

        setHoldersDID([holder2DID, holder3DID, holder4DID])
        // setHoldersDID([holder2DID])
        // Registering all DIDs for future verification

        setLoading(false)
       }
    }
    initDock()
    return  () => {
      console.log("App unmounting")
      // disconnect from the node(WIP)
      dock.disconnect()
    }
   }, [dock])
  
  async function generateDID(secret) {
    const did = createNewDockDID();

    const account = dock.keyring.addFromUri(secret, null, 'sr25519');
    const pk = PublicKeySr25519.fromKeyringPair(account);
    
    const keyDetail = createKeyDetail(pk, did);
    await dock.did.new(did, keyDetail);

    return {did, keyPair: account }
    // return did
  }
  
  // handler for AddCredential Event 
  const handleNewCredential = async credentialObj => {
    console.log("CREDENTIAL Object ==>", credentialObj)
    let vc = new VerifiableCredential(credentialObj.id);
    vc.addContext(credentialObj.context)
    vc.addSubject({id: credentialObj.subject})
    vc.addType(credentialObj.type)
    vc.setStatus({id: credentialObj.status, type : "CredentialStatusList2017"})
    const issuerKey = getKeyDoc(authorityDID.did, authorityDID.keyPair, 'Sr25519VerificationKey2020')
    //sign using issuer
    let res = await vc.sign(issuerKey)
    console.log(vc.toJSON(), res)
    setCredentials([...credentials, vc.toJSON()])
  }

  // handler for AddPresentation Event 
  const handleNewPresentation = async presentationObj => {
    if (presentationObj.holder.did !== presentationObj.credential.credentialSubject[0].id) {// currently only covering one subject
      alert("Holder in credential does not match with the selected holder in presentation form.")
      return
    }
    console.log("PRESENTATION Object==>", presentationObj)
    let vp = new VerifiablePresentation(presentationObj.id);
    vp.addContext(presentationObj.context)
    vp.addType(presentationObj.type)
    vp.setHolder(presentationObj.holder.did)
    vp.addCredential(presentationObj.credential)
    const signerKey = getKeyDoc(presentationObj.holder.did, presentationObj.holder.keyPair, 'Sr25519VerificationKey2020')
    await vp.sign(signerKey, 'some_challenge', 'some_domain' )
    setPresentations([...presentations, vp.toJSON()])
  }

  function Render() {
    if (loading) {
      return <span>Wait... Dock is initializing accounts</span>
    } else {
      return (
        <>
          <CredentialFrom holders={holdersDID} onAddCredential={ handleNewCredential}/>
          <PresentationFrom holders={holdersDID} credentials={credentials} onAddPresentation={handleNewPresentation} />
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
