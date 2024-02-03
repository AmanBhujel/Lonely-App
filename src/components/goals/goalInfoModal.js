import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { TbClockPlay, TbClockStar } from 'react-icons/tb';
import { getCookie } from '../utills/Cookies';
import axios from 'axios';
import ToastMessage from '../utills/ToastMessage';

const GoalInfoModal = ({ goal, setGoalsArray, goalInfoModal, setGoalInfoModal, goalInfoModalIndex }) => {
    const goalInfo = goal[goalInfoModalIndex];

    const changeDateToNormalStandard = (day) => {
        if (day) {
            const dateObject = new Date(day);
            return dateObject.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        } else {
            return '';
        }
    };

    const handleStatusChange = (isComplete) => {
        updateGoalStatus(goalInfo._id, isComplete);
    };

    const updateGoalStatus = async (_id, completed) => {
        const token = getCookie("token");

        try {
            const response = await axios.post(
                'http://localhost:5000/update-goal',
                { _id, completed },
                { headers: { authorization: token } }
            );

            setGoalsArray((prev) =>
                prev.map((goal) =>
                    goal._id === _id ? { ...goal, completed } : goal
                )
            );
            ToastMessage("success", "Updated Status.");
            setGoalInfoModal(false);
        } catch (error) {
            console.error('Error updating goal status:', error);
        }
    };

    return (
        <>
            <Modal backdrop="blur" size="lg" isOpen={goalInfoModal} onClose={() => setGoalInfoModal(false)}>
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
                                {goalInfo.title}
                            </ModalHeader>
                            <ModalBody
                                className=" max-h-[750px] overflow-y-auto text-justify"
                                style={{
                                    background: 'linear-gradient(#dfd5f6,#f7f4fa, white )',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <p><span className='font-bold mr-3'>Title:</span> {goalInfo.title}</p>
                                <p><span className='font-bold mr-3'>Description:</span>{goalInfo.description}</p>
                                <p><span className='font-bold mr-3'>Additional Measures:</span>{goalInfo.additionalMeasures}</p>
                                <p><span className='font-bold mr-3'>Intervals:</span>{goalInfo.scheduleDay}</p>

                                <p><span className='font-bold mr-3'>Target Date:</span>{changeDateToNormalStandard(goalInfo.day)}</p>

                                <div className='flex'><span className='font-bold mr-3'>Status:</span>{goalInfo.completed ? <p className='flex'>Completed! <i className='text-green-500 mr-3 text-2xl ml-5'><TbClockStar /> </i></p> : <p className='flex'>Ongoing! <i className='text-red-500 mr-3 text-2xl ml-5'><TbClockPlay /></i></p>} </div>
                                <p className='font-bold'>Change Status:</p>
                                <div className='flex'>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="complete"
                                            checked={goalInfo.completed}
                                            onChange={() => handleStatusChange(true)}
                                        />
                                        Complete
                                    </label>

                                    <label className='ml-5'>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="ongoing"
                                            checked={!goalInfo.completed}
                                            onChange={() => handleStatusChange(false)}
                                        />
                                        Ongoing
                                    </label>
                                </div>

                            </ModalBody>
                            <ModalFooter className='flex items-center w-full justify-center'>
                                <Button className="bg-red-400 text-white rounded-[5px]" radius="md" onClick={async () => { onClose() }}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>)
}

export default GoalInfoModal