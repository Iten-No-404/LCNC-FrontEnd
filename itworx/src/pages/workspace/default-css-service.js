import axios from 'axios';

const getDefaultCSS = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/default-css`);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getDefaultCSS;