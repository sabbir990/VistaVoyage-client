import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import Logo from '../Components/Logo/Logo'
import useAuth from '../Hooks/useAuth'
import useAxiosCommon from '../Hooks/useAxiosCommon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useHostImage from '../Hooks/useHostImage'
import { ImSpinner3 } from 'react-icons/im'

const AddPackageModal = ({ closeModal, isOpen }) => {
    const axiosCommon = useAxiosCommon();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync } = useMutation({
        mutationFn: async (package_details) => {
            const { data } = await axiosCommon.post('/insert-package', package_details);
            return data;
        },

        onSuccess: () => {
            setIsLoading(false);
            toast.success("Your item added successfully!");
            closeModal();
            queryClient.invalidateQueries(['packages'])
        }
    })

    const handleAddPackageSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const title = form.title.value;
        const sub_title = form.sub_title.value;
        const place_image = form.place_image.files[0];
        const tour_type = form.tour_type.value;
        const price = form.price.value;
        const features = form.features.value;
        const tour_duration = form.tour_duration.value;
        const contact_information = form.contact_information.value;

        try {
            setIsLoading(true);
            const image_url = await useHostImage(place_image);

            const myPackage = {
                title, sub_title, image_url, tour_type, price, features, tour_duration, contact_information
            }

            await mutateAsync(myPackage);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error.message)
        }
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    <div className="flex justify-center mb-6">
                                        <Logo />
                                    </div>
                                    <h2 className="text-2xl font-bold text-center mb-4">Add Tour Package</h2>
                                    <p className="text-center text-gray-600 mb-8">Fill in the details of the new tour package below.</p>
                                </DialogTitle>
                                <form className="space-y-6" onSubmit={handleAddPackageSubmit}>
                                    <div>
                                        <label htmlFor="title" className="block text-lg font-semibold text-gray-700">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            name='title'
                                            id="title"
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter the tour package title"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subtitle" className="block text-lg font-semibold text-gray-700">
                                            Subtitle/Short Description
                                        </label>
                                        <input
                                            name='sub_title'
                                            required
                                            type="text"
                                            id="subtitle"
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter a brief summary"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="placeImage" className="block text-lg font-semibold text-gray-700">
                                            Place Image
                                        </label>
                                        <input
                                            required
                                            name='place_image'
                                            type="file"
                                            id="placeImage"
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="tourType" className="block text-lg font-semibold text-gray-700">
                                            Tour Type
                                        </label>

                                        <select required name="tour_type" className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                            <option value="Adventure">Adventure</option>
                                            <option value="Relaxation">Relaxation</option>
                                            <option value="Cultural">Cultural</option>
                                            <option value="Wildlife">Wildlife</option>
                                            <option value="Historical">Historical</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="price" className="block text-lg font-semibold text-gray-700">
                                            Price
                                        </label>
                                        <input
                                            required
                                            name='price'
                                            type="number"
                                            id="price"
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter the price"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="highlights" className="block text-lg font-semibold text-gray-700">
                                            Highlights and Features
                                        </label>
                                        <textarea
                                            name='features'
                                            required
                                            id="highlights"
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="List the highlights and features"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="duration" className="block text-lg font-semibold text-gray-700">
                                            Tour Duration
                                        </label>
                                        <input
                                            name='tour_duration'
                                            required
                                            type="text"
                                            id="duration"
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter the duration (e.g., 7 days, 2 weeks)"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contact" className="block text-lg font-semibold text-gray-700">
                                            Contact Information
                                        </label>
                                        <input
                                            name='contact_information'
                                            required
                                            defaultValue={"vistaVoyage@community.com"}
                                            readOnly
                                            type="text"
                                            id="contact"
                                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter contact information"
                                        />
                                    </div>

                                    <div className="flex items-start">
                                        <input
                                            name='checkbox'
                                            required
                                            type="checkbox"
                                            id="terms"
                                            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <label htmlFor="terms" className="ml-3 text-gray-700">
                                            I agree to the Terms and Conditions
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {
                                            isLoading ? <ImSpinner3 className='animate-spin' /> : 'Add Package'
                                        }
                                    </button>
                                </form>
                                <hr className='mt-8 ' />
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AddPackageModal;