import axios from 'axios';
import fs from 'fs'


export function ShowAddFriend(id) {
    return dispatch => {
        axios.get('/api/friends/getFriends/' + id)
            .then(res => {
                dispatch({
                    type: "SHOW_ADD_FRIEND",
                    payload: res.data
                })
            }
            );
    }
}

export function friendRequests(id) {
    return dispatch => {
        axios.get('/api/friends/friendRequests/' + id)
            .then(res => {
                dispatch({
                    type: "FRIEND_REQUESTS",
                    payload: res.data
                })
            }
            );
    }
}
export function Myfriends(id) {
    console.log("MY friends id", id)
    return dispatch => {
        axios.get('/api/friends/Myfriends/'+id)
            .then(res => {
                console.log("MY friends", res.data)
                dispatch({
                    type: "MY_FRIENDS",
                    payload: res.data
                })
            }
            );
    }
}

export function sendFriendRequest(obj) {
    return dispatch => {
        axios.post('/api/friends/request', obj)
            .then(res => {
                dispatch({
                    type: "ADD_REQUEST_FRIEND",
                    payload: res.data
                })
            }
            )
    }
}

export function runprogram(obj) {
    return dispatch => {
        console.log(obj)
        axios.post('/api/friends/runprogram', obj)
            .then(res => {
                console.log("res program", res.data.output)
                   dispatch({
                        type: "SET_OUTPUT",
                        payload: res.data.output
                    })
            }
            )
    }
}


export function cancelRequest(obj) {
    return dispatch => {
        axios.delete(`/api/friends/cancelRequest/${obj.sender_id}/${obj.receiver_id}`)
            .then(res => {
                dispatch({
                    type: "CANCEL_REQUEST_FRIEND",
                    payload: res.data
                })
            }
            )
    }
}
export function Removefriends(obj) {
    return dispatch => {
        axios.delete(`/api/friends/Removefriends/${obj.my_id}/${obj.remove_friend_id}`)
            .then(res => {
                dispatch({
                    type: "MY_FRIENDS",
                    payload: res.data
                })
            }
            )
    }
}
export function AcceptRequest(data) {
    return dispatch => {
        axios.post(`/api/friends/acceptRequest`,data)
            .then(res => {
               dispatch({
                    type: "SHOW_FRIENDS",
                    payload: res.data
                })
            }
            )
    }
}

