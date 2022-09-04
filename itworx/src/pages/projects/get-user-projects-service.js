import axios from 'axios';

const getProjects = async ({id, token}) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Project/user/${id}`, 
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

export default getProjects;