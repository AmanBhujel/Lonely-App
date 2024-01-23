import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ isLogOutOpen, setIsLogOutOpen }) => {
    const navigate=useNavigate();
    const handleClose = () => {
        setIsLogOutOpen(false);
    }

    const handleLogout = () => {
        setIsLogOutOpen(false);
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/auth')
    };

    return (
        <>
            {isLogOutOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 z-10 relative rounded-xl">
                        <button onClick={handleClose} className='absolute top-0 right-2 text-2xl'><IoIosCloseCircleOutline /></button>
                        <p className="text-lg font-semibold mb-4">Do you want to logout?</p>
                        <div className="flex justify-center">
                            <button
                                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutModal;
