import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './styles/WarrantyForm.css';
const WarrantyForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequest = {
      firstName,
      lastName,
      email,
      phone,
      city,
      zipCode,
      state,
      description,
    };

    try {
      const docRef = await addDoc(collection(db, "warrantyForms"), newRequest);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCity('');
    setZipCode('');
    setState('');
    setDescription('');
  };
  return (
    <div className="projOverviewDiv">
        <form onSubmit={handleSubmit} className="formContainer">
            <h1 className="formTitle">How can we help?</h1>
            <p className="formParagraph">Fields marked with an * are required</p>
            
            <div className="formField">
                <label className="formLabel">
                    First Name*:
                    <input className="formInput"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
            </div>

            <div className="formField">
                <label className="formLabel">
                    Last Name*:
                    <input className="formInput"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
            </div>

            <div className="formField">
                <label className="formLabel">
                    Email*:
                    <input className="formInput"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>

            <div className="formField">
                <label className="formLabel">
                    Phone:
                    <input className="formInput"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
            </div>

            <div className="formField">
                <label className="formLabel">
                    City*:
                    <input className="formInput"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
            </div>

            <div className="formField">
                <label className="formLabel">
                    Zip Code*:
                    <input className="formInput"
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </label>
            </div>

            <div className="formField">
                <label className="formLabel">
                    State/Region*:
                    <input className="formInput"
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
            </div>

            <div className="formField">
                <label className="formLabel">
                    Tell Us About Your Request:
                    <textarea className="formInput"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>

            <button type="submit" className="formButton">Submit Request</button>
        </form>
    </div>
);

};

export default WarrantyForm;
