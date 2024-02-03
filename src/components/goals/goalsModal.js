
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
    const [selectedOptions, setSelectedOptions] = useState("");
    const [scheduleDays, setScheduleDays] = useState("");
    const [selectedDay, setSelectedDay] = useState(0);

    const handleSelectDay = (day) => {
        setSelectedDay(day);
    };

    const handleCheckboxChange = (option) => {
        setSelectedOptions(option)
    };

    const handleScheduleDays = (option) => {
        setScheduleDays(option)
    };

    const handleSubmit = async () => {
        try {
            const token = getCookie("token");

            if (!goalTitle.trim() || !goalDescription.trim() || !selectedOptions.trim() || !scheduleDays.trim()) {
                ToastMessages("error", "Input Fields cannot be empty");
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

            const currentTimestamp = new Date().getTime();
            if (timestamp < currentTimestamp) {
                ToastMessages("error", "Cannot add a goal with a past date.");
                return;
            }

            const calendarEvent = {
                title: goalTitle,
                description: goalDescription,
                day: timestamp,
                label: 'red',
                id: Date.now(),
            };
            const response = await axios.post('http://localhost:5000/add-goal', {
                title: goalTitle,
                description: goalDescription,
                day: timestamp,
                scheduleId: calendarEvent.id,
                scheduleDay: scheduleDays,
                additionalMeasures: selectedOptions,
                dayOfWeek: scheduleDays === "Once a week" ? selectedDay : null,
                completed: false
            }, {
                headers: {
                    authorization: token
                }
            }); await axios.post("http://localhost:5000/add-schedule", calendarEvent, {
                headers: {
                    authorization: token
                }
            });

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
                                Smart Goal
                            </ModalHeader>
                            <ModalBody
                                className="space-y-2 max-h-[750px] overflow-y-auto text-justify"
                                style={{
                                    background: 'linear-gradient(#dfd5f6,#f7f4fa, white )',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* Label and Input for Name */}
                                <div >
                                    <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
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

                                <div >
                                    <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
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
                                <div>
                                    <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
                                        Schedule:
                                    </label>
                                    <div className='grid grid-cols-2'>
                                        <div className='mb-4'>
                                            <input
                                                type="checkbox"
                                                id='Once a week'
                                                value="Once a week"
                                                checked={scheduleDays === "Once a week"}
                                                onChange={() => handleScheduleDays("Once a week")}
                                                className=' mr-2'
                                            />
                                            <label htmlFor="Once a week">Once a week</label>
                                        </div>
                                        <div className='mb-4'>
                                            <input
                                                type="checkbox"
                                                id='Twice a week'
                                                value="Twice a week"
                                                checked={scheduleDays === "Twice a week"}
                                                onChange={() => handleScheduleDays("Twice a week")}
                                                className=' mr-2'
                                            />
                                            <label htmlFor="Twice a week">Twice a week</label>
                                        </div>
                                        <div className='mb-4'>
                                            <input
                                                type="checkbox"
                                                id='Once a Month'
                                                value="Once a month"
                                                checked={scheduleDays === "Once a month"}
                                                onChange={() => handleScheduleDays("Once a month")}
                                                className=' mr-2'
                                            />
                                            <label htmlFor="Once a Month">Once a Month</label>
                                        </div>
                                        <div className='mb-4'>
                                            <input
                                                type="checkbox"
                                                id='none'
                                                value="none"
                                                checked={scheduleDays === "none"}
                                                onChange={() => handleScheduleDays("none")}
                                                className=' mr-2'
                                            />
                                            <label htmlFor="none">none</label>
                                        </div>
                                    </div>
                                </div>
                                {scheduleDays === "Once a week" &&
                                    <div >
                                        <label className='mr-2  text-gray-700 font-bold mb-1'>Select a day for schedule:</label>
                                        <select value={selectedDay} onChange={(e) => handleSelectDay(e.target.value)} className='rounded-[5px]'>
                                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                                                <option key={index} value={index}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                    </div>}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
                                        Additional Measures: I will</label>
                                    <div className='grid grid-cols-2'>
                                        <div className='mb-4'>
                                            <input
                                                type="checkbox"
                                                id='Exercise + Diet'
                                                value="Exercise + Diet"
                                                checked={selectedOptions === "Exercise + Diet"}
                                                onChange={() => handleCheckboxChange("Exercise + Diet")}
                                                className=' mr-2'
                                            />
                                            <label htmlFor="Exercise + Diet">Exercise + Diet</label>
                                        </div>
                                        <div className='mb-4'>
                                            <input
                                                type="checkbox"
                                                id='Socially Connect'
                                                value="Socially Connect"
                                                checked={selectedOptions === "Socially Connect"}
                                                onChange={() => handleCheckboxChange("Socially Connect")}
                                                className=' mr-2'
                                            />
                                            <label htmlFor="Socially Connect">Socially Connect</label>
                                        </div>
                                        <div className='mb-4'>
                                            <input
                                                type="checkbox"
                                                id='Prohibit Substances'
                                                value="Prohibit Substances"
                                                checked={selectedOptions === "Prohibit Substances"}
                                                onChange={() => handleCheckboxChange("Prohibit Substances")}
                                                className=' mr-2'
                                            />
                                            <label htmlFor="Prohibit Substances">Prohibit Substances</label>
                                        </div>
                                        <div className='mb-4'>
                                            <input
                                                type="checkbox"
                                                id='Enjoyable Activities'
                                                value="Enjoyable Activities"
                                                checked={selectedOptions === "Enjoyable Activities"}
                                                onChange={() => handleCheckboxChange("Enjoyable Activities")}
                                                className=' mr-2'
                                            />
                                            <label htmlFor="Enjoyable Activities">Enjoyable Activities</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
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