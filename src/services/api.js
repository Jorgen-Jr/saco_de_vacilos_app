import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    // baseURL: 'http://192.168.0.150:3001',
    headers:{
        Authorization: localStorage.getItem('user') ? 
        'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        : {},
    },
});

export default api;