import axios from 'axios';

const getImage = async (query) =>{
    try{
        const response = await axios.get(query);
        // console.log("getImage Res=",response.data);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getImage;