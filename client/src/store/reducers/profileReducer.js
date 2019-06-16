const INITIAL_STATE = {
    profile: [],
    // iip:"http://192.168.68.40:5000",
    iip:"http://192.168.43.41:5000",
    loading:false,
    profileimage:[],
    matchhistory:[],
    matchhistorydetail:[],
    playerstate:[]
   
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_PROFILE":
        return {
            ...state,
            profile:action.payload,
            loading:false
        }
        case "PROFILE_UPDATE":
        return {
           profile:action.payload,
            loading:false
        }
        case "MATCH_HISTORY":
        return {
           matchhistory:action.payload,
            loading:false
        }
        case "MATCH_HISTORY_DETAIL":
        return {
            matchhistorydetail:action.payload,
            loading:false
        }
        case "PLAYER_STATE":
        return {
            playerstate:action.payload,
            loading:false
        }
        case "PROFILE_IMAGE":
        return {
            // profileimage:action.payload,
            profile:action.payload,
            loading:false
        }
        default:
        return state;
    }

}