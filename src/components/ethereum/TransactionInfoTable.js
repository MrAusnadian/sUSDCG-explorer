import React from 'react';
import { Link } from 'react-router-dom';
import { bigNumber } from '../../utils/format-utils';
import abiDecoder from 'abi-decoder';
import * as appSettings from '../../appSettings.json';
abiDecoder.addABI(JSON.parse(appSettings.SIDECHAIN_ABI));

const BlockInfoTable = ({tx}) => {
  const data = tx.input;
  var decodedData = abiDecoder.decodeMethod(data);
  //console.log(decodedData.name);
  //console.log(decodedData.params);
  var x, txt = "";
  if(decodedData !== undefined){
    for (x in decodedData.params){
      txt += decodedData.params[x].name
        + ": "
        + decodedData.params[x].value
        + " ("
        + decodedData.params[x].type
        + ")\n";
    }
  }
  else {
    decodedData = {name: "unknown"};
    txt = "Could not decode the input data using the ABI provided.";
  }

  return (
    <table className="pure-table pure-table-horizontal">
      <thead>
          <tr>
            <th colspan="2">Transaction Hash: {tx.hash}</th>
          </tr>
      </thead>
      <tbody>
        <tr>
          <td>Block #</td>
          <td><Link to={`${process.env.PUBLIC_URL}/block/${tx.blockNumber}`}>{tx.blockNumber}</Link></td>
        </tr>
        <tr>
          <td>From</td>
          <td>{ tx.from }</td>
        </tr>
        <tr>
          <td>To</td>
          <td>{ tx.to }</td>
        </tr>
        <tr>
          <td>Value</td>
          <td>{ bigNumber(tx.value) }</td>
        </tr>
        <tr>
          <td>Gas Price</td>
          <td>{ bigNumber(tx.gasPrice) }</td>
        </tr>
        <tr>
          <td>Gas Used</td>
          <td>{ tx.gas }</td>
        </tr>
        <tr>
          <td>Nonce</td>
          <td>{ tx.nonce }</td>
        </tr>
        <tr>
          <td>Input Data</td>
          <td><textarea rows="5" cols="150" disabled="disabled">{ tx.input }</textarea></td>
        </tr>
        <tr>
          <td>Transaction Data</td>
          <td><textarea rows="8" cols="150" disabled="disabled">{ "type: " + decodedData.name + "\n" + txt }</textarea></td>
        </tr>
      </tbody>
    </table>
  )

}

export default BlockInfoTable;
