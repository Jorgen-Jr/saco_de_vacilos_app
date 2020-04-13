
const INITIAL_STATE =
{
    headers: [],
    data: [],
    selected_id: null,
}

export default function table(state = INITIAL_STATE, action) {
    if(action.type === 'TABLE_UPDATE'){
        return {
            ...state,
            headers: action.headers,
            data: action.data,
            selected_id: action.selected_id,
        };
    }

    if(action.type === 'TABLE_DESTROY'){
        return {
            ...state,
            headers: [],
            data: [],
            selected_id: null,
        }
    }

    return state;
}