import React, { useState, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import "./styles/Overview.css";
import Customers from './Customers.js';
import Financial from './Financial.js';
import Marketing from './Marketing.js';
import WarrantyData from './WarrantyData.js';
import Projects from './Projects.js';
import MarketingFormData from './MarketingFormData.js';
import { DataProvider } from './Context.js'; // import the DataProvider

const SortableItem = SortableElement(({ value }) => 
  <div style={{height: '100%', width: '100%'}} className="item">
    {value}
  </div>
);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div className="list" style={{width: '100%', height: '100%'}}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

function move(arr, oldIndex, newIndex) {
    // Create a new array instance to avoid mutating the original array
    let newArr = [...arr];

    // Ensure that oldIndex and newIndex are within the bounds of the array
    if (oldIndex < 0 || oldIndex > 5 || newIndex < 0 || newIndex > 5) {
        throw new Error('Index out of bounds. You should provide a valid index between 0 and 5');
    }

    // Temporary variable to hold the element that is being moved
    let temp = newArr[oldIndex];

    // Moving element down and the rest up
    if (oldIndex < newIndex) {
        for (let i = oldIndex; i < newIndex; i++) {
            newArr[i] = newArr[i + 1];
        }
    }

    // Moving element up and the rest down
    else if (oldIndex > newIndex) {
        for (let i = oldIndex; i > newIndex; i--) {
            newArr[i] = newArr[i - 1];
        }
    }

    newArr[newIndex] = temp;
  
    return newArr;
}

function Overview() {
    const componentOrder = ["Customers", "Financial", "Marketing", "WarrantyData", "Projects", "MarketingFormData"];
    const components = {
      Customers: <Customers />, 
      Financial: <Financial />,
      Marketing: <Marketing />, 
      Projects: <Projects />,
      WarrantyData: <WarrantyData />,
      MarketingFormData: <MarketingFormData />
    };
  
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      const storedOrder = JSON.parse(localStorage.getItem('componentOrder'));
      if (storedOrder) {
        setItems(storedOrder.map(key => components[key]));
      } else {
        setItems(componentOrder.map(key => components[key]));
      }
    }, []);
  
    const onSortEnd = ({ oldIndex, newIndex }) => {
      const newOrder = move(componentOrder, oldIndex, newIndex);
      setItems(newOrder.map(key => components[key]));
      localStorage.setItem('componentOrder', JSON.stringify(newOrder));
    };
  
    return (
      <DataProvider> {/* Wrap SortableList with DataProvider */}
        <SortableList items={items} onSortEnd={onSortEnd} axis="xy" />
      </DataProvider>
    );
  };
  
export default Overview;

