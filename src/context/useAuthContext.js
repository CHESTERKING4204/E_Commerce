import {AuthContext} from './authContexr'
import {useContext} from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw Error('This is the useAuthContext Here..');
    }
    
    return context;
}