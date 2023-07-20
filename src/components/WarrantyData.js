import React, { useContext } from 'react';
import { DataContext } from './Context.js';
import AWS from 'aws-sdk';

const WarrantyData = () => {
    const { state, loading, deleteItemFromContext, editItem } = useContext(DataContext);
    const warrantyData = state.warrantyData;

    // Function to handle delete
    const handleDelete = async (item) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await deleteItemFromContext(item);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    // Function to handle update
    const handleUpdate = (item) => {
        editItem(item);
    };

    if (!warrantyData || warrantyData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Warranty Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Product Name</th>
                        <th>Product Serial Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {warrantyData.map((item) => (
                        <tr key={item.email}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.productName}</td>
                            <td>{item.productSerialNumber}</td>
                            <td>
                                <button onClick={() => handleUpdate(item)}>Update</button>
                                <button onClick={() => handleDelete(item)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WarrantyData;
