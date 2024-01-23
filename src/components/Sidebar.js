import { useEffect, useRef, useState } from 'react';
import { UilUserSquare, UilSchedule, UilFocusTarget, UilAnalytics, UilDiary, UilBill, UilFileInfoAlt, UilBrightnessPlus, UilEstate, UilBars } from '@iconscout/react-unicons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTermModalContext } from '../contexts/TermModelContext';
import { useFeedbackModalContext } from '../contexts/FeedbackContext';

const Sidebar = ({ mobileWidth }) => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('Home');
    const [isHidden, setIsHidden] = useState(false);
    const sidebarRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidth);
    const location = useLocation();
    const { setTermModalOpen } = useTermModalContext();
    const { setFeedbackModalOpen } = useFeedbackModalContext();

    const handleItemClick = (itemName) => {
        if (itemName === "Feedbacks") {
            setFeedbackModalOpen(true);
        }
        if (itemName === "User Profile") {
            navigate('/profile');
        }
        else if (itemName === "Home") {
            navigate('/chat');
        }
        else if (itemName === "Analytics") {
            navigate('/analytics');
        }
        else if (itemName === "Schedule") {
            navigate('/schedule');
        }
        else if (itemName === "Goal Setting") {
            navigate('/goal');
        }
        else if (itemName === "Subscription") {
            navigate('/subscription');
        }
        else if (itemName === "Terms") {
            setTermModalOpen(true);
        }
    };

    //To check the route and setActiveItem correctly
    useEffect(() => {
        const pathname = location.pathname;
        switch (pathname) {
            case '/':
                setActiveItem('Home');
                break;
            case '/profile':
                setActiveItem('User Profile');
                break;
            case '/analytics':
                setActiveItem('Analytics');
                break;
            case '/schedule':
                setActiveItem('Schedule');
                break;
            case '/goal':
                setActiveItem('Goal Setting');
                break;
            case '/subscription':
                setActiveItem('Subscription');
                break;
            default:
                break;
        }
    }, [location.pathname]);

    const handleHideButtonClick = () => {
        setIsHidden(!isHidden);
    };

    //Checking DeviceWidth
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth < mobileWidth);
            setIsMobile(window.innerWidth < mobileWidth);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        if (isMobile) {
            const handleClickOutside = (event) => {
                if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                    setIsHidden(true);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    });

    return (
        isHidden ? (
            <>
                <button className='absolute top-4 left-5 z-50' onClick={handleHideButtonClick}><UilBars className='scale-125' /></button>
            </>
        ) : (
            <div ref={sidebarRef} className={`h-full w-72 md:w-80 fixed top-0 left-0 z-50 ${isMobile ? 'md:fixed' : 'md:static'}`}>
                <div className={`w-full  h-full bg-secondaryBg relative flex flex-col `}>
                    <p className='mb-4 mt-10 ml-6 text-lg font-extrabold text-white dark:text-white md:text-xl lg:text-2xl'>Cheers AI</p>
                    <ul className="flex flex-col items-center w-full mt-5">
                        <ListItem
                            icon={<UilEstate />}
                            name="Home"
                            isActive={activeItem === "Home"}
                            onClick={() => handleItemClick("Home")}
                        />
                        <ListItem
                            icon={<UilUserSquare />}
                            name="User Profile"
                            isActive={activeItem === "User Profile"}
                            onClick={() => handleItemClick("User Profile")}
                        />
                        <ListItem
                            icon={<UilSchedule />}
                            name="Schedule"
                            isActive={activeItem === "Schedule"}
                            onClick={() => handleItemClick("Schedule")}
                        />
                        <ListItem
                            icon={<UilFocusTarget />}
                            name="Goal Setting"
                            isActive={activeItem === "Goal Setting"}
                            onClick={() => handleItemClick("Goal Setting")}
                        />
                        <ListItem
                            icon={<UilAnalytics />}
                            name="Analytics"
                            isActive={activeItem === "Analytics"}
                            onClick={() => handleItemClick("Analytics")}
                        />
                        <ListItem
                            icon={<UilDiary />}
                            name="Feedbacks"
                            isActive={activeItem === "Feedbacks"}
                            onClick={() => handleItemClick("Feedbacks")}
                        />
                        <ListItem
                            icon={<UilBill />}
                            name="Subscription"
                            isActive={activeItem === "Subscription"}
                            onClick={() => handleItemClick("Subscription")}
                        />
                        <ListItem
                            icon={<UilFileInfoAlt />}
                            name="Terms"
                            isActive={activeItem === "Terms"}
                            onClick={() => handleItemClick("Terms")}
                        />                </ul>
                    <div className='bottom-0 absolute flex items-center justify-center w-full '>
                        <div
                            className={`w-11/12  cursor-pointer hover:bg-gray-800 hover:text-white   py-2 px-2 flex items-center mb-2 rounded-[10px]`}
                        >
                            <span className={`mr-3 text-white hover:transform scale-130 transition-transform `}>
                                <UilBrightnessPlus />
                            </span>
                            <div className='flex flex-col' onClick={() => navigate('/subscription')}>
                                <p className='font-semibold text-white'>Upgrade Plan</p>
                                <p className='text-[12px] text-gray-400 '>Get Video Call and Exercises</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

};

export default Sidebar;

//Layout for each buttons
const ListItem = ({ icon, name, isActive, onClick }) => {
    return (
        <li
            className={`w-[90%] text-gray-600 cursor-pointer hover:bg-gray-800 hover:text-white ${isActive ? 'bg-gray-800 text-white' : 'bg-transparent'
                } font-semibold py-2 px-2 flex items-center mb-2 rounded-[10px]`}
            onClick={onClick}
        >
            <span className={`mr-5 hover:transform scale-130 transition-transform ${isActive ? 'text-white' : ''}`}>
                {icon}
            </span>
            {name}
        </li>
    );
};
