import toast from 'react-hot-toast';
import useAxiosCommon from './useAxiosCommon';

export default async function useHostImage(image) {
    const formData = new FormData();
    formData.append('image', image);
    const axiosCommon = useAxiosCommon();

    try{
        const {data} = await axiosCommon.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, formData);
        return data.data.display_url;
    }catch(error){
        console.log(error);
        toast.error(error.message)
    }
}
