import React from 'react';
import Logo from '../../Components/Logo/Logo';
import WishListTable from '../../Tables/WishListTable';

export default function MyWishlist() {
    return (
        <div className="min-h-screen py-4 px-5 sm:px-10">
            <div className="max-w-5xl mx-auto text-center">
                <Logo />
                <h1 className="text-3xl font-bold text-gray-900 mt-6">My Wishlist</h1>
                <p className="text-gray-600 mt-2">Your saved travel dreams, just a click away!</p>
            </div>
            <div className="w-full max-w-4xl rounded-lg shadow-md">
                <WishListTable />
            </div>
        </div>
    );
}
