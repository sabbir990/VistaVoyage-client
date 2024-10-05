import React, { useState } from 'react'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useMutation, useQuery } from '@tanstack/react-query';
import OurPackagesCard from '../../Components/Tourism & Travel Guide Section/OurPackagesCard';
import { IoSearch } from "react-icons/io5";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function AllPackages() {
    const [search, setSearch] = useState();
    const [packages, setPackages] = useState([]);
    const axiosCommon = useAxiosCommon();
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/packages');
            setPackages(data);
            return data;
        }
    })

    const {mutateAsync: searchedPackages} = useMutation({
        mutationFn : async() => {
            const {data} = await axiosCommon.get(`/searched-packages/${search}`);
            return data;
        }
    })

    const handleSearchPackages = async() => {
        if(search === '' || !search){
            return toast.error("Input the name first!")
        }

        try{
            const allSearchedPackages = await searchedPackages();
            if(allSearchedPackages.length === 0){
                return toast.error("No packages found matching this name!")
            }
            setPackages(allSearchedPackages);
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    if (isLoading) {
        return <div className='flex items-center justify-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }
    
    return (
        <div>
            <div className="text-center my-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Our Exclusive Travel Packages</h1>
                <p className="text-lg text-gray-600">Find your perfect getaway with our carefully curated selection of trips and adventures. There's something for every traveler!</p>
            </div>

            <div className='mb-10 flex items-center justify-center'>
                <div className='flex items-center w-auto border border-gray-500 rounded-lg'>
                    <input className='py-3 outline-none px-2 rounded-lg' type="text" onChange={(event) => setSearch(event.target.value)} placeholder='Search name...' />
                    <button className='flex items-center space-x-3 btn btn-success text-white' onClick={handleSearchPackages}><span>Search</span> <IoSearch /> </button>
                </div>
            </div>

            {
                packages.length === 0 || !packages && <p className='text-2xl font-bold text-center'>No Packages Found!!!</p>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    packages?.map((singlePackage, index) => (
                        <OurPackagesCard
                            key={index}
                            singlePackage={singlePackage}
                        />
                    ))
                }
            </div>
        </div>
    )
}
