import { IoSend } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import OpenAIFunction from "./openAI/OpenAIChat";
import ChatboxHeader from "./ChatboxHeader";
import CallUI from "./ChatCall";
import SpeechToText from "./callUtills/SpeechToText";
import { useCallContext } from "../../contexts/CallContext";
import axios from 'axios';
import { getCookie } from "../utills/Cookies";

// Chat Box UI
const Chatbox = () => {
    const [message, setMessage] = useState('');
    const [messageObject, setMessageObject] = useState([]);
    const inputRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const [onCall, setOnCall] = useState(false);
    const { emotionArray } = useCallContext();
    const [callChatsObject, setCallChatsObject] = useState([]);
    const talkingRef = useRef(false);

    // --------------Fetching Message-------------
    const fetchMessages = async () => {
        const token = getCookie("token");
        const response = await axios.get('http://localhost:5000/get-chat', {
            headers: {
                authorization: token
            }
        });
        console.log(response.data);
        setMessageObject(response.data.data)
    };

    useEffect(() => {
        fetchMessages();
    }, [])

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };
    console.log(emotionArray,"emotionarray")
    useEffect(() => {
        if(!talkingRef.current){
          const annyang = SpeechToText({ onCall, emotionArray, setCallChatsObject, callChatsObject, talkingRef })
          return () => {
              annyang.removeCallback();
              annyang.abort();
      }
    }
    }, [onCall, talkingRef.current]);

    const sendMessage = async () => {
        const userMessage = { fromUser: true, content: message };
        setIsTyping(true);
        setMessageObject((prevMessages) => [...prevMessages, userMessage]);
        setMessage('');
        // ---------Saving User Message----------
        try {
            const token = getCookie("token");
            const response = await axios.post('http://localhost:5000/chat', {
                content: message,
                fromUser: true
            }, {
                headers: {
                    authorization: token
                }
            });
            console.log('Message saved:', response.data);
        } catch (error) {
            console.error('Error saving message:', error);
        }
        // ----------Open AI response and saving-------------
        try {
            console.log(messageObject)
            const response = await OpenAIFunction([...messageObject, userMessage]);
            const aiMessage = { fromUser: false, content: response };
            setMessageObject((prevMessages) => [...prevMessages, aiMessage]);
            setIsTyping(false);
        } catch (error) {
            console.error('Error during AI response:', error);
        }

        if(inputRef.current){
        inputRef.current.focus();
        }

    };

    return (
        <div className=" flex flex-col justify-between  text-white w-[97%] md:w-[98%] lg:w-4/5 xl:w-3/5 h-[93.5%] bg-white  border-2 rounded-sm ">
            {onCall ?
                <>
                    <CallUI setOnCall={setOnCall} onCall={onCall} />
                </> :
                <>
                    <ChatboxHeader setOnCall={setOnCall} />
                    <ChatMessages messages={messageObject} isTyping={isTyping} />
                    <div className="h-16 flex justify-center items-center">
                        <input
                            ref={inputRef}
                            placeholder="Send Message..."
                            className="bg-transparent text-black w-11/12 rounded-xl h-9 pl-5 py-5 border border-tertiary mr-3 focus:outline-0"
                            style={{ outline: 'none' }}
                            value={message}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="text-tertiary text-2xl" onClick={sendMessage}>
                            <IoSend />
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 flex w-full justify-center mb-2">Emma can make mistakes. Consider checking important information.</p>
                </>
            }
        </div>
    );
};

export default Chatbox;
