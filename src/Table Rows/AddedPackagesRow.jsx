import React, { useState } from 'react';
import UpdatePackageModal from '../Modals/UpdatePackageModal';
import DeletePackageModal from '../Modals/DeletePackageModal';

export default function AddedPackagesRow({ singlePackage, isLoading, refetch }) {
    const { title, tour_type, price, tour_duration, features, contact_information, _id } = singlePackage;
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    if (isLoading) {
        return <div className='flex items-center justify-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="p-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                {title}
            </td>

            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                {tour_type}
            </td>

            <td className="p-4 text-sm font-semibold text-green-500 whitespace-nowrap">
                {price}
            </td>

            <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                {tour_duration}
            </td>

            <td className="p-4 text-sm text-gray-600 hidden lg:table-cell">
                {features?.slice(0, 20)}...
            </td>

            <td className="p-4 text-sm text-blue-500 whitespace-nowrap">
                {contact_information}
            </td>

            <td className="p-4 text-sm text-blue-500 whitespace-nowrap">
                <button className='btn btn-accent' onClick={() => setIsOpen(true)}>Update</button> | <button className='btn btn-error' onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
                <DeletePackageModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} _id={_id} refetch={refetch} />
                <UpdatePackageModal isOpen={isOpen} closeModal={closeModal} _id={_id} refetch={refetch} />
            </td>
        </tr>
    );
}
