import React, { useState } from 'react';
import WarrantyForm from './WarrantyForm';
import WarrantyData from './WarrantyData';  // If you have or plan to have this component
import GeneralWarrantyStats from './GeneralWarrantyStats';  // If you have or plan to have this component

function WarrantyOverview() {
    const [activeTab, setActiveTab] = useState('GeneralStats');

    return (
        <div className="warrantyOverview">
            <div className="tabSection">
                <button 
                    className={`tabButton ${activeTab === 'GeneralStats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('GeneralStats')}>
                    General Stats
                </button>
                <button 
                    className={`tabButton ${activeTab === 'WarrantyForm' ? 'active' : ''}`}
                    onClick={() => setActiveTab('WarrantyForm')}>
                    Warranty Form
                </button>
                <button 
                    className={`tabButton ${activeTab === 'WarrantyData' ? 'active' : ''}`}
                    onClick={() => setActiveTab('WarrantyData')}>
                    Warranty Data
                </button>
            </div>
            <div className="tabContent">
                {activeTab === 'GeneralStats' && <GeneralWarrantyStats />}
                {activeTab === 'WarrantyForm' && <WarrantyForm />}
                {activeTab === 'WarrantyData' && <WarrantyData />}
            </div>
        </div>
    );
}

export default WarrantyOverview;
