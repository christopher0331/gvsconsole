import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Adjust this import path accordingly

function GeneralWarrantyStats() {
    const [warranties, setWarranties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWarranties = async () => {
            try {
                const warrantyCollection = collection(db, "warrantyForms");
                const warrantySnapshot = await getDocs(warrantyCollection);
                const warrantyData = warrantySnapshot.docs.map(doc => doc.data());
                setWarranties(warrantyData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchWarranties();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const cityCounts = warranties.reduce((acc, warranty) => {
        const city = warranty.city;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
    }, {});

    return (
        <div>
            <h2>General Warranty Stats</h2>
            <div>
                <strong>Total Warranties:</strong> {warranties.length}
            </div>
            <h3>Warranties by City:</h3>
            <ul>
                {Object.entries(cityCounts).map(([city, count]) => (
                    <li key={city}>{city}: {count}</li>
                ))}
            </ul>
        </div>
    );
}

export default GeneralWarrantyStats;
