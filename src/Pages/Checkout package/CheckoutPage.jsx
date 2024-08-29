import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import Logo from '../../Components/Logo/Logo';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../Forms/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function Checkout() {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const [guides, setGuides] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState();

    const { data: selectedForCheckout, isLoading } = useQuery({
        queryKey: ['selectedForCheckout'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/selected-for-checkout/${id}`);
            return data;
        }
    })

    useEffect(() => {
        const getGuides = async () => {
            try {
                const { data } = await axiosCommon.get('/get-guides');
                setGuides([
                    {
                        userInformations: {
                            email: '',
                            displayName: "Select Your Guide"
                        }
                    },
                    ...data
                ]);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        };

        getGuides();
    }, []);

    const handleSelectGuide = (event) => {
        setSelectedGuide(event.target.value);
    }

    const {
        title,
        sub_title,
        image_url,
        tour_type,
        price,
        features,
        tour_duration,
        contact_information,
    } = selectedForCheckout || {};

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
            {/* Logo and Heading */}
            <div className="text-center mb-10">
                <Logo />
                <h1 className="text-4xl mt-4 font-bold text-gray-800">Checkout Your Wishlisted Package</h1>
                <p className="text-md text-gray-600">Review the details of your wishlisted tour package and proceed to checkout</p>
            </div>

            {/* Package Details Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row">
                    <img
                        src={image_url}
                        alt={title}
                        className="w-full lg:w-1/2 h-64 object-cover rounded-lg"
                    />
                    <div className="lg:ml-6 mt-4 lg:mt-0 lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                        <h3 className="text-xl font-semibold text-gray-600 mt-2">{sub_title}</h3>
                        <p className="text-sm text-gray-500 mt-4">Tour Type: {tour_type}</p>
                        <p className="text-sm text-gray-500 mt-2">Duration: {tour_duration}</p>
                        <p className="text-lg font-semibold text-blue-500 mt-4">${price}</p>
                        <p className="list-disc list-inside text-gray-700 mt-4">{features}</p>
                        <div className="mt-6">
                            <h3 className="text-lg font-medium">Contact Information</h3>
                            <p className="text-sm text-gray-500 mt-2">{contact_information}</p>
                        </div>
                        <select name="guide" onChange={handleSelectGuide} className='w-full p-4 border-2 border-gray-300 rounded-md outline-none my-3'>
                            {
                                guides?.map((guide, index) => {
                                    return <option key={index} value={guide?.userInformations?.email}>{guide?.userInformations?.displayName}</option>
                                })
                            }
                        </select>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm price={price} selectedForCheckout={selectedForCheckout} selectedGuide={selectedGuide} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
}
