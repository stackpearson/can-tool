export const initialState = {
    isLoggedIn: false,
    user: {}
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };

        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                user: {}
            }

            default:
                return state;
    }
}