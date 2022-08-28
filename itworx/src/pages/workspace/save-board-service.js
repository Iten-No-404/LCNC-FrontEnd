import axios from 'axios';

const updateProject = async (data) =>{
    try{
        // console.log("Updated Data:",data);
        const response = await axios.put(`${process.env.REACT_APP_LOCAL_API}/Project/Update`, data);
        // const data = response.json();
        // console.log('Received from back',response);
        // const data = JSON.parse(response.data.widgets);
        // console.log(response.data);
        return response.data;
    }catch (err){
        console.log(err);
        return undefined;
    }
}
export default updateProject;