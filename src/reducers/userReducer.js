export const initialState = {
    user: {
        'bearer-token': localStorage.getItem('bearer-token'),
        'username': localStorage.getItem('username'),
        'user-id': localStorage.getItem('user-id')
    }
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };

        case 'LOG_OUT':
            return {
                ...state,
                user: {}
            }

            default:
                return state;
    }
}