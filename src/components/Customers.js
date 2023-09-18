import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from './Context.js'; // adjust this path to your context.js file location
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Adjust the path as needed
import CustomerList from '../components/CustomerList';
import GeneralStatistics from '../components/GeneralStatistics';
// import './styles/AboutUs.css';
import SampleCustomers from './DummyData.js';

export const getCustomers = async () => {
  const customersCol = collection(db, 'customers');
  const customerSnapshot = await getDocs(customersCol);
  const customerList = customerSnapshot.docs.map(doc => doc.data());
  return customerList;
};

console.log(SampleCustomers)
function Customers() {
  // const [customers, setCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState('GeneralStatistics');
  const customers = SampleCustomers;

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     const data = await getCustomers();
  //     setCustomers(data);
  //   };

  //   fetchCustomers();
  // }, []);

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('ContactInfo')}>Customer List</button>
        <button onClick={() => setActiveTab('GeneralStatistics')}>General Statistics</button>
      </div>
      {activeTab === 'ContactInfo' && <CustomerList customers={customers} />}
      {activeTab === 'GeneralStatistics' && <GeneralStatistics customers={customers} />}
    </div>
  );
}

export default Customers;

