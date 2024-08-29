import React, { useState } from 'react'
import UpdateUserRoleModal from '../Modals/UpdateUserRoleModal';

export default function ManageUsersRow({ user, isLoading, refetch }) {
    const { uid, email, displayName, photoURL } = user?.userInformations;
    const { role, _id, status } = user;
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100 text-sm">
            <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                    <span className="font-medium">{uid}</span>
                </div>
            </td>
            <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                    <img
                        className="w-8 h-8 rounded-full mr-2"
                        src={photoURL}
                        alt="User Avatar"
                    />
                    <span>{displayName}</span>
                </div>
            </td>
            <td className="py-3 px-6 text-left">
                <span>{email}</span>
            </td>
            <td className="py-3 px-6 text-left">
                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                    {role}
                </span>
            </td>
            <td className="py-3 px-6 text-left">
                <p className={`${status === 'updated' ? 'text-green-500' : status === 'requested' ? 'text-red-500' : ''} font-bold font-poppins`}>{status}</p>
            </td>
            <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                    <button disabled={status !== 'requested'} className="btn btn-accent" onClick={() => setIsOpen(true)}>
                        Update Role
                    </button>

                    <UpdateUserRoleModal isOpen={isOpen} closeModal={closeModal} refetch={refetch} _id={_id} />
                </div>
            </td>
        </tr>
    )
}
