import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import SchedulePage from '../components/schedule/Page'
import { useNavigate } from 'react-router-dom';
import { tokenFunction } from '../components/utills/checkToken';
import ContextWrapper from '../components/schedule/context/ContextWrapper';

const Schedule = () => {
    const navigate = useNavigate();

    // -----------Function to check auth----------------
    useEffect(() => {
        tokenFunction(navigate);
    }, []);
    return (
        <ContextWrapper>
            <div className='w-full h-screen flex'>
                <Sidebar mobileWidth={1280} />
                <SchedulePage />
            </div>
        </ContextWrapper>


    )
}

export default Schedule