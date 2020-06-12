import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2001',
    headers:{
        Authorization: localStorage.getItem('user') ? 
        'Bearer ' + JSON.parse(localStorage.getItem('user')).token
        : {},
    },
});

export default api;