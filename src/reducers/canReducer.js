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

            default:
                return state;
    }
}