import axios from 'axios';

export function GetProfile(id) {
    return dispatch => {
        axios.get('/api/profile/'+id)
            .then(res => {
                dispatch({
                    type: "GET_PROFILE",
                    payload: res.data
                })
            }
            );
    }
}
export function matchhistory(id) {
    return dispatch => {
        axios.get('/api/profile/matchhistory/'+id)
            .then(res => {
                console.log("Res profile", res.data);
                dispatch({
                    type: "MATCH_HISTORY",
                    payload: res.data
                })
            }
            );
    }
}
export function playerstat(id) {
    return dispatch => {
        axios.get('/api/profile/playerstat/'+id)
            .then(res => {
                console.log("Res profile", res.data);
                dispatch({
                    type: "PLAYER_STATE",
                    payload: res.data
                })
            }
            );
    }
}
export function matchhistorydetail(id) {
    return dispatch => {
        axios.get('/api/profile/matchhistorydetail/'+id)
            .then(res => {
                console.log("Res profile", res.data);
                dispatch({
                    type: "MATCH_HISTORY_DETAIL",
                    payload: res.data
                })
            }
            );
    }
}

export function UpdateProfile(obj) {
    return dispatch => {
        axios.post('/api/profile/', obj)
            .then(res => {
                console.log("result UpdateProfile", res)
                dispatch({
                    type: "PROFILE_UPDATE",
                    payload: res.data
                })
            }
            )
    }
}



export function userimage(obj) {
    return dispatch => {
        axios.post('/api/profile/uploadimage', obj)
            .then(res => {
                console.log("result userimage", res.data)
                dispatch({
                    type: "PROFILE_IMAGE",
                    payload: res.data
                })

                let data={
                    email: res.data[0].email,
                    first_name: res.data[0].first_name,
                    id: res.data[0].user_id,
                    isLogin: true,
                    last_name: res.data[0].last_name,
                    profile_image: res.data[0].profile_image
                }
                localStorage.setItem('CurrentUser',JSON.stringify(data));
            }
            )
    }
}