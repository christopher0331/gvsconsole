import React, { useState } from 'react';

function CustomerList({ customers }) {
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 50;

    // Get current customers
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
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
                        <tr key={index}>
                            <td>{customer.Customer}</td>
                            <td>{customer.Company}</td>
                            <td>{customer.StreetAddress}</td>
                            <td>{customer.City}</td>
                            <td>{customer.State}</td>
                            <td>{customer.Country}</td>
                            <td>{customer.Zip}</td>
                            <td>{customer.Phone}</td>
                            <td>{customer.Email}</td>
                            <td>{customer.CustomerType}</td>
                            <td>{customer.Notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination buttons */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(customers.length / customersPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CustomerList;
