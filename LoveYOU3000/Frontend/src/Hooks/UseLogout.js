import {useAuthContext} from './useAuthContext';

export const UserLogOut = () => {
    const {dispatch} = useAuthContext();

    const logout = () => {
        localStorage.removeItem('user');

        dispatch({type:'LOGOUT'});
    }
    return {logout};
}