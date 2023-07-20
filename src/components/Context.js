import React, { useEffect, createContext, useReducer, useState } from 'react';
import DynamoDBServiceWarranty from '../dbhelpers/dynamoDBServiceWarranty.js'; // adjust this path to your dynamoDBService.js file location
import DynamoDBServiceMarketing from '../dbhelpers/dynamoDBServiceMarketing.js'; // adjust this path to your dynamoDBService.js file location

const DataContext = createContext();

const initialState = {
  warrantyData: [],
  marketingData: [],
};

const dbServiceWarranty = new DynamoDBServiceWarranty();
const dbServiceMarketing = new DynamoDBServiceMarketing();

// Define a reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MARKETING_DATA':
      return { ...state, marketingData: action.payload };
    case 'SET_WARRANTY_DATA':
      return { ...state, warrantyData: action.payload };
    case 'DELETE_ITEM_WARRANTY':
      return { ...state, warrantyData: state.warrantyData.filter(item => item.email !== action.payload.email) };
    case 'DELETE_ITEM_MARKETING':
        return { ...state, marketingData: state.marketingData.filter(item => item.id !== action.payload.id) };
    case 'EDIT_ITEM':
      // This part needs to be implemented based on your requirement
      return state;
    case 'ADD_ITEM_WARRANTY':
      return { ...state, warrantyData: [...state.warrantyData, action.payload] };
    case 'ADD_ITEM_MARKETING':
      return { ...state, marketingData: [...state.marketingData, action.payload] };
    default:
      throw new Error();
  }
};

// Define a provider
const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true); // Add loading state
  
    const setWarrantyData = (data) => {
      dispatch({ type: 'SET_WARRANTY_DATA', payload: data });
    };
  
    // Define actions
    const setMarketingData = (data) => {
      dispatch({ type: 'SET_MARKETING_DATA', payload: data });
    };
    
    useEffect(() => {
      const fetchMarketingData = async () => {
        try {
          return await dbServiceMarketing.getAllItems();
        } catch (error) {
          console.error('Error fetching marketing data:', error);
        }
      };
  
      const fetchWarrantyData = async () => {
        try {
          return await dbServiceWarranty.getAllItems();
        } catch (error) {
          console.error('Error fetching warranty data:', error);
        }
      };
  
      Promise.all([fetchMarketingData(), fetchWarrantyData()])
        .then(([marketingData, warrantyData]) => {
          setMarketingData(marketingData);
          setWarrantyData(warrantyData);
          setLoading(false); // Set loading to false after both promises have completed
        });
    }, []);
  
  
    useEffect(() => {
        const fetchMarketingData = async () => {
          try {
            return await dbServiceMarketing.getAllItems();
          } catch (error) {
            console.error('Error fetching marketing data:', error);
            return []; // return empty array in case of error
          }
        };
      
        const fetchWarrantyData = async () => {
          try {
            return await dbServiceWarranty.getAllItems();
          } catch (error) {
            console.error('Error fetching warranty data:', error);
            return []; // return empty array in case of error
          }
        };
      
        Promise.all([fetchMarketingData(), fetchWarrantyData()])
          .then(([marketingData, warrantyData]) => {
            setMarketingData(marketingData);
            setWarrantyData(warrantyData);
            setLoading(false); // Set loading to false after both promises have completed
          });
      }, []);
      



  const addItemWarranty = async (item) => {
    try {
      await dbServiceWarranty.createItem(item);
      dispatch({ type: 'ADD_ITEM_WARRANTY', payload: item });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItemFromContext = async (item) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await dbServiceWarranty.deleteItem(item.email);
        dispatch({ type: 'DELETE_ITEM_WARRANTY', payload: item });
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };




  const addItem = async (item) => {
    try {
      await dbServiceMarketing.createItem(item);
      dispatch({ type: 'ADD_ITEM_MARKETING', payload: item });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteMarketingItemFromContext = async (item) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await dbServiceMarketing.deleteMarketingItem(item.id);
        dispatch({ type: 'DELETE_ITEM_MARKETING', payload: item });
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  
  const editItem = (item) => {
    dispatch({ type: 'EDIT_ITEM', payload: item });
    // Call to DBService update method needs to be implemented
  };


  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div>
        <DataContext.Provider
        value={{
            state,
            setMarketingData,
            setWarrantyData,
            deleteItemFromContext,
            editItem,
            addItem,
            addItemWarranty,
            deleteMarketingItemFromContext
        }}
        >
        {children}
        </DataContext.Provider>
    </div>
  );
};

export { DataContext, DataProvider };
