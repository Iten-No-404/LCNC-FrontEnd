import axios from 'axios';

const getProjects = async ({id, token}) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_API}/Project/user/${id}`, 
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