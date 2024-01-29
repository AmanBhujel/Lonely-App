import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaRegPenToSquare } from "react-icons/fa6";
import { TbClockStar, TbClockPlay } from "react-icons/tb";
import GoalModal from '../components/goals/goalsModal';
import axios from 'axios';
import { getCookie } from '../components/utills/Cookies';
import ToastMessage from '../components/utills/ToastMessage';
import GoalInfoModal from '../components/goals/goalInfoModal';

const Goals = () => {
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [goalsArray, setGoalsArray] = useState([]);
    const [goalsType, setGoalsType] = useState("all");
    const [goalInfoModal, setGoalInfoModal] = useState(false);
    const [goalInfoModalIndex, setGoalInfoModalIndex] = useState(0);
    const removeButtonRefs = useRef([]);

    const handleItemClick = (index) => {
        const isRemoveButtonClicked = removeButtonRefs.current[index].contains(document.activeElement);
        if (isRemoveButtonClicked) {
            removeGoal(goalsArray[index]._id);
        } else {
            setGoalInfoModal(true);
            setGoalInfoModalIndex(index);
        }
    };

    const fetchGoals = async () => {
        const token = getCookie("token");
        const response = await axios.get('http://localhost:5000/get-goal', {
            headers: { authorization: token }
        });
        setGoalsArray(response.data);
    };

    const removeGoal = async (goalId) => {
        try {
            const token = getCookie("token");
            const response = await axios.post('http://localhost:5000/delete-goal', { _id: goalId  }, {
                headers: { authorization: token }
            });

            if (response.data.message === "Goal deleted successfully.") {
                ToastMessage("success", "Deleted Successfully.")
                setGoalsArray((prevGoals) => prevGoals.filter(goal => goal._id !== goalId));
            } else {
                ToastMessage("error", "Failed to delete goal");
            }
        } catch (error) {
            console.error("Error deleting goal:", error);
        }
    };


    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div className='w-full h-screen flex'>
            <Sidebar mobileWidth={768} />
            <div className='w-full h-full flex justify-center items-center flex-col '>
                <div className='bg-gray-100 w-full h-[35%] rounded-3xl' style={{
                    background: 'linear-gradient(#dfd5f6,#f7f4fa)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className='flex w-full h-full items-center justify-center gap-x-16'>
                        <div className='w-[50%] relative'>
                            <p className='text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-tertiary from-red-400 '>Every step counts, leading to triumphs. Your journey, your story.</p>
                        </div>
                        <div className='w-60 h-[40%] bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer' onClick={() => setIsGoalModalOpen(true)}>
                            <p className='text-3xl'><FaRegPenToSquare /></p>
                            <p className='font-bold text-xl'>Add Goals</p>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[65%] flex items-center justify-center flex-col'>
                    <div className='w-[90%] flex justify-between items-center py-3'>
                        <p className='text-3xl font-bold ml-5'>Your Goals</p>
                        <select className='rounded-[6px] w-40' onChange={(e) => setGoalsType(e.target.value)}>
                            <option value="all">All</option>
                            <option value="achieved">Achieved</option>
                            <option value="ongoing">Ongoing</option>
                        </select>
                    </div>
                    <div className='w-[90%] h-[80%] overflow-y-auto border'>
                        <ul className='w-full h-full'>
                            {goalsArray.length > 0 ? (
                                goalsArray.map((goal, index) => (
                                    (goalsType === "all" || (goalsType === "achieved" && goal.completed) || (goalsType === "ongoing" && !goal.completed)) && (
                                        <li
                                            key={index}
                                            className='w-full h-20 border-red-200 border flex items-center justify-between cursor-pointer'
                                            onClick={() => handleItemClick(index)}
                                            ref={(element) => (removeButtonRefs.current[index] = element)}
                                        >
                                            <p className='text-xl ml-5 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[300px] lg:max-w-[400px]'>
                                                {index + 1}. {goal.title}
                                            </p>
                                            <div className='flex items-center justify-center'>
                                                {goal.completed ? (
                                                    <p className='font-semibold flex items-center justify-center'>
                                                        <i className='text-green-500 mr-3 text-2xl'><TbClockStar/></i>Completed!
                                                    </p>
                                                ) : (
                                                    <p className='font-semibold flex items-center justify-center'>
                                                        <i className='text-red-500 mr-3 text-2xl'><TbClockPlay/></i>Ongoing!
                                                    </p>
                                                )}
                                                <button
                                                    className='bg-tertiary text-white py-1 px-3 text-lg ml-5 rounded-[6px] mr-5 z-50'
                                                    onClick={() => removeGoal(goal._id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    )
                                ))
                            ) : (
                                <div className='w-full h-full flex items-center justify-center'>
                                    <p className='text-2xl font-semibold'>No goals set yet.</p>
                                </div>
                            )}
                        </ul>

                    </div>
                </div>
            </div>

            {/* ---------Modal to show goal info--------- */}
            <GoalInfoModal goal={goalsArray} setGoalsArray={setGoalsArray} goalInfoModal={goalInfoModal} setGoalInfoModal={setGoalInfoModal} goalInfoModalIndex={goalInfoModalIndex} />
            {/* ----------------Modal to show goal inputs----------------- */}
            <GoalModal isGoalModalOpen={isGoalModalOpen} setIsGoalModalOpen={setIsGoalModalOpen} setGoalsArray={setGoalsArray} />
        </div>
    );
}

export default Goals;
