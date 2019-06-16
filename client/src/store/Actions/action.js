import axios from 'axios';
import history from '../../Components/History/History';
// import { Redirect } from 'react-router-dom';
// import history from '../../History';
export function GetUser() {
    return dispatch => {
        axios.get('/api/signup')
            .then(res => {
                dispatch({
                    type: "GET_ITEMS",
                    payload: res.data
                })
            }
            );
    }
}
export function LoginUser(obj, history) {

    return dispatch => {
        axios.post('/api/signup/login', obj)
            .then(res => {
                if (res.data.msg != undefined && res.data.error == '') {
                    let data = res.data.msg;
                    delete data.password;
                    localStorage.setItem('CurrentUser', JSON.stringify(data));
                    console.log(data)
                    dispatch({
                        type: "LOGIN_USER",
                        payload: data
                    })
                    history.push('/home')
                }
                else if (res.data.error.length > 0 && res.data.msg == undefined) {
                    dispatch({
                        type: "LOGIN_ERROR",
                        payload: res.data.error
                    })
                }
            }
            )

    }
}

export function checkSession(path) {
    return dispatch => {
        axios.get('/api/signup/checkSession')
            .then(res => {
                console.log("check", res.data)
                dispatch({
                    type: "CHECK_SESSION",
                    payload: res.data
                })
            }
            )
    }
}
export function logout(abc, da) {
    console.log("abc", abc);
    return dispatch => {
        axios.get('/api/signup/logout')
            .then(res => {
                localStorage.removeItem('CurrentUser')
                dispatch({
                    type: "LOGOUT_USER",
                    payload: res.data
                })
                var Backlen = history.length;
                console.log("Backlen", Backlen);
                history.push("/");
                // history.go(0); 

                // window.onbeforeunload= function(){
                //     return "";
                // }

                // function preback(){
                //     window.history.forward();
                //     setTimeout(() => {
                //         preback();  
                //     }, 0);

                // }

                window.history.forward();
                function noBack() { window.history.forward(); }
                window.location.href = '/';

            }
            )
    }
}


export function AddUser(obj, history) {

    return dispatch => {
        axios.post('/api/signup/', obj)
            .then(res => {
                if (res.data.error.length > 0) {
                    dispatch({
                        type: "ERROR_SIGNUP",
                        payload: res.data.error
                    })
                }
                else {
                    dispatch({
                        type: "ADD_USER",
                        payload: res.data
                    })
                    history.push('/home')
                }

            }
            )

    }
}

export function SetItemLoading() {
    return {
        type: "ITEMS_LOADING",
    }
}
