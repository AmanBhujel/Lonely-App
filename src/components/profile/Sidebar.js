import Logo from '../../assets/logo.png';
import { FaUser } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { GiStairsGoal } from "react-icons/gi";

const Sidebar = () => {
    return (
        <div className='w-80 h-full  flex flex-col items-center'>
            <img src={Logo} className='w-20 h-20 mt-5' />
            <div className='mt-14 w-full '>
                <ul className='ml-10'>
                    <li className='flex items-center text-gray-400  text-base cursor-pointer hover:text-black '><span className='text-2xl mr-5'><FaUser /></span>Profile</li>
                    <li className='flex items-center text-gray-400 mt-8 text-base cursor-pointer hover:text-black '> <span className='text-3xl mr-5'><MdAnalytics /></span>Analytics</li>
                    <li className='flex items-center text-gray-400 mt-8 text-base cursor-pointer hover:text-black '><span className='text-3xl mr-5'><GiStairsGoal /></span>Goals</li>
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;