# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Get Started
- run a local node(or change the link in ``` src/utils/shared-constants.js``` to a public testnet
- run ```npm i ```
- run ```npm start ```


### Senario
- App connects to local node
- for testing purposes four mock accounts(1 issuer authority and 3 holders) produced
- Issue a credential for a holder(as a subject) and sign it using issuer's DID
- without having at least one credentials you cannot generate presentations.
- Issue a ```presentation``` for a ```credential``` and sign it with holders DID

### Limitations
- No validation
- not much error handling
- credentials can only be issued for one holder
- Credentials doesn't have expiry date or revocation
- presentations can only be issued for one credential
- no verification is implemented for DID, credentials or presentation
