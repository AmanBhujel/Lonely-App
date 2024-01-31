
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
    const [measurable, setMeasurable] = useState('');
    const [achievable, setAchievable] = useState('');
    const [relevant, setRelevant] = useState('');
    const [selectedDays, setSelectedDays] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (option) => {
      if (selectedOptions.includes(option)) {
        // If the option is already selected, remove it
        setSelectedOptions((prevOptions) => prevOptions.filter((o) => o !== option));
      } else {
        // If the option is not selected, add it
        setSelectedOptions((prevOptions) => [...prevOptions, option]);
      }
    };
  

    const handleChange = (e) => {
        setSelectedDays(e.target.value);
    };
    const handleSubmit = async () => {
        try {
            const token = getCookie("token");

            if (!goalTitle.trim() || !goalDescription.trim() || !measurable.trim() || !achievable.trim() || !relevant.trim()) {
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
                measureable: measurable,
                achieveable: achievable,
                relevant: relevant,
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

            console.log(response.data.goal, "res.data")
            const goal = response.data.goal;
            setGoalsArray((prevElems) => [...prevElems, goal]);
            setGoalDate('');
            setGoalDescription("");
            setGoalTitle("");
            setMeasurable("");
            setRelevant("");
            setAchievable("");
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
                                        Goal Measureable
                                    </label>
                                    <textarea
                                        placeholder='Enter measureable...'
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="measureable"
                                        type="text"
                                        value={measurable}
                                        onChange={(e) => setMeasurable(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="days">Select how many days a week:</label>
                                    <select id="days" value={selectedDays} onChange={handleChange}>
                                        <option value="1">1 </option>
                                        <option value="2">2 </option>
                                        <option value="3">3 </option>
                                        <option value="4">4 </option>
                                        <option value="5">5 </option>
                                        <option value="6">6 </option>
                                    </select>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="days">Select how many days a week:</label>
                                    <select id="days" value={selectedDays} onChange={handleChange}>
                                        <option value="1">1 </option>
                                        <option value="2">2 </option>
                                        <option value="3">3 </option>
                                        <option value="4">4 </option>
                                        <option value="5">5 </option>
                                        <option value="6">6 </option>
                                    </select>

                                </div>
                                <div>
                                    <label>How many days a week will you join:</label>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="option1"
                                            value="Option 1"
                                            checked={selectedOptions.includes("Option 1")}
                                            onChange={() => handleCheckboxChange("Option 1")}
                                        />
                                        <label htmlFor="option1">Option 1</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="option2"
                                            value="Option 2"
                                            checked={selectedOptions.includes("Option 2")}
                                            onChange={() => handleCheckboxChange("Option 2")}
                                        />
                                        <label htmlFor="option2">Option 2</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="option3"
                                            value="Option 3"
                                            checked={selectedOptions.includes("Option 3")}
                                            onChange={() => handleCheckboxChange("Option 3")}
                                        />
                                        <label htmlFor="option3">Option 3</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="option4"
                                            value="Option 4"
                                            checked={selectedOptions.includes("Option 4")}
                                            onChange={() => handleCheckboxChange("Option 4")}
                                        />
                                        <label htmlFor="option4">Option 4</label>
                                    </div>

                                    {selectedOptions.length > 0 && (
                                        <p>You selected: {selectedOptions.join(', ')}</p>
                                    )}
                                </div>
                                {/*                                 
                                <div >
                                    <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
                                        Relevance
                                    </label>
                                    <textarea
                                        placeholder='Explain how your goal is relevant...'
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="relevant"
                                        type="text"
                                        value={relevant}
                                        onChange={(e) => setRelevant(e.target.value)}
                                    />
                                </div>
                                <div >
                                    <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
                                        Goal Achievable
                                    </label>
                                    <textarea
                                        placeholder='Enter metrics like emotionally,numbers etc...'
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="achievable"
                                        type="text"
                                        value={achievable}
                                        onChange={(e) => setAchievable(e.target.value)}
                                    />
                                </div> */}
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