import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ToastMessage from '../utills/ToastMessage';
import axios from 'axios';
import app from '../../config/firebase';
import 'firebase/auth';
import { generateCookie } from "../utills/Cookies";

const handleSignUpWithEmailAndPassword = async (validateEmail, validateName, validatePassword, formData, selectedAge, setFormData, navigate, selectedGender) => {
    if (!validateName() || !validateEmail() || !validatePassword()) {
        return;
    }
    let user;
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            user = userCredential.user;
            console.log(userCredential)
        })
        .catch((error) => {
            ToastMessage('error', error.message);
            console.log(error.message)
        });

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

        const formattedToken = `Bearer ${response.data.token}`;
        generateCookie('token', formattedToken, 30)
        ToastMessage('success', 'Signup successful');
        setFormData({ email: '', password: '', name: '' });
        navigate('/chat', { replace: true });
    }
};

const handleSignInWithEmailAndPassword = async (validateEmail, validatePassword, formData, navigate, setFormData) => {
    if (!validateEmail() || !validatePassword()) {
        return;
    }
    try {
        const response = await app.auth().signInWithEmailAndPassword(formData.email, formData.password);
        console.log(response);
        if (response.user) {
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
        console.log(response)
        if (response.additionalUserInfo.isNewUser === false) {
            const responseFromAxios = await axios.post('http://localhost:5000/checkFireuid', {
                uid: response.user.uid,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(responseFromAxios, "isold");

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
            console.log(responseFromAxios, "is new")

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