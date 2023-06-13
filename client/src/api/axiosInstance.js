import axios from "axios"

// export default const getAccessToken = () => {
//     headers:{
//         authorization : `Bearer ${localStorage.getItem('token')}`
//     }
// }

export const axiosInstance = axios.create({
    headers:{
        authorization : `Bearer ${localStorage.getItem('token')}`
    }
})