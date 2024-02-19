import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import AppLayout from '../../layout/AppLayout';
import { CustomersTable } from '../../components/tables/CustomersTable';
import Spinner from '../../components/Spinner';
import axios from 'axios';

const steps = [
    { name: 'Customers', href: '/customers', current: true },
]
export const CustomersPage = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/customers`);
                setCustomers(response.data);
            } catch (error) {
                console.error("There was an error fetching the customers:", error);
            }
            setLoading(false);
        };
        fetchCustomers();
    }, []);

    return (
        <AppLayout Page={"Customers"} Steps={steps}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => navigate('/customers/create')}
                            className="block rounded-md bg-teal-400 px-3 py-2 text-center text-sm font-semibold text-blue-900 shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Customer
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col my-3">
                {
                    isLoading
                        ? <Spinner message='Loading Customers...' />
                        :
                        <CustomersTable customers={customers} />
                }
            </div>
        </AppLayout >
    )
}

export default CustomersPage;