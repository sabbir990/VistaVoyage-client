import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAuth from '../Hooks/useAuth'
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { ImSpinner3 } from 'react-icons/im';

const RequestToAdminModal = ({ closeModal, isOpen }) => {
    const { user, loading, setLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const axiosCommon = useAxiosCommon();

    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            const { data } = await axiosCommon.patch(`/request-role/${user?.email}`);
            return data
        },

        onSuccess: () => {
            setIsLoading(false)
            toast.success("You request is done! Wait for the admin approval");
            closeModal();
        }
    })

    const handleRequest = async () => {
        try {
            setIsLoading(true);

            await mutateAsync();
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error.message);
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
                                    Request for changing your Role!
                                </DialogTitle>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Please read all the terms & conditions before changing your role
                                    </p>
                                </div>
                                <hr className='mt-8 ' />
                                <div className='flex mt-2 justify-around'>
                                    <button
                                        onClick={handleRequest}
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                    >
                                        {
                                            isLoading ? <ImSpinner3 className='animate-spin' /> : 'Request'
                                        }
                                    </button>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default RequestToAdminModal