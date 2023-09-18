import React, { useState } from 'react';
import WarrantyForm from './WarrantyForm';
import WarrantyData from './WarrantyData';  // If you have or plan to have this component
import GeneralWarrantyStats from './GeneralWarrantyStats';  // If you have or plan to have this component

function WarrantyOverview() {
    const [activeTab, setActiveTab] = useState('GeneralWarrantyStats');

    return (
        <div className="warrantyOverview">
            <div className="tabMenu"> {/* Renamed tabSection to tabMenu */}
            <button onClick={() => setActiveTab('GeneralWarrantyStats')} className={activeTab === 'GeneralWarrantyStats' ? 'active' : ''}>General Stats</button>
            <button onClick={() => setActiveTab('WarrantyForm')} className={activeTab === 'WarrantyForm' ? 'active' : ''}>Warranty Form</button>
            <button onClick={() => setActiveTab('WarrantyData')} className={activeTab === 'WarrantyData' ? 'active' : ''}>Warranty Data</button>
            </div>
            <div className="tabContent">
                {activeTab === 'GeneralWarrantyStats' && <GeneralWarrantyStats />}
                {activeTab === 'WarrantyForm' && <WarrantyForm />}
                {activeTab === 'WarrantyData' && <WarrantyData />}
            </div>
        </div>
    );
}

export default WarrantyOverview;
