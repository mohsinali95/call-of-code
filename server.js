const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session')
const connection = require('./config/connection');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
// socket setting
const http = require('http').createServer(app);
const socketio = require('socket.io')(http);

let socket_obj = [];

socketio.on('connection', socket => {
    socket.on("USER LOGIN", id => {
        if (socket_obj.filter(item => item.user_id == id).length > 0) {
            // for (var i = 0; i < socket_obj.length; i++) {
            //     if (socket_obj[i].user_id == id) {
            //         socket_obj.splice(socket_obj[i], 1);
            //         let user_obj = {
            //             user_id: id,
            //             socket_id: socket.id
            //         }
            //         socket_obj.push(user_obj);
            //     }
            // }
            console.log("User Already Present");
        }
        else {
            let user_obj = {
                user_id: id,
                socket_id: socket.id
            }
            socket_obj.push(user_obj);
            console.log("socjet obj inside Else",socket_obj);
        }
    }
    )

    socket.on("ONLINE_FRIENDS", id => {
        socketio.emit("SHOW_FRIENDS", socket_obj)
    })


    socket.on("CHALLENGE_FRIEND", obj => {
        socketio.emit("RECEIVE_CHALLENGE", obj)
    })
    socket.on("CHALLENGE_ACCEPTED", objj => {
        console.log("objj",objj)
        connection.query(`SELECT * FROM questions where questions.language = '${objj.language}' and questions.difficulty='${objj.Difficulty}'`,(quesErr, quesRes)=>{
            if(quesErr) console.log(quesErr)
            let quesLen = quesRes.length;
            let random = Math.floor(Math.random() * Math.floor(quesLen));
            connection.query(`INSERT INTO match_detail(question_id) value(${quesRes[random].id})`,(insertErr, insertRes) => {
                if(insertErr) console.log(insertErr)
                console.log("insertRes",insertRes)
                let ques = {
                    sender_id: objj.sender_id,
                    quesObj: quesRes[random],
                    receiver_id: objj.receiver_id,
                    match_id: insertRes.insertId
                }
                socketio.emit("CHALLENGE_ACCEPTED_RECEIVER", ques )
            })
        })
    })

    socket.on("USER LOGOUT", id => {
        socket_obj = socket_obj.filter(x => x.user_id != id)
    })
    socket.on("Friend Request", obj => {
        if (socket_obj.filter(item => item.user_id == obj.receiver_id).length > 0) {
            let notification = socket_obj.find(a => a.user_id = obj.receiver_id)
            socketio.emit("SHOW FRIEND REQUEST", obj)
        }
        else {
            console.log("No Receiver Online ")
        }
    })
    socket.on("ACCEPT_REQUEST_MODEL", obj => {
        connection.query(`UPDATE friend_requests SET accepted=1 where sender_id=${obj.sender_id} AND receiver_id=${obj.receiver_id} `, (error, result) => {
            if (error) {
                return res.send(error)
            }
            else {
                connection.query(`INSERT INTO friends (sender_id,receiver_id) VALUES (${obj.sender_id},${obj.receiver_id}),(${obj.receiver_id},${obj.sender_id})`, (insert_error, inser_result) => {
                    if (insert_error) {
                        return res.send(insert_error)
                    }
                    else {
                        connection.query(`SELECT CONCAT(u.first_name," ",u.last_name) AS username,p.profile_image,u.id AS friend_id FROM users u LEFT JOIN friends f ON f.sender_id=u.id LEFT JOIN PROFILE p ON p.user_id=u.id WHERE f.receiver_id=${obj.sender_id}`, (selet_error, select_result) => {
                            if (selet_error) {
                                return res.send(selet_error)
                            }
                            else {
                                console.log(select_result);
                            }
                        })
                    }
                })

            }
        })
    })
    socket.on('disconnect', () => {
        console.log("user Disconnceted", socket.id)
        console.log("socket_obj", socket_obj)
    })
})
var signup_apis = require('./routes/api/signup');
var profile_apis = require('./routes/api/profile');
var friends_apis = require('./routes/api/friends');
var competition_api = require('./routes/api/competition');
const path = require('path');
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
}));
connection.connect(err => {
    if (err) {
        console.log("Err", err);
    }
})

app.use('/public', express.static(__dirname + '/public/code'));  
app.use(express.static(__dirname + '/public/code')); 

// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://192.168.68.40:5000' }));
app.use(fileUpload());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/signup/', signup_apis);
app.use('/api/profile/', profile_apis);
app.use('/api/friends/', friends_apis);
app.use('/api/competition/', competition_api);
// app.listen(port, () => console.log("server Start on Port ", port))
server = http.listen('5000', () => {
    console.log("socket server is runniing")
})