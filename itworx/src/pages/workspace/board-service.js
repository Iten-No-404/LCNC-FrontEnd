import axios from 'axios';

const getBoard = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/board-2`);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getBoard;