import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore'; // Import limit
import { db } from '../firebaseConfig';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 50;
    const CACHE_KEY = 'customers_cache';
    const CACHE_DURATION = 3600000; // 1 hour in milliseconds
    
    useEffect(() => {
        const fetchData = async () => {
            let cachedData = localStorage.getItem(CACHE_KEY);
    
            if (cachedData) {
                cachedData = JSON.parse(cachedData);
    
                const now = Date.now();
                if (now - cachedData.timestamp < CACHE_DURATION) {
                    setCustomers(cachedData.data);
                    return;
                }
            }
    
            const customersCol = collection(db, 'InvoiceListContactList');
            const q = query(customersCol, limit(20)); // Limiting to 20
            const customerSnapshot = await getDocs(q);
            const customerList = customerSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    
            setCustomers(customerList);
    
            // Cache the data
            localStorage.setItem(CACHE_KEY, JSON.stringify({ 
                data: customerList, 
                timestamp: Date.now() 
            }));
        };
    
        fetchData();
    }, []);
    

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const cityCounts = customers.reduce((acc, customer) => {
        const city = customer.city;
        if (acc[city]) {
            acc[city] += 1;
        } else {
            acc[city] = 1;
        }
        return acc;
    }, {});

    // Pagination functions
    const nextPage = () => {
        if (currentPage < Math.ceil(customers.length / customersPerPage)) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div>
            {/* Display total number of customers and count per page */}
            <div>
                <p>Total Customers!!: {customers.length}</p>
                <p>Displaying: {Math.min(customers.length, customersPerPage)} customers per page</p>
            </div>

            {/* Display city counts */}
            <div>
                <h3>City Counts:</h3>
                <ul>
                    {Object.entries(cityCounts).map(([city, count]) => (
                        <li key={city}>{city}: {count}</li>
                    ))}
                </ul>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Company</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Zip</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Customer Type</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCustomers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{customer.customer}</td>
                            <td>{customer.company}</td>
                            <td>{customer.streetAddress}</td>
                            <td>{customer.state}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                            <td>{customer.zip}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            <td>{customer.customerType}</td>
                            <td>{customer.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination buttons */}
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(customers.length / customersPerPage)}>Next</button>
            </div>
        </div>
    );
}

export default CustomerList;
