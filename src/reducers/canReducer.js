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

        // case 'UPDATE_CAN': {
        //     const index = state.cans.findIndex(can => can.id === action.payload.id);
        //     const newArr = [...state.cans]
        //     newArr[index] = action.payload

        //     return {
        //         ...state,
        //         cans: newArr,
        //     }
        // }

        case 'UPDATE_CAN': {
            const index = state.cans.findIndex(can => can.id === action.payload.id);
            const newArr = [...state.cans]

            newArr[index] = action.payload

            return {
                ...state,
                cans: newArr,
            }
        }

            default:
                return state;
    }
}