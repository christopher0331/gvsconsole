
import Papa from 'papaparse';
import csvData from './calendar_data.csv';
import customerListData from './gvs_contact_list.csv';
import invoiceData from './gvs_invoice_list.csv';
import { db } from '../firebaseConfig.js';
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, deleteDoc, doc, where } from 'firebase/firestore';
import './styles/FetchData.css';


function CSVAnalyzer() {
  const [channelStats, setChannelStats] = useState({});

  useEffect(() => {
    async function fetchDataAndCompute() {
      const marketingDataCollection = collection(db, 'marketingInfo');
      const allRecordsSnapshot = await getDocs(marketingDataCollection);

      // Initializing a map to store sum and count for each marketing channel
      let channelAggregate = {};

      allRecordsSnapshot.forEach(doc => {
        const data = doc.data();

        if (data.amount) { // Filtering out records that don't have an amount
          const numericAmount = parseFloat(data.amount.replace(/[^0-9.-]+/g, "")); // Convert string amount to number

          if (!isNaN(numericAmount)) { // Confirming it's a valid number after conversion
            if (!channelAggregate[data.marketingChannels]) {
              channelAggregate[data.marketingChannels] = { sum: 0, count: 0, average: 0 };
            }
            
            channelAggregate[data.marketingChannels].sum += numericAmount;
            channelAggregate[data.marketingChannels].count += 1;
          }
        }
      });

      // Calculating average for each marketing channel
      for (const channel in channelAggregate) {
        channelAggregate[channel].average = channelAggregate[channel].sum / channelAggregate[channel].count;
      }

      setChannelStats(channelAggregate);
    }

    fetchDataAndCompute();
  }, []);



async function removeDuplicates() {
  // 1. Query the database and retrieve all records
  const marketingInfoCol = collection(db, 'marketingInfo');
  const allDataSnapshot = await getDocs(marketingInfoCol);
  const allData = allDataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Object to track seen records
  let seen = {};

  // 2. Identify duplicates
  const duplicates = allData.filter((record) => {
    const key = `${record.address}-${record.amount}-${record.date}`;
    if (seen[key]) {
      return true;
    } else {
      seen[key] = true;
      return false;
    }
  });

  // 3. Delete the duplicates
  for (let duplicate of duplicates) {
    await deleteDoc(doc(db, 'marketingInfo', duplicate.id));
  }

  console.log(`${duplicates.length} duplicates removed.`);
}

removeDuplicates();


  return (
    <div className="fetchAndCompute-container">
    <div className="fetchAndCompute-header">Marketing Data Analysis</div>
      {Object.entries(channelStats).map(([channel, stats]) => (
        <div key={channel}>
          <strong>{channel}</strong>
          <ul>
            <li>Total Amount: ${stats.sum.toFixed(2)}</li>
            <li>Number of Transactions: {stats.count}</li>
            <li>Average Amount: ${stats.average.toFixed(2)}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
export default CSVAnalyzer;
