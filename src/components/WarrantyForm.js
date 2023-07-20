import React, { useContext, useState } from 'react';
import { DataContext } from './Context.js'; // adjust this path to your context.js file location
import './styles/AboutUs.css';

const WarrantyForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('');
  const [productSerialNumber, setProductSerialNumber] = useState('');
  const { addItemWarranty } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSetupWarranty = {
      firstName,
      lastName,
      email,
      productName,
      productSerialNumber,
    };

    addItemWarranty(newSetupWarranty);

    try {
      
      // Update the warrantyData in the context
      setFirstName('');
      setLastName('');
      setEmail('');
      setProductName('');
      setProductSerialNumber('');

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='projOverviewDiv'>
      <form onSubmit={handleSubmit}>
        <h1>Warranty Form</h1>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Product Serial Number:
          <input
            type="text"
            value={productSerialNumber}
            onChange={(e) => setProductSerialNumber(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WarrantyForm;