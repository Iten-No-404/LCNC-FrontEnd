import axios from 'axios';

const getBoard = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_API}/Project/1`);
        // const data = response.json();
        // console.log('Received from back',response);
        // const data = JSON.parse(response.data.widgets);
        // console.log(data);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}
export default getBoard;