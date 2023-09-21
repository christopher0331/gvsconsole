import React from 'react';

function GeneralStatistics({ customers }) {
    // Calculate total number of customers
    const totalCustomers = customers.length;

    // Calculate number of customers from each country
    const countryCounts = customers.reduce((acc, customer) => {
        const country = customer.country;
        if (!acc[country]) {
            acc[country] = 1;
        } else {
            acc[country]++;
        }
        return acc;
    }, {});

    // Filter out countries with less than 3 customers and sort them in descending order
    const sortedCountryCounts = Object.entries(countryCounts)
        .filter(([country, count]) => count >= 3)
        .sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <h2>General Statistics</h2>

            <div>
                <h3>Total Customers:</h3>
                <p>{totalCustomers}</p>
            </div>

            <div>
                <h3>Customers by country:</h3>
                <ul>
                    {sortedCountryCounts.map(([country, count]) => (
                        <li key={country}>
                            {country}: {count}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GeneralStatistics;
