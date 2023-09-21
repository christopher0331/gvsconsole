import React, { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const customersCol = collection(db, 'customers');
            const customerSnapshot = await getDocs(query(customersCol));
            const customerList = customerSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCustomers(customerList);
        };

        fetchData();
    }, []);

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

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
                <p>Total Customers: {customers.length}</p>
                <p>Displaying: {Math.min(customers.length, customersPerPage)} customers per page</p>
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
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
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
