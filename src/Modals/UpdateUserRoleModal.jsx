import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ImSpinner3 } from 'react-icons/im';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
const UpdateUserRoleModal = ({ closeModal, isOpen, _id, refetch }) => {
    const axiosCommon = useAxiosCommon();
    const {loading, setLoading} = useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()


    const { data: userDetails } = useQuery({
        queryKey: ['userDetails', _id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/user-details/${_id}`);
            return data;
        }
    })

    const {mutateAsync} = useMutation({
        mutationFn : async(role) => {
            const {data} = await axiosCommon.patch(`/update-role/${_id}`, {role})
            return data;
        },

        onSuccess : () => {
            setIsLoading(false);
            toast.success("Updated User Role Successfully");
            closeModal();
            queryClient.invalidateQueries(['users'])
        }
    })

    const { role = '' } = userDetails || {};

    const [newRole, setNewRole] = useState(role);

    const handleChangeRole = (event) => {
        setNewRole(event.target.value)
    }

    const handleUpdateRole = async() => {
        try{
            setIsLoading(true);

            if(newRole !== "" || newRole){
                await mutateAsync(newRole)
            }

        }catch(error){
            setIsLoading(false)
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
                                    Update User Role
                                </DialogTitle>
                                <div className="mt-4 p-4 ">
                                    <select onChange={handleChangeRole} name="role" defaultValue={role} className='w-full p-4 rounded-md border-2 border-gray-300 outline-none'>
                                        <option value="user">User</option>
                                        <option value="guide">Guide</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <hr className="mt-6 border-gray-300" />

                                    <div className="flex mt-6 justify-around">
                                        <button
                                            onClick={handleUpdateRole}
                                            type="button"
                                            className="inline-flex justify-center rounded-full bg-red-500 text-white px-6 py-2 text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
                                        >
                                            {
                                                isLoading ? <ImSpinner3 className='animate-spin' /> : 'Update'
                                            }
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-full bg-green-500 text-white px-6 py-2 text-sm font-medium hover:bg-green-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
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

export default UpdateUserRoleModal