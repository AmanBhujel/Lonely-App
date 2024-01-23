
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import axios from 'axios';
import ToastMessages from '../utills/ToastMessage'
import { getCookie } from '../utills/Cookies';

// Add Goals Modal 
const GoalModal = ({ isGoalModalOpen, setIsGoalModalOpen, setGoalsArray }) => {
    const [goalTitle, setGoalTitle] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [goalDate, setGoalDate] = useState('');


    const handleSubmit = async () => {
        try {
            const token = getCookie("token");

            if (!goalTitle.trim() || !goalDescription.trim()) {
                ToastMessages("error", "Title and description cannot be empty");
                return;
            }

            // Parse the date and check if it's a valid date
            const [month, day] = goalDate.split("-");
            const year = new Date().getFullYear();
            const timestamp = new Date(`${year}-${month}-${day}`).getTime();

            if (isNaN(timestamp)) {
                ToastMessages("error", "Invalid date! Format:MM-DD");
                return;
            }

            const response = await axios.post('http://localhost:5000/add-goal', {
                title: goalTitle,
                description: goalDescription,
                day: timestamp,
                completed: false
            }, {
                headers: {
                    authorization: token
                }
            });

            const calendarEvent = {
                title: goalTitle,
                description: goalDescription,
                day: timestamp,
                label: 'red',
                id: Date.now(),
            };

            await axios.post("http://localhost:5000/add-schedule", calendarEvent, {
                headers: {
                    authorization: token
                }
            });
            console.log(response.data.goal, "res.data")
            const goal = response.data.goal;
            setGoalsArray((prevElems) => [...prevElems, goal]);
            setGoalDate('');
            setGoalDescription("");
            setGoalTitle("");
            ToastMessages("success", "Goal Created Successfully.")
            setIsGoalModalOpen(false)
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const handleDateChange = (e) => {
        setGoalDate(e.target.value);
    };

    return (
        <>
            <Modal backdrop="blur" size="xl" isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)}>
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
                                Goal
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
                                        Goal Title
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="title"
                                        type="text"
                                        placeholder="Goal Title"
                                        value={goalTitle}
                                        onChange={(e) => setGoalTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                        Goal Description
                                    </label>
                                    <textarea
                                        placeholder='Enter description about your goal...'
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="description"
                                        type="text"
                                        value={goalDescription}
                                        onChange={(e) => setGoalDescription(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                        Goal Date
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="date"
                                        type="text"
                                        placeholder="MM-DD"
                                        value={goalDate}
                                        onChange={handleDateChange}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex items-center w-full justify-center'>
                                <Button className="bg-red-400 text-white rounded-[5px]" radius="md" onClick={async () => { onClose(); }}>
                                    Cancel
                                </Button>
                                <Button className="bg-tertiaryHover text-white rounded-[5px]" radius="md" onClick={async () => { await handleSubmit() }}>
                                    Set Goal
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default GoalModal;