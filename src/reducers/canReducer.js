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

        case 'DELETE_CAN':
            return {
                ...state,
                cans: state.cans.filter(item => {
                    return (item.id !== action.payload.id)
                })
            }

        // case 'UPDATE_CAN':
        //     return state.cans.map((item) => {
        //         if (item.id !== action.payload.id){
        //             return item
        //         }

        //         return {
        //             ...item,
        //             ...action.payload
        //         }
        //     })

            default:
                return state;
    }
}