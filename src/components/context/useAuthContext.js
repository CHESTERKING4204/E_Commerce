import { useContext } from 'react';
import {AuthContext} from './authContexr';

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw Error('This is the useAuthContext file giving the error');
    }

    return context;
}