import PropTypes from 'prop-types';
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ImSpinner3 } from 'react-icons/im';

const AddStoryModal = ({ closeModal, isOpen, refetch }) => {
    const { user, loading, setLoading } = useAuth();
    const axiosCommon = useAxiosCommon();

    const { mutateAsync } = useMutation({
        mutationFn: async (story) => {
            const { data } = await axiosCommon.post('/post-story', story);
            return data
        },

        onSuccess: () => {
            setLoading(false)
            toast.success("Your story have posted successfully!");
            closeModal();
        }
    })

    const handleSubmitStory = async (event) => {
        event.preventDefault();

        const form = event.target;
        const heading = form.heading.value;
        const story = form.story.value;
        const tour_date = form.tour_date.value;
        const tour_length = form.tour_length.value;
        const person_email = form.person_email.value;
        const person_name = form.person_name.value;
        const spot_name = form.spot_name.value;
        const profile_image = user?.photoURL;

        const yourStory = {
            heading,
            story,
            tour_date,
            tour_length,
            person_email,
            person_name,
            spot_name,
            profile_image,
            likes : 0
        }

        try {
            setLoading(true);

            await mutateAsync(yourStory)
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-medium text-center leading-6 text-gray-900"
                                >
                                    Add Your Story
                                </DialogTitle>

                                <form onSubmit={handleSubmitStory} className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Heading
                                        </label>
                                        <input
                                            type="text"
                                            name="heading"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter heading"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Story
                                        </label>
                                        <textarea
                                            name="story"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Share your story"
                                            rows="4"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tour Date
                                        </label>
                                        <input
                                            type="date"
                                            name="tour_date"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Tour Length (in days)
                                        </label>
                                        <input
                                            type="number"
                                            name="tour_length"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter tour length"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Person's Email
                                        </label>
                                        <input
                                            type="email"
                                            name="person_email"
                                            defaultValue={user?.email}
                                            readOnly
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Person's Name
                                        </label>
                                        <input
                                            type="text"
                                            name="person_name"
                                            defaultValue={user?.displayName}
                                            readOnly
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Spot Name
                                        </label>
                                        <input
                                            type="text"
                                            name="spot_name"
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter spot name"
                                            required
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                        >
                                            {
                                                loading ? <ImSpinner3 className='animate-spin' /> : 'Submit Story'
                                            }
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddStoryModal;
