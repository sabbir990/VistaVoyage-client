import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'
import toast from 'react-hot-toast';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import { ImSpinner3 } from 'react-icons/im';
const DeletePackageModal = ({ closeModal, isOpen, _id, refetch }) => {
    const axiosCommon = useAxiosCommon();
    const { setLoading, loading } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosCommon.delete(`/delete-package/${id}`);
            return data;
        },

        onSuccess: () => {
            setLoading(false);
            toast.success("Package Deleted Successfully!")
            closeModal();
            refetch();
        }
    })

    const handleDeletePackage = async (id) => {
        try {
            setLoading(true);

            await mutateAsync(id);
        } catch (error) {
            setLoading(false)
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
                                    className='text-lg font-medium leading-6 text-gray-900'
                                >
                                    Are you sure?
                                </DialogTitle>
                                <div className="mt-4 p-4 ">
                                    <p className="text-sm text-gray-600 text-center">
                                        You cannot undo this action once it's done!
                                    </p>

                                    <hr className="mt-6 border-gray-300" />

                                    <div className="flex mt-6 justify-around">
                                        <button
                                            onClick={() => handleDeletePackage(_id)}
                                            type="button"
                                            className="inline-flex justify-center rounded-full bg-red-500 text-white px-6 py-2 text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                                        >
                                            {
                                                loading ? <ImSpinner3 className='animate-spin' /> : 'Delete'
                                            }
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-full bg-green-500 text-white px-6 py-2 text-sm font-medium hover:bg-green-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default DeletePackageModal