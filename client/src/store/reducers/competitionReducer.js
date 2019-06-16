const INITIAL_STATE = {
    output : '',
    matchId: '',
    ip:"http://192.168.43.41:5000",
    ques: ''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_OUTPUT":
            return {
                output: action.payload,
            }
        case "SET_MATCH_DATA":
            return {
                matchId: action.payload.match_id,
                ques: action.payload.quesObj
            }
         default:
        return state;
    }

}