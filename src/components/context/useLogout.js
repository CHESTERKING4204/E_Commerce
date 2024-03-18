import {useAuthContext} from './useAuthContext';

export const LogOut = () => {
    const { dispatch } = useAuthContext();

    const Logout = () => {
        //remove from the local storage
        localStorage.removeItem('user')

        //logout type given to hte user
        dispatch({type:'LOGOUT'});
    }
    return {Logout};
}