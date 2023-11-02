// Customers.js

import React, { useState, useEffect } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore'; // Import limit and query
import { db } from '../firebaseConfig';
import CustomerList from '../components/CustomerList';
import GeneralStatistics from '../components/GeneralStatistics';

export const getCustomers = async () => {
  const customersCol = collection(db, 'InvoiceListContactList');
  const q = query(customersCol, limit(20)); // Limiting to 20
  const customerSnapshot = await getDocs(q);
  const customerList = customerSnapshot.docs.map(doc => doc.data());
  return customerList;
};

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState('GeneralStatistics');

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="customerOverview">
      <div className="tabMenu">
        <button onClick={() => setActiveTab('ContactInfo')} className={activeTab === 'ContactInfo' ? 'active' : ''}>Customer List</button>
        <button onClick={() => setActiveTab('GeneralStatistics')} className={activeTab === 'GeneralStatistics' ? 'active' : ''}>General Statistics</button>
      </div>
      <div className="tabContent">
        {activeTab === 'ContactInfo' && <CustomerList customers={customers} />}
        {activeTab === 'GeneralStatistics' && <GeneralStatistics customers={customers}/>}
      </div>
    </div>
  );
}

export default Customers;
