import React from 'react';

const AgeSelector = ({ selectedAge, setSelectedAge }) => {
    const handleAgeSelection = (e) => {
        setSelectedAge(e.target.value);
    };

    return (
        <div className='w-[45%]'>
            <label htmlFor="age" className="text-xl">
                Age
            </label>
            <select
                id="age"
                value={selectedAge}
                onChange={handleAgeSelection}
                className="block w-full p-2 border-0 rounded-md bg-secondaryBg"
            >
                <option value="1-15">1-15</option>
                <option value="15-30">15-30</option>
                <option value="30-45">30-45</option>
                <option value="45+">45+</option>
            </select>
        </div>
    );
};


const GenderSelector = ({ selectedGender, setSelectedGender }) => {
    return (
        <div className='w-[45%] ml-[10%]'>
            <label htmlFor="age" className="text-xl">
                Gender
            </label>
            <select
                id="gender"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="block w-full p-2 border-0 rounded-md bg-secondaryBg"
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>
    )
}
export  { AgeSelector, GenderSelector };
