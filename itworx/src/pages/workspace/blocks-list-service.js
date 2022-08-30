import axios from 'axios';

const getBlocksList = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_API}/Widget/All`);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getBlocksList;