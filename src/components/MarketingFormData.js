import React, { useContext } from 'react';
import { DataContext } from './Context.js';

const MarketingFormData = () => {

  const { state, deleteMarketingItemFromContext, editItem } = useContext(DataContext);
  const marketingData = state.marketingData;

  if (!marketingData) {
    // Handle the case when marketingData is undefined or empty
    return (
      <div>
        <h1>No Marketing Data Found</h1>
        <p>There are no marketing records available.</p>
      </div>
    );
  }


    // Function to handle delete
    const handleDelete = async (item) => {
      if (window.confirm("Are you sure you want to delete this record?")) {
        try {
          await deleteMarketingItemFromContext(item);
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      }
    };
  
    // Function to handle update
    const handleUpdate = (item) => {
      editItem(item);
    };

  return (
    <div>
      <h1>Marketing Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Street Number</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Phone</th>
            <th>Marketing Channels</th>
            <th>Bid Total</th>
            <th>Completed Project Total</th>
            <th>Project Types</th>
          </tr>
        </thead>
        <tbody>
          {marketingData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.streetNumber}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.zipCode}</td>
              <td>{item.phone}</td>
              <td>{item.marketingChannels}</td>
              <td>{item.bidTotal}</td>
              <td>{item.completedProjectTotal}</td>
              <td>{item.projectTypes}</td>
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

export default MarketingFormData;
