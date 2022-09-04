import axios from 'axios';

const getDefaultCSS = async (token) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Property/1`,
        {
            headers: {
              Authorization: 'Bearer ' + token
            }
        });
        return JSON.parse(response.data.propertyValue.value);
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getDefaultCSS;