export function updateTable(headers, data, selected_id) {

    return {
        type: 'TABLE_UPDATE',
        headers,
        data,
        selected_id,
    };
}

export function destroyTable(){
    return {
        type: 'TABLE_DESTROY'
    }
}