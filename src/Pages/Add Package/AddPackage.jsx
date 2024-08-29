import React, { useState } from 'react';
import Logo from '../../Components/Logo/Logo';
import AddPackageModal from '../../Modals/AddPackageModal';
import AddedPackagesTable from '../../Tables/AddedPackagesTable';

export default function AddPackage() {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-4">
      <header className="w-full max-w-4xl mb-8 flex flex-col items-center">
        <Logo className="mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add a New Tour Package</h1>
        <p className="text-lg text-gray-600 text-center">Fill out the details below to create a new tour package and share it with the world.</p>
      </header>
      <button className='btn btn-warning btn-block' onClick={() => setIsOpen(true)}>Add Package</button>
      <AddPackageModal isOpen={isOpen} closeModal={closeModal} />
      <main className="w-full max-w-4xl rounded-lg shadow-md">
        <AddedPackagesTable />
      </main>
    </div>
  );
}
