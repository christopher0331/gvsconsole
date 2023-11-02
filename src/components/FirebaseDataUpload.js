import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CSVReader from 'react-csv-reader';

function UploadComponent() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const processedNames = new Set(); // To keep track of names that have been processed

  const handleInvoiceData = (data) => {
    setInvoiceList(data.slice(1)); // Skip the header row
    console.log("First 5 invoice records:", data.slice(1, 6));
  };

  const handleCustomerData = (data) => {
    setCustomerList(data.slice(1)); // Skip the header row
    console.log("First 5 customer records:", data.slice(1, 6));
  };

  const uploadData = async () => {
    if (!invoiceList.length || !customerList.length) {
      console.warn("Please ensure both CSV files are loaded before proceeding.");
      return;
    }

    const matchingCustomers = invoiceList.filter(invoice => 
      customerList.some(customer => customer[0] === invoice[1]) && invoice[3] === 'Paid'
    );

    for (let customer of matchingCustomers) {
      if (processedNames.has(customer[1])) {
        console.warn(`Skipped uploading record for ${customer[1]} due to duplicate entry.`);
        continue;
      }

      const customerInfo = customerList.find(c => c[0] === customer[1]);

      if (customerInfo && customerInfo[0] && customerInfo[3] && customerInfo[4]) {
        const newRecord = {
          name: customerInfo[0],
          email: customerInfo[3],
          city: customerInfo[4]
        };
        try {
          await addDoc(collection(db, 'InvoiceListContactInfo'), newRecord);
          processedNames.add(customer[1]); // Mark the name as processed
        } catch (error) {
          console.error(`Failed to upload record for ${customer[1]}:`, error);
        }
      } else {
        console.warn(`Skipped uploading record for ${customer[1] || 'undefined'} due to missing data.`);
      }
    }

    console.log(`${matchingCustomers.length} records processed. Check warnings for any skipped records.`);
  };

  return (
    <div>
      <h2>Upload CSV Files</h2>
      <CSVReader onFileLoaded={handleInvoiceData} label="Select Invoice CSV File: " />
      <CSVReader onFileLoaded={handleCustomerData} label="Select Customer List CSV File: " />
      <button onClick={uploadData}>Upload</button>
    </div>
  );
}

export default UploadComponent;

// function FirebaseDataUpload() {
//   const handleCSVUpload = (data) => {
//     const parsedData = data.slice(1); // Remove header row
//     const customersCol = collection(db, 'customers');
    
//     parsedData.forEach(async (row) => {
//       if (row.length > 0) {
//         // Mapping values by their indices
//         const customer = row[0] || "";
//         const company = row[1] || "";
//         const streetAddress = row[2] || "";
//         const city = row[3] || "";
//         const state = row[4] || "";
//         const country = row[5] || "";
//         const zip = row[6] || "";
//         const phone = row[7] || "";
//         const email = row[8] || "";
//         const customerType = row[9] || "";
//         const attachments = row[10] || "";
//         const openBalance = row[11] || "";
//         const notes = row[12] || "";

//         const customerObject = {
//           customer,
//           company,
//           streetAddress,
//           city,
//           state,
//           country,
//           zip,
//           phone,
//           email,
//           customerType,
//           attachments,
//           openBalance,
//           notes,
//         };

//         // Log the customerObject to inspect before uploading
//         console.log(customerObject);
        
//         try {
//           await addDoc(customersCol, customerObject);
//         } catch (error) {
//           console.error('Error uploading to Firestore:', error);
//         }
//       }
//     });

//     console.log('Data uploaded to Firestore');
//     handleCSVUpload();
//   };

//   return (
//     <div>
//       <h2>Upload your CSV</h2>
//       <CSVReader
//         onFileLoaded={(data) => handleCSVUpload(data)}
//         inputId="csvInput"
//       />
//     </div>
//   );
// }

// export default FirebaseDataUpload;
