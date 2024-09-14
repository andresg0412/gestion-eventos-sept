export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        user
    }
});

export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS',
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: {
        error
    }
});

export const checkAuth = () => ({
    type: 'CHECK_AUTH',
});