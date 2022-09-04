import axios from 'axios';

const addProject = async ({query, token}) =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Project/Add`, query, {
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

export default addProject;