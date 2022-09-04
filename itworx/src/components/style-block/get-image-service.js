import axios from 'axios';

const getImage = async ({query, token}) =>{
    try{
        const response = await axios.get(query,{
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        );
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default getImage;