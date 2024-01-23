import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import SubscriptionPage from '../components/subscription/Page'
import { tokenFunction } from '../components/utills/checkToken';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate=useNavigate();

    // -----------Function to check auth----------------
    useEffect(() => {
        tokenFunction(setIsLoading, navigate);
    }, []);
    return (
        !isLoading &&
        <div className='w-full h-screen flex' >
            <Sidebar mobileWidth={1280} />
            <SubscriptionPage />
        </div>
    )
}

export default Subscription