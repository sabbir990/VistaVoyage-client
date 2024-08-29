import useAxiosCommon from './useAxiosCommon'
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

export default function useRole() {
    const {user} = useAuth();
    const axiosCommon = useAxiosCommon();

    const {data : userData, isLoading} = useQuery({
        queryKey : ['userData', user?.email],
        queryFn : async() => {
            const {data} = await axiosCommon.get(`/get-role/${user?.email}`);
            return data
        }
    })

  return {role : userData?.role, isLoading};
}
