import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';


export const UsersShow = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const users = state?.users;
  const {
    id,
    name = '-',
    surname = '-',
    email = '-',
    user= '-'
  } = users;

  const steps = [
    { name: 'Users', href: '/users', current: true },
    { name: `${name} ${surname}`, href: `/users/1`, current: true },
  ]

  return (
    <AppLayout Steps={steps}>
      <div className="mt-6 mb-16 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-base font-semibold leading-6 text-gray-900">User Information</h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button
                type="button" onClick={() => navigate(`/users/${id}/edit`, { state: { users } })}
                className="relative inline-flex items-center rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name} {surname}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Username</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
            </div>
          </dl>
        </div>
      </div >
    </AppLayout >
  )
}

export default UsersShow;
