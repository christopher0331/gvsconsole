import React from 'react';

function GeneralStatistics({ customers }) {
    // Calculate total number of customers
    const totalCustomers = customers.length;

    // Calculate number of customers from each city
    const cityCounts = customers.reduce((acc, customer) => {
        const city = customer.City;
        if (!acc[city]) {
            acc[city] = 1;
        } else {
            acc[city]++;
        }
        return acc;
    }, {});

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
                    {Object.entries(cityCounts).map(([city, count]) => (
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
