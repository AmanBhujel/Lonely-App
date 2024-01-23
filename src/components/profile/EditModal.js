
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import axios from 'axios';
import ToastMessages from '../utills/ToastMessage'
import { getCookie } from '../utills/Cookies';
// Edit Profile Modal 
const EditModal = ({ isEditModalOpen, setIsEditModalOpen, name, email, age, gender, setName, setGender, setAge }) => {

    // update-user-data
    const handleSubmit = async () => {
        try {
            const token = getCookie("token");
            const response = await axios.post('http://localhost:5000/update-user', {
                name: name,
                age: age,
                gender: gender
            }, {
                headers: {
                    authorization: token
                }
            })
            console.log(response, 'from edit modal')
        } catch (error) {
            console.log('error', error)
        }
    };


    return (
        <>
            <Modal backdrop="blur" size="xl" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className="flex flex-col items-center text-2xl gap-4  font-bold border-b border-black"
                                style={{
                                    background: 'linear-gradient(#dfd5f6,#f7f4fa)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                Edit Profile
                            </ModalHeader>
                            <ModalBody
                                className="space-y-4 max-h-[750px] overflow-y-auto text-justify"
                                style={{
                                    background: 'linear-gradient(#dfd5f6,#f7f4fa, white )',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* Label and Input for Name */}
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                        Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        value={email}
                                        readOnly
                                    />
                                </div>
                                {/* Label and Dropdown for Gender */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
                                        Gender
                                    </label>
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                                        id="gender"
                                        onChange={(e) => setGender(e.target.value)}
                                        value={gender}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="age" className="text-xl">
                                        Age
                                    </label>
                                    <select
                                        id="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="1-15">1-15</option>
                                        <option value="15-30">15-30</option>
                                        <option value="30-45">30-45</option>
                                        <option value="45+">45+</option>
                                    </select>
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex items-center w-full justify-center'>
                                <Button className="bg-red-400 text-white rounded-[5px]" radius="md" onClick={async () => { await handleSubmit(); onClose(); }}>
                                    Cancel
                                </Button>
                                <Button className="bg-tertiaryHover text-white rounded-[5px]" radius="md" onClick={async () => { await handleSubmit(); onClose(); }}>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditModal;