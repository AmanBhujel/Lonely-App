import React from 'react';
import { UilAngleDown, UilBolt, UilBrightnessPlus } from '@iconscout/react-unicons';

const ChatPageDropdown = ({isDropdownOpen,navigate,dropdownRef,handleButtonClick}) => {
    return (
        <div className="relative flex items-center w-full h-16   border-b-2">
            <button
                className={` flex items-center text-xl font-semibold ml-16 md:ml-2 hover:bg-gray-200 rounded-xl px-3 py-2 ${isDropdownOpen ? 'bg-gray-200' : ''}`}
                onClick={handleButtonClick}
            >
                Emma
                <span className="text-gray-500 text-base ml-1 font-bold">1.0</span>
                <span className="ml-3">
                    <UilAngleDown />
                </span>
            </button>

            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute mt-2 w-80 top-[90%] left-2 bg-white border rounded-md shadow-lg flex flex-col justify-center px-1 py-2 z-20 ">
                    <div className='flex w-full justify-between items-center hover:bg-gray-200 px-3 py-1 cursor-pointer rounded-[5px]'>
                        <div className='flex items-center py-2'>
                            <UilBolt className='mr-2' />
                            <div className='flex flex-col'>
                                <p>Emma 1.0</p>
                                <p className='text-sm text-gray-600'>Great For Therapies Chats</p>
                            </div>
                        </div>
                        <button className="w-4 h-4 border bg-tertiary border-gray-500 rounded-full ">
                        </button>
                    </div>
                    <div className='flex w-full justify-between items-center hover:bg-gray-200 px-3 py-1 cursor-pointer rounded-[5px]' >
                        <div className='flex items-center w-full py-2'>
                            <UilBrightnessPlus className='mr-2' />
                            <div className='flex flex-col w-full'>
                                <p>Emma 2.0</p>
                                <p className='text-sm text-gray-600'>Video Chats and Exercises</p>
                                <button className='py-2 w-[95%] rounded-[8px] text-white bg-tertiary text-sm font-bold mt-2' onClick={() => navigate('/subscription')}>Upgrade to plus</button>

                            </div>
                        </div>
                        <button className="w-4 h-4 border border-gray-500 rounded-full ">
                        </button>
                    </div>
                </div>
            )}
        </div>)
}

export default ChatPageDropdown