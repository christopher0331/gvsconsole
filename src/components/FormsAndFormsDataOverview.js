import React, { useState } from 'react';
import WarrantyForm from './WarrantyForm';
import WarrantyData from './WarrantyData';
import MarketingForm from './MarketingForm';
import MarketingData from './MarketingFormData';
import './styles/FormsAndFormDataOverview.css';

const FormsAndFormDataOverview = () => {
    const [activeTab, setActiveTab] = useState('WarrantyForm');

    return (
        <div className="overviewContainer">
            <div className="tabMenu">
                <button onClick={() => setActiveTab('WarrantyForm')} className={activeTab === 'WarrantyForm' ? 'active' : ''}>Warranty Form</button>
                <button onClick={() => setActiveTab('WarrantyData')} className={activeTab === 'WarrantyData' ? 'active' : ''}>Warranty Data</button>
                <button onClick={() => setActiveTab('MarketingForm')} className={activeTab === 'MarketingForm' ? 'active' : ''}>Marketing Form</button>
                <button onClick={() => setActiveTab('MarketingData')} className={activeTab === 'MarketingData' ? 'active' : ''}>Marketing Data</button>
            </div>

            <div className="tabContent">
                {activeTab === 'WarrantyForm' && <WarrantyForm />}
                {activeTab === 'WarrantyData' && <WarrantyData />}
                {activeTab === 'MarketingForm' && <MarketingForm />}
                {activeTab === 'MarketingData' && <MarketingData />}
            </div>
        </div>
    );
}

export default FormsAndFormDataOverview;
