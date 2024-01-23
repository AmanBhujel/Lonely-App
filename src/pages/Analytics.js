import React from 'react';
import Sidebar from '../components/Sidebar';
import AnalyticsPage from '../components/analytics/page';

const Analytics = () => {
    return (
        <div className='w-full lg:h-screen flex bg-[#f1f6f7] h-min overflow-y-auto'>
            <Sidebar mobileWidth={1280} />
            <AnalyticsPage />
        </div>
    )
}

export default Analytics