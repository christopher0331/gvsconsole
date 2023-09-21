import React from 'react';
import Papa from 'papaparse';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust this to your Firebase configuration
import CSVReader from 'react-csv-reader';

function FirebaseDataUpload() {
  const handleCSVUpload = (data) => {
    const parsedData = data.slice(1); // Remove header row
    const customersCol = collection(db, 'customers');
    
    parsedData.forEach(async (row) => {
      if (row.length > 0) {
        // Mapping values by their indices
        const attachments = row[0] || "";
        const city = row[1] || "";
        const company = row[2] || "";
        const country = row[3] || "";
        const customer = row[4] || "";
        const customerType = row[5] || "";
        const email = row[6] || "";
        const notes = row[7] || "";
        const openBalance = row[8] || "";
        const phone = row[9] || "";
        const state = row[10] || "";
        const streetAddress = row[11] || "";
        const zip = row[12] || "";

        const customerObject = {
          attachments,
          city,
          company,
          country,
          customer,
          customerType,
          email,
          notes,
          openBalance,
          phone,
          state,
          streetAddress,
          zip
        };

        // Log the customerObject to inspect before uploading
        console.log(customerObject);
        
        try {
          await addDoc(customersCol, customerObject);
        } catch (error) {
          console.error('Error uploading to Firestore:', error);
        }
      }
    });

    console.log('Data uploaded to Firestore');
  };

  return (
    <div>
      <h2>Upload your CSV</h2>
      <CSVReader
        onFileLoaded={(data) => handleCSVUpload(data)}
        inputId="csvInput"
      />
    </div>
  );
}

export default FirebaseDataUpload;
