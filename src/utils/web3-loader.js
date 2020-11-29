import Web3 from 'web3'

const PROVIDER = "http://baas-rpc.luniverse.io:8545?lChainId=3158073271666164067"

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      var provider = new Web3.providers.HttpProvider(PROVIDER)

      web3 = new Web3(provider)

      results = {
        web3: web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(results)
  })
})

export default getWeb3
