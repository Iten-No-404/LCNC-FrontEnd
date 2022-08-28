import axios from 'axios';

const getDefaultCSS = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_API}/Property/1`);
        console.log(JSON.parse(response.data.propertyValue.value))
        return JSON.parse(response.data.propertyValue.value);
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getDefaultCSS;