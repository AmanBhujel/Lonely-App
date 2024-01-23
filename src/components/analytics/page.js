import React from 'react';
import AnalyticsInfo from './AnalyticsInfo';
import MyResponsivePie from './PieChart';
import MyResponsiveLine from './LineChart';

const AnalyticsPage = () => {
    return (
        <>
            <div className='flex flex-col w-full h-full p-4 overflow-auto '>
                {/* ---------Top part of analytics page------------- */}
                <div className='w-full h-32 flex flex-col justify-center items-center lg:items-start'>
                    <p className='text-3xl tracking-tighter	font-bold ml-0 lg:ml-10'>User's Analytics</p>
                    <div className='w-44 lg:ml-10'>
                        <select
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline mt-3"
                            id="fixedOption"
                        >
                            <option value="fixedValue">All Time</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row  w-full h-full  items-center justify-center'>
                    <AnalyticsInfo />
                    <div className='w-[90%] lg:w-[50%] h-[1000px] lg:h-full flex flex-col gap-y-[10%]'>
                        <div className='h-[40%] bg-white rounded-xl'>
                            <MyResponsiveLine />
                        </div>
                        <div className='h-[40%] bg-white rounded-xl'>
                            {/* <AnalyticsChart />
                 */}
                        <MyResponsivePie/>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnalyticsPage;