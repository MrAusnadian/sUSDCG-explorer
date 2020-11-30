import Web3 from 'web3';
import * as appSettings from '../appSettings.json';

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results
    var web3 = window.web3
    var provider = new Web3.providers.HttpProvider(appSettings.SIDECHAIN_RPC)
    web3 = new Web3(provider)

    results = {
      web3: web3
    }

    console.log('No web3 instance injected, using Local web3.');

    resolve(results)
  })
})

export default getWeb3
