import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import AppLayout from '../../layout/AppLayout';
import { UsersTable } from '../../components/tables/UsersTable';
import Spinner from '../../components/Spinner';
//import axios from 'axios';
const token = localStorage.getItem('token');

const steps = [
    { name: 'Users', href: '/users', current: true },
]
export const UserPage = () => {
    const navigate = useNavigate();
    const [userData, setUsersData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                if (data.success) {
                    setUsersData(data.data);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error("There was an error fetching the users:", error);
            } finally{
                setLoading(false);
            }
            
        };
        fetchData();
    }, []);

    return (
        <AppLayout Page={"Users"} Steps={steps}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => navigate('/users/create')}
                            className="block rounded-md bg-teal-400 px-3 py-2 text-center text-sm font-semibold text-blue-900 shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add User
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col my-3">
                {
                    isLoading
                        ? <Spinner message='Loading Users...' />
                        :
                        <UsersTable userData={userData} />
                }
            </div>
        </AppLayout >
    )
}

export default UserPage;