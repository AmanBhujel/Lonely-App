import React, { useEffect, useState } from 'react';
import { SubscriptionBoxesForDesktops, SubscriptionBoxesForMobiles } from './SubscriptionBoxes';

const SubscriptionPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [employeeSliderValue, setSliderValue] = useState(2);
    const [orgValue, setOrgValue] = useState(40);

    const handleSliderChange = (event) => {
        setSliderValue(parseInt(event.target.value, 10));
    };

    const handleOrgPriceChange = () => {
        const basePrice = 30;
        const discountPercentage = 10;

        const multipliedPrice = basePrice * employeeSliderValue;

        const discountedMultipliedPrice = multipliedPrice - (employeeSliderValue - 1) * discountPercentage;

        const minimumPrice = 10;
        const finalPrice = Math.max(discountedMultipliedPrice, minimumPrice);

        if (finalPrice !== orgValue) {
            setOrgValue(finalPrice);
        }
    };

    useEffect(() => {
        handleOrgPriceChange();
    }, [employeeSliderValue, orgValue]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            setWindowWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='flex w-full relative h-full flex-col items-center'
            style={{
                background: 'linear-gradient(#dfd5f6,#f7f4fa, white )',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className='flex items-center justify-center flex-col z-20'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-tertiary mt-10 '>Choose your plan</h2>
                <p className='text-gray-500 font-bold sm:text-lg md:text-xl text-center lg:text-2xl'>Take you desired plan to get accessed to our features easily.</p>
            </div>
            {!isMobile ?
                <SubscriptionBoxesForDesktops orgValue={orgValue} employeeSliderValue={employeeSliderValue} handleSliderChange={handleSliderChange} />
                :
                <SubscriptionBoxesForMobiles orgValue={orgValue} employeeSliderValue={employeeSliderValue} handleSliderChange={handleSliderChange} windowWidth={windowWidth} />
            }

        </div>
    )
};

export default SubscriptionPage;
