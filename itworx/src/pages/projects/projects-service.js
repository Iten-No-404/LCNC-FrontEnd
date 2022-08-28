import axios from 'axios';

const getProjects = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/projects`);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getProjects;