import React, { useState, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import "./styles/Overview.css";
import Customers from './Customers.js';
import Financial from './Financial.js';
import MarketingOverview from './MarketingOverview.js';
import WarrantyData from './WarrantyData.js';
import WarrantyOverview from './WarrantyOverview';
import Projects from './Projects.js';
import MarketingFormData from './MarketingFormData.js';
import { DataProvider } from './Context.js'; // import the DataProvider
import AWS from 'aws-sdk';
function Overview() {
  return (
      <DataProvider>
          <div className="overview-flex-container">
              <div className="overview-flex-item">
                  <Customers />
              </div>
              <div className="overview-flex-item">
                  <Financial />
              </div>
              <div className="overview-flex-item">
                  <MarketingOverview />
              </div>
              <div className="overview-flex-item">
                  <Projects />
              </div>
              <div className="overview-flex-item">
                  <WarrantyOverview />
              </div>
              <div className="overview-flex-item">
                  <MarketingFormData />
              </div>
          </div>
      </DataProvider>
  );
}

export default Overview;


