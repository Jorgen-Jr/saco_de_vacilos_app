const persistedLogin = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const INITIAL_STATE =
{
    persistedLogin
}

export default function user(state = INITIAL_STATE, action) {
    if(action.type === 'USER_LOGIN'){
        return {
            ...state,
            token: action.user.token,
        };
    }

    if(action.type === 'USER_LOGOUT'){
        return{
            ...state,
            state: INITIAL_STATE
        }
    }

    return state;
}