import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useRole from "../../Hooks/useRole";

const OurPackagesCard = ({ singlePackage }) => {
    const {user} = useAuth();
    const {role} = useRole();
    const axiosCommon = useAxiosCommon();
    const { image_url, tour_type, title, subtitle, price, features, tour_duration, _id } = singlePackage;

    const {mutateAsync} = useMutation({
        mutationFn : async(wishlistedPackage) => {
            const {data} = await axiosCommon.post(`/wishlist-package`, wishlistedPackage);
            return data
        },

        onSuccess : () => {
            toast.success("Item Added to your wishlist");
        }
    })

    const handleAddToWishlist = async() => {
        delete singlePackage._id;
        const wishlistedPackage = {
            ...singlePackage, userEmail : user?.email
        }

        try{
            if(user){
                if(role !== 'user'){
                    toast.error("You must be user before adding an item to wishlist!")
                }
                
                await mutateAsync(wishlistedPackage);
            }else{
                toast.error("You must login to your account before adding an item into wishlist!")
            }
        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <div className="relative">
                <img
                    className="w-full h-48 object-cover"
                    src={image_url}
                    alt={title}
                />
                <button
                onClick={handleAddToWishlist}
                    className="absolute top-2 right-2 text-red-500 text-2xl focus:outline-none"
                >
                    <FaRegHeart />
                </button>
            </div>
            <div className="px-6 py-4">
                <span className="block text-sm text-gray-500 mb-1">{tour_type}</span>
                <div className="font-bold text-xl mb-1">{title}</div>
                <p className="text-gray-600 text-sm mb-2">{subtitle}</p>
                <p className="text-gray-700 text-base mb-2">Duration: {tour_duration}</p>
                <p className="text-gray-700 text-base mb-4">${price}</p>
                <p className="text-gray-700 text-base mb-4">{features}</p>
            </div>
            <div className="px-6 py-4">
                <Link to={`/package-details/${_id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        View Package
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OurPackagesCard;
