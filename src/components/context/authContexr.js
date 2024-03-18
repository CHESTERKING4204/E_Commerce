import { createContext, useReducer, useEffect} from 'react';

export const AuthContext = createContext();


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state;
    }
}


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //use for the reload purpose in which the application still have the user but after the page reload the user seems to be out of the site
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));

        if(user){
            dispatch({type:'LOGIN',payload:user});
        }

    },[])


    console.log('Auth Context Succefully', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}