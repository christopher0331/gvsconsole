import React from 'react';

function GeneralStatistics({ customers }) {
    // Calculate total number of customers
    const totalCustomers = customers.length;

    // Calculate number of customers from each country
    const cityCounts = customers.reduce((acc, customer) => {
        const city = customer.city;
        if (!acc[city]) {
            acc[city] = 1;
        } else {
            acc[city]++;
        }
        return acc;
    }, {});

    // Filter out countries with less than 3 customers and sort them in descending order
    const sortedCityCounts = Object.entries(cityCounts)
        .filter(([city, count]) => count >= 3)
        .sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <h2>General Statistics</h2>

            <div>
                <h3>Total Customers:</h3>
                <p>{totalCustomers}</p>
            </div>

            <div>
                <h3>Customers by City:</h3>
                <ul>
                    {sortedCityCounts.map(([city, count]) => (
                        <li key={city}>
                            {city}: {count}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GeneralStatistics;
