import axios from 'axios';

const uploadImage = async ({query, token}) =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/File`, query,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token
            }
          });
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}

export default uploadImage;