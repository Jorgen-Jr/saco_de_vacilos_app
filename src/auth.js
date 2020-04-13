//import api from './services/api';

function isLoginExpired(){
    const login_date = new Date(JSON.parse(localStorage.getItem('user')).login_date);
    if(new Date().getTime() - login_date.getTime() > (86400000)){
        return false;
    }
    return JSON.parse(localStorage.getItem('user')).token ? true : false;
}

export const isAuthenticated = () => {
    let isAlive = false;
    if(localStorage.getItem('user')){
        isLoginExpired() ? isAlive = true
        : isAlive = false
    }else{
        isAlive = false
    }
    
    return isAlive;
};