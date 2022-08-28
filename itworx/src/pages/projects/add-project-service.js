import axios from 'axios';

const addProject = async (query) =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_LOCAL_API}/Project/Add`, query);
        console.log(response.data);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default addProject;