export const setUser = activeUser => {
    return {type: 'SET_USER', payload: activeUser}
}

export const logOut = toggle => {
    return {type: 'LOG_OUT', payload: toggle}
}

