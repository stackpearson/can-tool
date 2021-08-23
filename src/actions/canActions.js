export const setCans = initialCans => {
    return {type: 'SET_CANS', payload: initialCans}
}

export const addCan = newCan => {
    return {type: 'ADD_CAN', payload: newCan}
}