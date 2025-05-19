import {useContext} from 'react';
import {AuthContext} from '../Context/AuthContext';

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw Error('Error in hook UseAuth Context');
    }
    return context;
}