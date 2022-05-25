import { createContext, useContext, useReducer } from "react";

import { reducer, state } from "./auth.reducer";


const AuthContext = createContext({ });

const useAuth = () => useContext( AuthContext );


const AuthContextProvider = ({ children }) => {
    
    const [store, dispatch] = useReducer(reducer, state)

    return (
        <AuthContext.Provider value={{ store, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}

export { useAuth };
export default AuthContextProvider;