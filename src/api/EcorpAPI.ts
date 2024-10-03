import axios from "axios";

const EcorpAPI = axios.create({
    baseURL: 'https://matecsoluciones.mx/DevApp/api'
})


export default EcorpAPI;