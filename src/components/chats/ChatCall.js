import Emma from '../../assets/Emma.png';
import { HiSpeakerWave } from "react-icons/hi2";
import { BsFillMicMuteFill } from "react-icons/bs";
import { PiPhoneDisconnectFill } from "react-icons/pi";
import { AudioSocket } from "../../contexts/AudioSocket";

// Call UI inside ChatBox
const CallUI = ({ setOnCall, onCall }) => {
    const classForButton = ' rounded-full text-2xl m-5 bg-gray-500 text-white px-4 py-2'

    return (
        <>
            {onCall ? <AudioSocket modelName="prosody" recordingLengthMs={500} streamWindowLengthMs={5000} /> : ''}
            <div className="flex flex-col items-center justify-center h-4/5 ">
                <img src={Emma} className="w-24 h-24 rounded-full object-cover" alt="Emma's profile" />
                <p className='text-white text-3xl font-bold mt-3'>Emma</p>
                <p className='text-white text-base mt-1'>On Call</p>
            </div>
            <div className='flex justify-center items-center h-20'>
                <button className={classForButton}>
                    <HiSpeakerWave />
                </button>
                <button className={classForButton}>
                    <BsFillMicMuteFill />
                </button>
                <button className=' rounded-full text-2xl m-5 bg-red-500 text-white px-4 py-2' onClick={() => setOnCall(false)}>
                    <PiPhoneDisconnectFill />
                </button>
            </div>
        </>
    )
}

export default CallUI;