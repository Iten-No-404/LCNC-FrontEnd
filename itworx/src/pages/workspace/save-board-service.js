import axios from 'axios';

const updateProject = async ({data, token}) =>{
    try{
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/Project/Update`, data,
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
export default updateProject;