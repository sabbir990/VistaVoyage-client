import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useRole from '../../Hooks/useRole';
import AdminMenu from '../../Layout/AdminMenu';
import GuideMenu from '../../Layout/GuideMenu';
import UserMenu from '../../Layout/UserMenu';

const Sidebar = () => {
    const { role, isLoading } = useRole();
    return (
        <div className="w-64 bg-white shadow-md px-4 py-6">
            <div className='flex items-center justify-center mb-6'>
                <Logo />
            </div>
            
            {role === 'admin' ? <AdminMenu /> : role === 'guide' ? <GuideMenu /> : role === 'user' ? <UserMenu /> : <div className='flex items-center justify-center'>
                <span className="loading loading-dots loading-lg"></span>
            </div>}
        </div>
    );
};

export default Sidebar;