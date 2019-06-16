// import uuid from 'uuid';
const INITIAL_STATE = {
    users: [],
    server_ip: 'http://192.168.43.41:5000',
    loading: false,
    list: [],
    currentUser: '',
    errorSignUp: '',
    flag: false,
    login_error: []

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_ITEMS":
            return {
                ...state,
                users: action.payload,
                loading: false

            }

        case "ADD_USER":
            return {
                ...state,
                users: [action.payload, ...state.users],
                loading: false,
            }
        case "CHECK_SESSION":
            return {
                currentUser: action.payload,
                loading: false,
            }
        case "LOGOUT_USER":
            return {
                currentUser: action.payload,
                loading: false,
            }

        case "LOGIN_USER":
            return {
                currentUser: action.payload,
            }
        case "LOGIN_ERROR":
            return {

                login_error: action.payload,
            }
        case "ERROR_SIGNUP":
            if (state.flag == true) {
                state.errorSignUp = '';
                state.flag = false
            }
            return {
                ...state,
                errorSignUp: action.payload,
                flag: true
            }
        default:
            return state;
    }

}