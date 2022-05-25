const AuthType = {
    loggin: "LOGGIN",
    logout: "LOOUT"
}


const state = {
    auth: { }
}


const reducer = (state, action) => {
    switch(action.type) {
        case AuthType.loggin: {
            const { payload } = action;
            return {
                ...state,
                auth: {
                    ...payload
                }
            }
        }
        case AuthType.logout: {
            return { 
                ...state,
                auth: { }
            }
        }
        default: 
            return state
    }
}


export { AuthType, state, reducer };   