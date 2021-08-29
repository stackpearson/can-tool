export const setCans = initialCans => {
    return {type: 'SET_CANS', payload: initialCans}
}

export const addCan = newCan => {
    return {type: 'ADD_CAN', payload: newCan}
}

export const updateCan = updatedCan => {
    return {type: 'UPDATE_CAN', payload: updatedCan}
}

export const deleteCan = canToRemove => {
    return {type: 'DELETE_CAN', payload: canToRemove}
}