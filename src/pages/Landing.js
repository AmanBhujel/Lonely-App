import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleContainer from '../components/utills/particleContainer';
import checkToken, { tokenFunction } from '../components/utills/checkToken';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const variants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 },
    };
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // -----------Function to check auth----------------
    useEffect(() => {
        tokenFunction(setIsLoading, navigate);
    }, []);

    const handleButtonClick = async () => {
        navigate('/chat');
    };

    return (
        <>
            {!isLoading && (
                <>
                    <ParticleContainer />
                    <div className="w-screen h-screen bg-primaryBg  flex flex-col justify-center items-center z-20">
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ delay: 0.2 }}
                            className="mb-4 text-2xl font-extrabold text-gray-400 dark:text-white md:text-4xl lg:text-5xl"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                Empowering Minds
                            </span>
                            , Healing Hearts
                        </motion.h1>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ delay: 0.3 }}
                            className="text-xl mt-5 text-white"
                        >
                            Meet Emma, Professional Therapist.
                        </motion.p>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-white "
                        >
                            Chat your problems with Emma and get instant advice.
                        </motion.p>
                        <motion.button
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ delay: 0.4 }}
                            onClick={handleButtonClick}
                            className="mt-10 bg-gradient-to-r from-purple-500 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline-purple active:bg-purple-800 z-30"
                        >
                            Start Chatting
                        </motion.button>
                    </div>
                </>
            )}
        </>
    );
};

export default Landing;
