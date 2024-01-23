import React from 'react';
import { FaArrowUpLong } from 'react-icons/fa6';
import { useAnalyticsContext } from '../../contexts/AnalyticsContext';

const AnalyticsInfo = () => {
    const { totalChats, totalCalls, goalsSet, goalsAchieved, badges, totalCosts } = useAnalyticsContext();

    const calculatePercentage = (value) => {
        const percentage = Math.round((value / 1) * 100);
        return `${percentage}%`;
    };
    

    const analyticsData = [
        { title: 'Total Calls', value: totalCalls, percentage: calculatePercentage(totalCalls), trend: 'vs previous year' },
        { title: 'Total Chats', value: totalChats, percentage: calculatePercentage(totalChats), trend: 'vs previous year' },
        { title: 'Goals Set', value: goalsSet, percentage: calculatePercentage(goalsSet), trend: 'vs previous year' },
        { title: 'Goals Achieved', value: goalsAchieved, percentage: calculatePercentage(goalsAchieved), trend: 'vs previous year' },
        { title: 'Total Cost', value: totalCosts, percentage: calculatePercentage(totalCosts), trend: 'vs previous year' },
        { title: 'Total Badges', value: badges, percentage: calculatePercentage(badges), trend: 'vs previous year' },
    ];

    return (
        <div className='w-[95%] sm:w-[90%] lg:w-[50%] h-full  flex flex-wrap gap-x-[5%] xl:gap-x-[10%] items-center justify-center '>
            {analyticsData.map((data, index) => (
                <div key={index} className='w-[45%] xl:w-[40%] h-60 bg-white rounded-xl relative mb-8 lg:mb-0'>
                    <p className='text-gray-400 p-4 text-lg font-bold w-full flex items-center justify-center tracking-tight'>{data.title}</p>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col'>
                        <p className='font-bold text-6xl sm:text-7xl '>{data.value}</p>
                        <p className='text-green-500 flex font-extrabold items-center justify-center'><FaArrowUpLong /> {data.percentage}</p>
                        <p className='text-[10px] sm:text-xs sm:font-bold text-gray-400 mt-4'>{data.trend}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnalyticsInfo;
