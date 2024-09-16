import instance from './axios';
import { checkAuth } from '../redux/reducers/authReducer';

export const login = async (credentials) => {
    try{
        const response = await instance.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
};

export const logout = async () => {
    try{
        const response = await instance.post('/logout', {});
        return response.data;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}

export const check = async (dispatch) => {
    try{
        const response = await instance.get('/protected');
        if (response.data){
            dispatch(checkAuth(response.data))
        }
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}