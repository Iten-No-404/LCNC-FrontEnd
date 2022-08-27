import axios from 'axios';

const updateProject = async (data) =>{
    try{
        const response = await axios.put(`${process.env.REACT_APP_LOCAL_API}/Project/Update`, data);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}
export default updateProject;