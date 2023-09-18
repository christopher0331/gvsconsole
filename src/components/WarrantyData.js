import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Update this import path accordingly
import './styles/WarrantyData.css';

const WarrantyData = () => {

        const [requests, setRequests] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        const fetchData = async () => {
            try {
                const requestCollection = collection(db, "warrantyForms");
                const requestSnapshot = await getDocs(requestCollection);
                const requestData = requestSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRequests(requestData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchData();
        }, []);
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
    
        return (
            <div className="projOverviewDiv">
                {requests.length === 0 ? (
                    <p>No requests found.</p>
                ) : (
                    <table>
                        <thead>
                            Warranty Data
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip Code</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.firstName}</td>
                                    <td>{request.lastName}</td>
                                    <td>{request.email}</td>
                                    <td>{request.phone}</td>
                                    <td>{request.city}</td>
                                    <td>{request.state}</td>
                                    <td>{request.zipCode}</td>
                                    <td>{request.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
        
    }
    
    export default WarrantyData;
    