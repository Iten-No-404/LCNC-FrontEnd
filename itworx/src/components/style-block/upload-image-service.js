import axios from 'axios';

const uploadImage = async (query) =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_LOCAL_API}/File`, query);
        // console.log(response.data);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default uploadImage;