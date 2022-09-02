import axios from 'axios';

const getBoard = async ({id, token}) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_API}/Project/${id}`, 
        {
            headers: {
              Authorization: 'Bearer ' + token
            }
        });
        // console.log(response.data);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}
export default getBoard;