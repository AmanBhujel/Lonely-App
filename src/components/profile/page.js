import React, { useEffect, useState } from 'react';
import Emma from '../../assets/Emma.png';
import { FiEdit, FiLogOut } from "react-icons/fi";
import LogoutModal from './LogoutModal';
import EditModal from './EditModal';
import axios from 'axios';
import { getCookie } from '../utills/Cookies';

const ProfilePage = () => {
    const [isLogOutOpen, setIsLogOutOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')

    // /get-user-data
    const fetchUserData = async () => {
        const token = getCookie("token");
        const headers = {
            Authorization: token,
        };
        const response = await axios.get('http://localhost:5000/get-user-data', {
            headers
        });
        console.log(response.data.user, 'from profile')
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setGender(response.data.user.gender);
        setAge(response.data.user.age);
        setImage(response.data.user.pic);
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <div className='w-full  flex justify-center  overflow-auto'>
            <div className='w-[90%] lg:w-[700px] '>
                <p className='text-5xl font-bold mt-10 tracking-tighter'>Account Settings</p>
                <p className='text-3xl font-semibold mt-12 tracking-tight	'>Basic Info</p>
                <div className='flex border-b h-24 border-black items-center'>
                    <p className='text-xl  sm:text-2xl w-[200px] sm:w-[300px] tracking-tighter text-gray-400 font-semibold'>Profile Picture</p>
                    <img src={image} className='w-20 h-20 rounded-full bg-cover border-2' />
                    {/* <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        className="hidden"
                        id="uploadImageInput"
                    />
                    <label htmlFor="uploadImageInput" className='text-sm ml-5 cursor-pointer'>
                        Upload Image
                    </label> */}
                </div>
                <ProfileInfo label="Name" value={name} />
                <ProfileInfo label="Email" value={email} />
                <ProfileInfo label="Gender" value={gender} />
                <ProfileInfo label="Age" value={age} />
                <p className='text-3xl font-semibold mt-14 tracking-tight '>Settings</p>
                <div className='flex  border-b h-[63px] border-black items-center mt-8 cursor-pointer' onClick={() => setIsEditModalOpen(true)}>
                    <p className='text-xl font-bold tracking-tighter text-gray-400 flex items-center'>
                        Edit Profile<span className='ml-4 text-2xl'><FiEdit /></span>
                    </p>
                </div>
                <div className='flex border-b h-[63px] border-black items-center cursor-pointer' onClick={() => setIsLogOutOpen(true)}>
                    <p className='text-xl font-bold tracking-tighter  text-red-400 flex items-center'>
                        Logout<span className='ml-4 text-2xl'><FiLogOut /></span>
                    </p>
                </div>
            </div>
            <LogoutModal isLogOutOpen={isLogOutOpen} setIsLogOutOpen={setIsLogOutOpen} />
            <EditModal isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} name={name} email={email} age={age} gender={gender} setName={setName} setGender={setGender} setAge={setAge} />
        </div>
    )
}

export default ProfilePage;

const ProfileInfo = ({ label, value, icon }) => (
    <div className="flex border-b h-[63px] border-black items-center">
        <p className="text-lg font-bold text-gray-400 tracking-tighter w-[200px] sm:w-[300px]">
            {label}
        </p>
        <p className="text-lg">{value}</p>
        {icon && <span className="ml-5 cursor-pointer text-sm">{icon}</span>}
    </div>
);