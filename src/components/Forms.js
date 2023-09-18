import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import WarrantyData from './WarrantyData.js';
import "./styles/Forms.css";
import { DataProvider } from './Context.js';
import AWS from 'aws-sdk';
import MarketingForm from './MarketingForm.js';

const SortableItem = SortableElement(({ value }) => <div className="quadrant">{value}</div>);

const SortableGrid = SortableContainer(({ items }) => {
  return (
    <div className="grid">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

function move(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
      var k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  }

function Forms() {
  const [items, setItems] = useState([<WarrantyData />, <MarketingForm />, "Quadrant 3", "Quadrant 4"]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(move(items, oldIndex, newIndex));
  };

  return (
    <DataProvider>
        <div className="quadrants">
            <SortableGrid axis="xy" items={items} onSortEnd={onSortEnd} />
        </div>
    </DataProvider>
  );
}

export default Forms;
