// const [customerData, setCustomerData] = useState([]);
//     const [invoiceList, setInvoiceList] = useState([]);
//     const [keywordStats, setKeywordStats] = useState({});
//     const [matchedResults, setMatchedResults] = useState([]);

//     const keywords = [
//         'AD IQ', 'QC', 'Neighbor', 'Referred', 'Google',
//         'Friend Reference', 'Sign', 'Returning Client', 'Existing Client'
//     ];

//     useEffect(() => {
//         Papa.parse(customerListData, {
//             header: true,
//             download: true,
//             complete: (result) => {
//                 setCustomerData(result.data);

//                 Papa.parse(invoiceData, {
//                     header: true,
//                     download: true,
//                     complete: (invoiceResult) => {
//                         setInvoiceList(invoiceResult.data);

//                         Papa.parse(csvData, {
//                             header: true,
//                             download: true,
//                             complete: (parseResult) => {
//                                 const cleanedData = parseResult.data.filter(row => {
//                                     const description = row["description"];
//                                     return description && typeof description === 'string' && description.trim() !== '';
//                                 });

//                                 const tempMatchedResults = [];
//                                 cleanedData.forEach(row => {
//                                     const description = row["description"];
//                                     const address = row["location"];
//                                     const dateStart = new Date(row["dtstart"]);
//                                     keywords.forEach(kw => {
//                                         if (description.toLowerCase().includes(kw.toLowerCase())) {
//                                             tempMatchedResults.push({ address, keyword: kw, date: dateStart });
//                                         }
//                                     });
//                                 });

//                                 const stats = keywords.reduce((acc, kw) => {
//                                     acc[kw] = {
//                                         count: 0,
//                                         totalAmount: 0,
//                                         customerMatchCount: 0
//                                     };
//                                     return acc;
//                                 }, {});

//                                 tempMatchedResults.forEach(result => {
//                                     const matchedCustomer = customerData.find(customer =>
//                                         customer["Billing address"] && result.address.includes(customer["Billing address"])
//                                     );

//                                     if (matchedCustomer) {
//                                         result.name = matchedCustomer["Customer full name"];
//                                         result.billingAddress = matchedCustomer["Billing address"];

//                                         const matchedInvoice = invoiceList.find(invoice =>
//                                             invoice["Customer full name"] === result.name
//                                         );

//                                         if (matchedInvoice) {
//                                             result.amount = matchedInvoice["Amount"];
//                                         }

//                                         // Incrementing customer match count for the keyword
//                                         stats[result.keyword].customerMatchCount += 1;
//                                     }

//                                     stats[result.keyword].count += 1;
//                                     if (result.amount && !isNaN(parseFloat(result.amount)) && result.amount !== 'N/A') {
//                                         stats[result.keyword].totalAmount += parseFloat(result.amount);
//                                     }
//                                 });

//                                 setMatchedResults(tempMatchedResults);
//                                 setKeywordStats(stats);
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }, []);


//     const processAndPushDataToFirestore = () => {
//       const processedData = matchedResults.map(result => {
//           return {
//               name: result.name,
//               address: result.address,
//               marketingChannels: result.keyword,
//               date: result.date.toLocaleDateString(),
//               amount: result.amount || 'N/A'
//           }
//       });

//       const marketingInfoCol = collection(db, 'marketingInfo');
      
//       processedData.forEach(async (data) => {
//           try {
//               await addDoc(marketingInfoCol, data);
//               console.log('Document successfully written!');
//           } catch (error) {
//               console.error("Error writing document: ", error);
//           }
//       });
//   }
//       return (
//         <div>
//             {/* Display matched results */}
//             {processAndPushDataToFirestore()}

//             {matchedResults && matchedResults.map((result, index) => (
//                 <div key={index}>
//                     Name: {result.name || 'N/A'} <br />
//                     Address: {result.address || 'N/A'} <br />
//                     Billing Address: {result.billingAddress || 'N/A'} <br />
//                     Keywords: {result.keyword || 'N/A'} <br /> 
//                     Date: {result.date ? result.date.toLocaleDateString() : 'N/A'} <br />
//                     {/* Amount: {result.amount ? `$${result.amount.toFixed(2)}` : 'N/A'} <br />! */}
//                 </div>
//             ))}
            
//             <div>
//                 Keyword Stats:
//                 {Object.entries(keywordStats).map(([keyword, stats]) => (
//                     <div key={keyword}>
//                         <strong>{keyword}</strong>
//                         <ul>
//                             <li>Count: {stats.count}</li>!
//                             {/* <li>Total Amount: ${stats.totalAmount.toFixed(2)}</li> */}
//                             <li>Customer Matches: {stats.customerMatchCount}</li>!~
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );