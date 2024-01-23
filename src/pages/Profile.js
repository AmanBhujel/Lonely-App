import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProfilePage from '../components/profile/page';
// import ProfilePage from '../components/profile/profilemodel';


const Profile = () => {
    return (
        <div
            className='w-full h-screen flex flex-row'
            style={{
                background: 'linear-gradient(to bottom right, #dfd5f6,white,white,  #C1AEEE )',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Sidebar  mobileWidth={1024} />
            {/* <ProfilePage/> */}
            <ProfilePage />
        </div>
    );
};

export default Profile;
