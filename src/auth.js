//import api from './services/api';
export const isAuthenticated = () => {
    if (!localStorage.getItem('user')) {
        return false;
    } else {
        return true;
    }
};