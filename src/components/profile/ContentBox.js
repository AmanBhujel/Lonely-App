import { Button, Tooltip } from '@nextui-org/react';
import ProfileImage from '../../assets/ManProfile.jpg';
import Badge1 from '../../assets/badges/badge1.png';
import Badge2 from '../../assets/badges/badge2.png'
import Badge3 from '../../assets/badges/badge3.png'


const ContentBox = () => {
    return (
        <section className="flex w-full h-full">
            <div className="w-11/12 h-[90%] flex justify-center items-center rounded-xl backdrop-filter backdrop-blur-md bg-opacity-20 bg-gray-600">
                <div className="flex justify-center items-center w-5/12 h-[600px] rounded-xl bg-white mr-10 shadow-lg shadow-gray-400">
                    <div className="w-10/12 h-full ">
                        <div className='w-full h-1/2 flex items-center justify-center '>
                            <img src={ProfileImage} className='w-[250px] h-[250px] object-cover border-2 border-black rounded-full ' alt='Profile' />
                        </div>
                        <div className='w-full h-full text-gray-600'>
                            <p className='text-xl font-semibold mt-3 flex w-full justify-center'>My Profile</p>
                            <div className='mt-5 flex justify-between'>
                                <p className='w-5/12 py-1 border-b-2 border-gray-400'>Aman Bhujel</p>
                                <p className='w-5/12 py-1 border-b-2 border-gray-400'>Male</p>
                            </div>
                            <p className='mt-5 w-full py-1 border-b-2 border-gray-400'>CheersAi@gmail.com</p>
                            <div className='mt-10 w-full flex items-center justify-center'>
                                <Button className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white px-6 py-2  shadow-lg rounded-full" radius='lg' size='lg'> Edit Profile </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 h-[600px] flex flex-col justify-center items-center">
                    <div className="w-full h-[290px] bg-white shadow-lg shadow-gray-400 rounded-2xl mb-[30px] flex flex-col justify-center items-center">
                    <p className='text-2xl font-bold'>Total used hours</p>
                        <p className='text-5xl font-extrabold text-tertiaryHover'>20+ hours</p>
                    </div>
                    <div className="w-full h-[290px] bg-white shadow-lg shadow-gray-400 rounded-2xl flex flex-col items-center ">
                        <p className='text-3xl mt-5 font-bold'>Achievements and Badges</p>
                        <div className='flex items-center justify-center gap-x-1 mt-5'>
                            <Tooltip
                                placement='top'
                                className='bg-[#F0F0F0]'
                                content={
                                    <div className='w-full h-full '>
                                        <p className='px-2 py-1 rounded-xl z-20 '>Black Badge- First 100 pro-users.</p>
                                    </div>
                                }
                            >
                                <img src={Badge1} className='w-32' />
                            </Tooltip>
                            <Tooltip
                                placement='top'
                                className='bg-[#F0F0F0]'
                                content={
                                    <div className='w-full h-full '>
                                        <p className='px-2 py-1 rounded-xl z-20 '>Regular Gold User.</p>
                                    </div>
                                }
                            >
                                <img src={Badge2} className='w-32' />
                            </Tooltip>
                            <Tooltip
                                placement='top'
                                className='bg-[#F0F0F0]'
                                content={
                                    <div className='w-full h-full '>
                                        <p className='px-2 py-1 rounded-xl z-20 '>Best choice- Will get 40% off next month.</p>
                                    </div>
                                }
                            >
                                <img src={Badge3} className='w-32' />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
export default ContentBox;