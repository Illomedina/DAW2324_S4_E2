import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import AppLayout from '../../layout/AppLayout';
import { CustomersTable } from '../../components/tables/CustomersTable';
import Spinner from '../../components/Spinner';


export const CustomersPage = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch('http://localhost:8000/api/customers');
            const data = await response.json();
            setCustomers(data);
        };

        fetchCustomers();
    }, []);


    return (
        <AppLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => navigate('/customers/create')}
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Customer
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-8">
                {
                    customers.length === 0
                        ? <Spinner />
                        :
                        < div className="align-middle overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                            <CustomersTable customers={customers} />
                        </div>


                }
            </div>
        </AppLayout >
    )
}

export default CustomersPage;