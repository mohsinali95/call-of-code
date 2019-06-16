import axios from 'axios';

export function startCompetition(obj) {
    console.log("objobj",obj)
    return dispatch => {
        dispatch({
            type: "SET_MATCH_DATA",
            payload: obj
        })
    }
}

export function runprogram(obj) {
    return dispatch => {
        console.log(obj)
        axios.post('/api/competition/runprogram', obj)
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

export function algo_check(obj) {
    axios.post("/api/competition/runAlgo/",obj)
    .then(res => {
        console.log("running")
    })
    
}
