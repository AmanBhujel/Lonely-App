import { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import app from '../config/firebase'
import Google from '../assets/GoogleButton.svg';
import {AgeSelector,GenderSelector} from '../components/authorization/Selectors';
import { handleSignInWithEmailAndPassword, handleSignInWithGoogle, handleSignUpWithEmailAndPassword } from '../components/authorization/AuthFunctions';
import { checkToken } from '../components/utills/checkToken';


const Authorization = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [selectedAge, setSelectedAge] = useState('1-15');
    const [selectedGender, setSelectedGender] = useState('Male')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // ---------To check if sign up is open or not -------------
    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
        setEmailError('');
    };

    const validateName = () => {
        if (formData.name.length < 2) {
            setNameError('Full name required.');
            return false;
        }

        setNameError('');
        return true;
    };

    const validatePassword = () => {
        if (formData.password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return false;
        }

        setPasswordError('');
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setEmailError('Email address is not valid');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleForgotPassword = async () => {
        const email = prompt("Please enter your email:");
        if (email) {
            try {
                await app.auth().sendPasswordResetEmail(email);
                alert("Password reset link sent! Check your email for the link.");
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const checkingTokenCookie = async () => {
        try {
            const tokenVerify = await checkToken();
            console.log(tokenVerify, "token veri")
            if (tokenVerify) {
                navigate('/chat', { replace: true });
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        checkingTokenCookie();
    }, [])

    return (
        <div className="flex items-start justify-center w-full h-screen bg-primaryBg  text-white"
            style={{
                background: 'linear-gradient(to bottom right, #050816, #1d1836)',
            }}>
            <section className="flex flex-col items-center w-full sm:w-11/12  lg:w-1/2 h-38rem mt-16">

                <img src={Logo} className="w-16 h-16" alt="Logo" />
                {isSignUp ?
                    <>
                        <p className="text-4xl sm:text-5xl font-bold text-tertiary">Create Account</p>
                        <p className="mb-5">One step towards better health</p>
                    </> : <>
                        <p className="text-4xl sm:text-5xl font-bold text-tertiary">Welcome Back!</p>
                        <p className="mb-5">One step towards better health</p>
                    </>
                }

                {isSignUp && (
                    <div className="mb-4 flex flex-col w-10/12 sm:w-7/12">
                        <label htmlFor="fullName" className="text-lg">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name.."
                            className="border border-gray-300 px-4 w-full h-12 bg-secondaryBg border-none"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        {nameError && <p className='text-red-500 text-sm mt-1'>{nameError}</p>}
                    </div>
                )}

                <div className="mb-4 flex flex-col w-10/12 sm:w-7/12">
                    <label htmlFor="email" className="text-lg">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Enter your email.."
                        className={`border ${emailError ? 'border-red-500' : 'border-gray-300'} px-4 w-full h-12 bg-secondaryBg border-none`}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>

                <div className="mb-4 flex flex-col w-10/12 sm:w-7/12">
                    <label htmlFor="password" className="text-lg">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter password.."
                            className="border border-gray-300 px-4 h-12 w-full  bg-secondaryBg border-none"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-tertiary cursor-pointer"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                {isSignUp ?
                    <div className='w-10/12 sm:w-7/12 flex mb-4'>
                        <AgeSelector selected={selectedAge} setSelectedAge={setSelectedAge} />
                        <GenderSelector selectedGender={selectedGender} setSelectedGender={setSelectedGender}/>
                    </div> : ''}
                {!isSignUp ? (
                    <>
                        <button
                            onClick={() => handleSignInWithEmailAndPassword(validateEmail, validatePassword, formData, navigate, setFormData)}
                            className="flex items-center justify-center px-5 py-2 bg-tertiary w-10/12 sm:w-7/12 h-10 text-xl hover:bg-tertiaryHover rounded-xl mt-5"
                        >
                            Sign in
                        </button>
                        <button
                            onClick={() => handleSignInWithGoogle(navigate, setFormData)}
                            className="flex items-center justify-center px-5 py-2 bg-tertiary w-10/12 sm:w-7/12 h-10 text-xl hover:bg-tertiaryHover rounded-xl mt-5"
                        >
                            <span><img className='mr-5 w-6' src={Google} /></span> Continue with Google
                        </button>
                        <button
                            onClick={handleForgotPassword}
                            className="mt-4 text-sm text-purple-600 hover:text-purple-800"
                        >
                            Forgot Password?
                        </button>
                        <p className="mt-3">
                            Don't have an account?
                            <span className="text-blue-500 ml-2 cursor-pointer decoration-solid" onClick={toggleSignUp}>
                                Sign up
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => handleSignUpWithEmailAndPassword(validateEmail, validateName, validatePassword, formData, selectedAge, setFormData, navigate,selectedGender)}
                            className="flex items-center justify-center px-5 py-2 bg-tertiary w-10/12 sm:w-7/12 h-10 text-xl hover:bg-tertiaryHover  rounded-xl mt-5"
                        >
                            Sign up
                        </button>
                        <button
                            onClick={() => handleSignInWithGoogle(navigate, setFormData)}
                            className="flex items-center justify-center px-5 py-2 bg-tertiary w-10/12 sm:w-7/12 h-10 text-xl hover:bg-tertiaryHover rounded-xl mt-5"
                        >
                            <span><img className='mr-5 w-6' src={Google} /></span> Continue with Google
                        </button>
                        <p className="mt-3">
                            Already have an account?
                            <span className="text-blue-500 ml-2 cursor-pointer decoration-solid" onClick={toggleSignUp}>
                                Sign in
                            </span>
                        </p>
                    </>
                )}
            </section>
        </div>
    );
};

export default Authorization;
