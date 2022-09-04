import axios from 'axios';

const getBlocksList = async (token) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Widget/All`,
        {
            headers: {
              Authorization: 'Bearer ' + token
            }
        });
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getBlocksList;