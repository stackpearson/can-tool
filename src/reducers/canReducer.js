export const initialOptions = {
    cans: [],
}

export const canReducer = (state = initialOptions, action) => {
    switch (action.type) {
        case 'SET_CANS':
            return {
                ...state,
                cans: action.payload
            };
        
        case 'ADD_CAN':
            return {
                ...state,
                cans: state.cans.concat(action.payload)
            };

            default:
                return state;
    }
}