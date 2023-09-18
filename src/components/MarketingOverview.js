import React, { useState } from 'react';
import MarketingForm from './MarketingForm';
// import DataVisualization from './DataVisualization';  // If you have or plan to have this component
// import MarketingData from './MarketingData';  // If you have or plan to have this component
import './styles/MarketingOverview.css';


function MarketingOverview() {
    const [activeTab, setActiveTab] = useState('DataVisualization');

    return (
        <div className="marketingOverview">
            <div className="tabSection">
                <button 
                    className={`tabButton ${activeTab === 'DataVisualization' ? 'active' : ''}`}
                    onClick={() => setActiveTab('DataVisualization')}>
                    Data Visualization
                </button>
                <button 
                    className={`tabButton ${activeTab === 'MarketingForm' ? 'active' : ''}`}
                    onClick={() => setActiveTab('MarketingForm')}>
                    Marketing Form
                </button>
                <button 
                    className={`tabButton ${activeTab === 'MarketingData' ? 'active' : ''}`}
                    onClick={() => setActiveTab('MarketingData')}>
                    Marketing Data
                </button>
            </div>
            <div className="tabContent">
                {activeTab === 'DataVisualization' && <p>Data Visualization Component Goes Here</p>}
                {activeTab === 'MarketingForm' && <MarketingForm />}
                {activeTab === 'MarketingData' && <p>Marketing Data Component Goes Here</p>}
            </div>
        </div>
    );
}

export default MarketingOverview;
