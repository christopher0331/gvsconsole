import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function AddCustomer() {
    const [formData, setFormData] = useState({
        customer: '',
        company: '',
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        phone: '',
        email: '',
        customerType: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'LeadManagement'), formData);
            console.log("Document written with ID: ", docRef.id);
            setFormData({
                customer: '',
                company: '',
                streetAddress: '',
                city: '',
                state: '',
                country: '',
                zip: '',
                phone: '',
                email: '',
                customerType: '',
                notes: ''
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Create form fields based on the fields in the state */}
            {Object.keys(formData).map(key => (
                <div key={key}>
                    <label>{key}</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button type="submit">Add Customer</button>
        </form>
    );
}

export default AddCustomer;
