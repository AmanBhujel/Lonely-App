import { IoCallSharp, IoVideocam } from "react-icons/io5";
import Emma from '../../assets/Emma.png';
import Tooltip from "../utills/Tooltip";
import { getCookie } from "../utills/Cookies";
import axios from "axios";

//Top component of ChatBox (Names and Phone icons)
const ChatboxHeader = ({ setOnCall }) => {

    const handleCallButtonClick = async () => {
        setOnCall(true);
        // ----------To increase call counter in analytics-------
        const token = getCookie("token");
        await axios.get('http://localhost:5000/update-calls', {
            headers: {
                authorization: token
            }
        });
    };

    return (
        <>
            <div className="flex justify-between items-center border-b border-gray-300 h-16">
                <div className="flex items-center ml-5">
                    <img src={Emma} className="w-12 h-12 rounded-full object-cover mr-5" alt="Emma's profile" />
                    <p className="text-black font-semibold text-xl ">Emma</p>
                </div>
                <div className="flex items-center mr-10 text-tertiary text-2xl">
                    <Tooltip text="Audio Call">
                        <button className="mr-5" onClick={handleCallButtonClick}>
                            <IoCallSharp />
                        </button>
                    </Tooltip>
                    <Tooltip text="Video Call">
                        <button>
                            <IoVideocam />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
};

export default ChatboxHeader;