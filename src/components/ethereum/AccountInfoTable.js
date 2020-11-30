import React from 'react';
import { bigNumber } from '../../utils/format-utils';
import * as appSettings from '../../appSettings.json';
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(appSettings.SIDECHAIN_RPC));

const AccountInfoTable = ({ account }) => {
  let tokenAddress = appSettings.TOKEN_CONTRACT;
  let walletAddress = account.address;
  // Get ERC20 Token contract instance
  let contract = web3.eth.contract(JSON.parse(appSettings.SIDECHAIN_ABI)).at(tokenAddress);
  contract.balanceOf(walletAddress, (error, balance) => {
    // Get decimals
    contract.decimals((error, decimals) => {
      // calculate a balance
      balance = balance.div(10**decimals);
      console.log(balance.toString());
      var span = document.getElementById("tokenBal");
      span.textContent = balance.toString() + " sUSDC-G";
    });
  });
  return (
    <table className="pure-table pure-table-horizontal">
      <thead>
          <tr>
            <th colSpan="2">Address: {account.address}</th>
          </tr>
      </thead>
      <tbody>
        <tr>
            <td>ETH Balance</td>
            <td><span>{ bigNumber(account.balance) } ETH</span></td>
        </tr>
        <tr>
          <td>Token Balance</td>
          <td><span id="tokenBal">0 sUSDC-G</span></td>
        </tr>
        <tr>
            <td>Transaction Count <em>(# of outgoing TXs)</em></td>
            <td>{ account.transactionCount }</td>
        </tr>
        <tr>
            <td>Code</td>
            <td><textarea disabled="disabled">{ account.code }</textarea></td>
        </tr>
      </tbody>
    </table>
  )
}

export default AccountInfoTable;
