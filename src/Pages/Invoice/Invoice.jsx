import React from 'react';
import Logo from '../../Components/Logo/Logo';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
import { FaDoorOpen } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import jsPDF from 'jspdf';

export default function Invoice() {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data: invoiced_data, isLoading } = useQuery({
        queryKey: ['invoiced_data'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/invoiced_details/${id}`);
            return data;
        }
    });

    const {
        title = '',
        sub_title = '',
        image_url = '',
        tour_type = '',
        price = '',
        features = '',
        tour_duration = '',
        contact_information = '',
        userEmail = '',
        transactionId = '',
        guide = '',
        paid = 0
    } = invoiced_data || {};

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        
        // Add Title and Subtitle
        doc.setFontSize(20);
        doc.text(title, 20, 20);
        doc.setFontSize(16);
        doc.text(sub_title, 20, 30);

        // Add Image
        const img = new Image();
        img.src = image_url;
        img.onload = () => {
            doc.addImage(img, 'JPEG', 20, 40, 160, 90);
            
            // Add Details
            doc.setFontSize(14);
            doc.text(`Tour Type: ${tour_type}`, 20, 140);
            doc.text(`Price: $${price}`, 20, 150);
            doc.text(`Features: ${features}`, 20, 160);
            doc.text(`Tour Duration: ${tour_duration}`, 20, 170);
            doc.text(`Contact Information: ${contact_information}`, 20, 180);
            doc.text(`Guide: ${guide}`, 20, 190);
            doc.text(`Transaction ID: ${transactionId}`, 20, 200);
            doc.text(`Paid Amount: $${paid}`, 20, 210);
            doc.text(`User Email: ${userEmail}`, 20, 220);

            // Save PDF
            doc.save('invoice.pdf');
        };
    };

    return (
        <div className="container mx-auto p-6 md:p-10">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-center mb-12">
                <Logo />
                <h1 className="text-4xl font-extrabold text-gray-800 mt-6">Invoice</h1>
                <p className="text-lg text-gray-500 mt-2">Thank you for your purchase!</p>
            </div>

            {/* Invoice Details */}
            <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 mb-6">{sub_title}</p>
                <img
                    className="w-full h-72 object-cover rounded-md mb-6"
                    src={image_url}
                    alt={title}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700">Tour Type:</h3>
                        <p className="text-gray-600">{tour_type}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700">Price:</h3>
                        <p className="text-gray-600">${price}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700">Features:</h3>
                        <p className="text-gray-600">{features}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700">Tour Duration:</h3>
                        <p className="text-gray-600">{tour_duration}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700">Contact Information:</h3>
                        <p className="text-gray-600">{contact_information}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-700">Guide:</h3>
                        <p className="text-gray-600">{guide}</p>
                    </div>
                </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-100 shadow-lg rounded-lg p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-lg text-gray-700">Transaction ID:</h4>
                        <p className="text-gray-600">{transactionId}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-gray-700">Paid Amount:</h4>
                        <p className="text-gray-600">${paid}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-gray-700">User Email:</h4>
                        <p className="text-gray-600">{userEmail}</p>
                    </div>
                </div>
                <div className='py-10 flex items-center justify-center space-x-8'>
                    <Link to={'/'} className='btn btn-accent space-x-2'> <FaDoorOpen /> <span>Home</span></Link>
                    <button className='btn btn-warning space-x-2' onClick={handleDownloadPDF}><FiPrinter /><span>Print</span></button>
                </div>
            </div>
        </div>
    );
}
