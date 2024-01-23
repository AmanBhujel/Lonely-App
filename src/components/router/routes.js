import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

//Lazy Importing Components
const Landing = lazy(() => import('../../pages/Landing'));
const Authorization = lazy(() => import('../../pages/Authorization'));
const ChatPage = lazy(() => import('../../pages/Chat'));
const Profile = lazy(() => import('../../pages/Profile'));
const Subscription = lazy(() => import('../../pages/Subscription'));
const GoalSetting = lazy(() => import('../../pages/GoalSetting'));
const Analytics = lazy(() => import('../../pages/Analytics'));
const Schedule = lazy(() => import('../../pages/Schedule'));

//Declaring Routes and Components 
export default function AppRouter() {
    let element = useRoutes([
        {
            path: '/auth',
            element: <Authorization />,
        },
        {
            path: '/chat',
            element: <ChatPage />,
        },
        {
            path: '/',
            element: <Landing />,
        },
        {
            path: '/profile',
            element: <Profile />,
        },
        {
            path: '/subscription',
            element: <Subscription />,
        }, {
            path: '/goal',
            element: <GoalSetting />,
        },
        {
            path: '/analytics',
            element: <Analytics />,
        },
        {
            path: '/schedule',
            element: <Schedule />
        }
    ])
    return element;
};