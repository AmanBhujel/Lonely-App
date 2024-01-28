
//-------Subscription Price Boxes with Hardcoded Values for Mobile and Desktops--------
import { UilCheck } from '@iconscout/react-unicons';
import { Navigation, Pagination, } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SubscriptionBoxesForDesktops = ({ handleSliderChange, employeeSliderValue, orgValue }) => {
    return (
        <div className='flex justify-center flex-wrap items-center  gap-x-7 mt-20'>
            <div className='w-[350px] h-[500px] border border-gray-300 lg:w-80  rounded-2xl flex flex-col items-center bg-white '>
                <div className='  w-11/12 h-full relative'>
                    <p className='bg-tertiaryHover text-white w-fit px-3 py-2 font-bold rounded-xl mt-3'>Current Plan</p>
                    <p className='text-[12px]   text-gray-500 mt-4 font-semibold'>Our Beta Model is for therapy and mental health with personalized touch.</p>

                    <p className='text-tertiary font-bold mt-10 text-5xl'>0$ <span className='text-tertiary font-bold text-xl'>/Month</span></p>
                    <ul className='flex flex-col items-start mt-8 gap-y-3 text-sm font-bold text-black'>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Unlimited chats and calls</li>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Exercises and Yogas</li>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Cancel Anytime</li>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Saving chats and sessions</li>
                    </ul>
                    <button className='w-full absolute top-[89%] py-2  text-black font-bold rounded-[5px]   tertiary hover:bg-white border border-black'>Free</button>
                </div>
            </div>
            <div className='w-[350px] h-[500px] border border-gray-300 lg:w-80  rounded-2xl flex flex-col items-center bg-white '>
                <div className='  w-11/12 h-full relative'>
                    <p className='bg-white border border-black text-black w-fit px-3 py-2 font-bold rounded-xl mt-3'>Pro Plus</p>
                    <p className='text-[12px]   text-gray-500 mt-4 font-semibold'>Our Pro-version is for exercise access and more advanced model.</p>


                    <p className='text-tertiary font-bold mt-10 text-5xl'>30$ <span className='text-tertiary font-bold text-xl'>/Month</span></p>
                    <ul className='flex flex-col items-start mt-8 gap-y-3 text-sm font-bold text-black'>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Unlimited chats and calls</li>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>24 hour access</li>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Cancel Anytime</li>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Chat with advanced therapy models</li>
                    </ul>
                    <button className='w-full absolute top-[89%] py-2 bg-black text-white font-bold rounded-[5px] hover:border hover:border-black  tertiary hover:bg-white  hover:text-black'>Subscribe</button>
                </div>
            </div>
            <div className='w-[350px] h-[500px] border border-gray-600 lg:w-80  rounded-2xl flex flex-col items-center bg-white ' style={{ background: 'linear-gradient(#dcd2f3,white )', }}>
                <div className='  w-11/12 h-full relative'>
                    <p className='bg-white text-black w-fit px-3 py-2 font-bold rounded-2xl mt-3'>Org's Plan</p>
                    <p className='text-[12px]   text-gray-500 mt-4 font-semibold'>Suitable for business owners to provide their employees free therapy session.</p>


                    <p className='text-tertiary font-bold mt-5 text-5xl'>{orgValue}$</p>
                    <span className='text-tertiary font-bold'>/Monthly</span>
                    <input
                        type="range"
                        min="2"
                        max="50"
                        value={employeeSliderValue}
                        onChange={handleSliderChange}
                        className="w-11/12 mt-2"
                    />
                    <p className="text-tertiary">Upto <span className='text-lg font-bold text-tertiary'>{employeeSliderValue}</span> IDs</p>
                    <ul className='flex flex-col items-start mt-8 gap-y-3 text-sm font-bold text-black'>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Unlimited chats and calls</li>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>24 hour access</li>
                        <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Privacy and No-Ads</li>
                    </ul>
                    <button className='w-full absolute top-[89%] py-2 bg-black text-white font-bold rounded-[5px] hover:border hover:border-black  tertiary hover:bg-white  hover:text-black'>Subscribe</button>
                </div>
            </div>
        </div>
    )
};

const SubscriptionBoxesForMobiles = ({ handleSliderChange, employeeSliderValue, orgValue, windowWidth }) => {
    return (
        <>
            <div className='w-full  flex items-center justify-center mt-10'>
                <Swiper
                    effect={"coverflow"}
                    className='h-[540px]'
                    {...(windowWidth < 750 ? { navigation: true } : '')}
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={windowWidth < 750 ? 1 : 2}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                >
                    <SwiperSlide>
                        <div className=' w-[350px] h-[500px] border border-gray-300 lg:w-80  rounded-2xl flex flex-col items-center bg-white  ml-[50%] translate-x-[-50%]'>
                            <div className='  w-11/12 h-full relative'>
                                <p className='bg-tertiaryHover text-white w-fit px-3 py-2 font-bold rounded-xl mt-3'>Current Plan</p>
                                <p className='text-[12px]   text-gray-500 mt-4 font-semibold'>Our Beta Model is for therapy and mental health with personalized touch.</p>


                                <p className='text-tertiary font-bold mt-10 text-5xl'>0$ <span className='text-tertiary font-bold text-xl'>/Month</span></p>
                                <ul className='flex flex-col items-start mt-8 gap-y-3 text-sm font-bold text-black'>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Unlimited chats and calls</li>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Exercises and Yogas</li>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Cancel Anytime</li>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Saving chats and sessions</li>
                                </ul>
                                <button className='w-full absolute top-[89%] py-2  text-black font-bold rounded-[5px]   tertiary hover:bg-white border border-black'>Free</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-[350px] h-[500px] border border-gray-300 lg:w-80  rounded-2xl flex flex-col items-center bg-white ml-[50%] translate-x-[-50%]'>
                            <div className='  w-11/12 h-full relative'>
                                <p className='bg-white border border-black text-black w-fit px-3 py-2 font-bold rounded-xl mt-3'>Pro Plus</p>
                                <p className='text-[12px]   text-gray-500 mt-4 font-semibold'>Our Pro-version is for exercise access and more advanced model.</p>


                                <p className='text-tertiary font-bold mt-10 text-5xl'>30$ <span className='text-tertiary font-bold text-xl'>/Month</span></p>
                                <ul className='flex flex-col items-start mt-8 gap-y-3 text-sm font-bold text-black'>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Unlimited chats and calls</li>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>24 hour access</li>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Cancel Anytime</li>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Chat with advanced therapy models</li>
                                </ul>
                                <button className='w-full absolute top-[89%] py-2 bg-black text-white font-bold rounded-[5px] hover:border hover:border-black  tertiary hover:bg-white  hover:text-black'>Subscribe</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-[350px] h-[500px] border border-gray-600 lg:w-80  rounded-2xl flex flex-col items-center bg-white  ml-[50%] translate-x-[-50%]' style={{ background: 'linear-gradient(#dcd2f3,white )', }}>
                            <div className='  w-11/12 h-full relative'>
                                <p className='bg-white text-black w-fit px-3 py-2 font-bold rounded-2xl mt-3'>Org's Plan</p>
                                <p className='text-[12px]   text-gray-500 mt-4 font-semibold'>Suitable for business owners to provide their employees free therapy session.</p>


                                <p className='text-tertiary font-bold mt-5 text-5xl'>{orgValue}$</p>
                                <span className='text-tertiary font-bold'>/Monthly</span>
                                <input
                                    type="range"
                                    min="2"
                                    max="50"
                                    value={employeeSliderValue}
                                    onChange={handleSliderChange}
                                    className="w-11/12 mt-2"
                                />
                                <p className="text-tertiary">Upto <span className='text-lg font-bold text-tertiary'>{employeeSliderValue}</span> IDs</p>
                                <ul className='flex flex-col items-start mt-8 gap-y-3 text-sm font-bold text-black'>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Unlimited chats and calls</li>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>24 hour access</li>
                                    <li className='flex '><span className='text-2xl mr-2'><UilCheck /></span>Privacy and No-Ads</li>
                                </ul>
                                <button className='w-full absolute top-[89%] py-2 bg-black text-white font-bold rounded-[5px] hover:border hover:border-black  tertiary hover:bg-white  hover:text-black'>Subscribe</button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
};
export { SubscriptionBoxesForDesktops, SubscriptionBoxesForMobiles }
