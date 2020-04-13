export function login(user) {
    //Persistir o token na autenticação.
    localStorage.setItem('user', user);
    
    return {
        type: 'USER_LOGIN',
        user,
    };
}

export function logout(user){
    localStorage.removeItem('user');

    return{
        type: 'USER_LOGOUT',
        user,
    }
}

export function update(user){
    return{
        type: 'USER_UPDATE',
        user,
    }
}