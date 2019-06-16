
const INITIAL_STATE = {
    firendRequest: [],
    show_add_friend_request: [],
    loading: false,
    profileimage: [],
    Request_from_me: [],
    Request_to_me: [],
    ShowFriends: [],
    MyFriends:[],
    Friend:[],

}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case "GET_PROFILE":
        // return {
        //     ...state,
        //     profile:action.payload,
        //     loading:false
        // }
        case "ADD_REQUEST_FRIEND":
            return {
                show_add_friend_request: action.payload,
                loading: false
            }
        case "MY_FRIENDS":
            return {
                ...state,
                MyFriends: action.payload,
                Friend:action.payload,
                loading: false
            }
        case "FRIEND_REQUESTS":
            return {
                Request_from_me: action.payload.from,
                Request_to_me: action.payload.to,
                loading: false
            }
        case "ACCEPT_REQUEST_FRIEND":
            return {
                Request_from_me: action.payload.from,
                Request_to_me: action.payload.to,
                loading: false
            }
        case "REQUEST_TO_ME":
            return {
                Request_to_me: action.payload,
                loading: false
            }
        case "SHOW_ADD_FRIEND":
            return {
                show_add_friend_request: action.payload,
                loading: false
            }
        case "SHOW_FRIENDS":
            return {
                ShowFriends: action.payload,
                loading: false
            }
        case "CANCEL_REQUEST_FRIEND":
            return {
                Request_from_me: action.payload.from,
                Request_to_me: action.payload.to,
                loading: false
            }
        default:
            return state;
    }

}
