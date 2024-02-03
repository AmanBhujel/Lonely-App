import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import ToastMessage from '../utills/ToastMessage';
import axios from 'axios';
import app from '../../config/firebase';
import 'firebase/auth';
import { generateCookie } from "../utills/Cookies";

const handleSignUpWithEmailAndPassword = async (validateEmail, validateName, validatePassword, formData, selectedAge, setFormData, navigate, selectedGender, isChecked) => {
    if (!validateName() || !validateEmail() || !validatePassword()) {
        return;
    }
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    const user = userCredential.user;
    if (isChecked) {
        try {
            ToastMessage('success', 'Please check your email.');
            await sendEmailVerification(user)
        }
        catch (error) {
            ToastMessage('error', error.message);
            console.log(error.message)
        };
    }
    if (user) {
        const response = await axios.post('http://localhost:5000/fireuid', {
            uid: user.uid,
            name: formData.name,
            age: selectedAge,
            email: formData.email,
            gender: selectedGender
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // const formattedToken = `Bearer ${response.data.token}`;
        // generateCookie('token', formattedToken, 30)
        // ToastMessage('success', 'Signup successful');
        setFormData({ email: '', password: '', name: '' });
        // navigate('/chat', { replace: true });
    }
    else {
        ToastMessage('error', 'Please check the terms .');
    }
};

const handleSignInWithEmailAndPassword = async (validateEmail, validatePassword, formData, navigate, setFormData) => {
    if (!validateEmail() || !validatePassword()) {
        return;
    }
    try {
        const response = await app.auth().signInWithEmailAndPassword(formData.email, formData.password);
        if (response.user) {
            if (!response.user.emailVerified) {
                ToastMessage('error', 'Please verify your email!');
                return;
            }
            ToastMessage('success', 'Sign in successful');
            const responseFromAxios = await axios.post('http://localhost:5000/get-token', {
                uid: response.user.uid
            });
            const formattedToken = `Bearer ${responseFromAxios.data.token}`;
            generateCookie('token', formattedToken, 30);
            setFormData({ email: '', password: '', name: '' });
            navigate('/chat', { replace: true });
        }
    } catch (error) {
        ToastMessage('error', error.message);
    }
};

const handleSignInWithGoogle = async (navigate) => {
    const provider = new app.auth.GoogleAuthProvider();
    try {
        const response = await app.auth().signInWithPopup(provider);
        if (response.additionalUserInfo.isNewUser === false) {
            const responseFromAxios = await axios.post('http://localhost:5000/checkFireuid', {
                uid: response.user.uid,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const formattedToken = `Bearer ${responseFromAxios.data.token}`;
            generateCookie('token', formattedToken, 30)
            ToastMessage('success', 'Signup successful');
            navigate('/chat', { replace: true });
        }
        else {
            const responseFromAxios = await axios.post('http://localhost:5000/fireuid', {
                uid: response.user.uid,
                name: response.user.displayName,
                age: null,
                email: response.user.email
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const formattedToken = `Bearer ${responseFromAxios.data.token}`;
            generateCookie('token', formattedToken, 30)
            ToastMessage('success', 'Login successful');
            navigate('/chat', { replace: true });
        }
    } catch (error) {
        ToastMessage('error', 'Error Singing Up');
    }
};

export { handleSignUpWithEmailAndPassword, handleSignInWithGoogle, handleSignInWithEmailAndPassword };