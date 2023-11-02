import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './styles/Display.css';

function DisplayCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const customersCol = collection(db, 'InvoiceListContactInfo');
      const customerSnapshot = await getDocs(customersCol);
      const customerList = customerSnapshot.docs.map(doc => doc.data());

      // Sort the customers list first by city and then by name within each city
      customerList.sort((a, b) => {
        const cityComparison = a.city.localeCompare(b.city);
        if (cityComparison !== 0) return cityComparison;
        return a.name.localeCompare(b.name);
      });

      setCustomers(customerList);
    };
    
    fetchData();
  }, []);

  const groupByCity = () => {
    const grouped = {};
    customers.forEach(customer => {
      if (grouped[customer.city]) {
        grouped[customer.city]++;
      } else {
        grouped[customer.city] = 1;
      }
    });
    return grouped;
  };

  const cityGroups = groupByCity();

  return (
    <div>
        <h2>Customers by City</h2>
        <div style={{'display': 'flex', 'flexDirection': 'column'}}>
        {Object.keys(cityGroups).sort().map(city => (
            <div key={city} style={{'display': 'flex', 'justifyContent': 'space-between'}}>
            <span>{city}</span>
            <strong>{cityGroups[city]}</strong>
            </div>
        ))}
        </div>

      <h2>Customer Info</h2>
      <div className="customer-list">
        {customers.map((customer, index) => (
          <div key={customer.name} className="customer-row">
            <span>{index + 1}. {customer.name}</span> 
            <span>{customer.email}</span> 
            <span>{customer.city}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayCustomers;
