# Lightweight sUSDC-G Explorer

This is a lightweight sUSDC-G explorer that runs without db. It just grabs data from Luniverse using web3.js

## Configuration
1. Update `PROVIDER` const in `src\utils\web3-loader.js`
2. Update `sidechainABI` const in `src\components\ethereum\TransactionTableInfo.js`

## Running It
1. Clone to local 
2. Switch to directory you cloned to
3. Update configuration as shown above (if required)
4. Run `npm install`
5. Run `npm start`
6. Browse to http://localhost:3000
