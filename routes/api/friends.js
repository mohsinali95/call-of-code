const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../config/connection');
const axios = require('axios');
const cmd=require('node-cmd');


router.post('/request', (req, res) => {
    connection.query(`INSERT INTO friend_requests(sender_id,receiver_id,accepted) VALUES('${req.body.sender_id}','${req.body.receiver_id}',0)`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            connection.query(`SELECT u.id as user_id,u.first_name,u.email, u.last_name,p.profile_image from users u LEFT JOIN profile p on u.id = p.user_id where not u.id in (SELECT friend_requests.receiver_id from friend_requests WHERE friend_requests.sender_id=${req.body.sender_id}) and u.id not in (SELECT friend_requests.sender_id FROM friend_requests where friend_requests.receiver_id=${req.body.sender_id}) and not u.id=${req.body.sender_id} order by u.id `, (error, result) => {
                if (error) {
                    return res.send(error)
                }
                else {
                    return res.send(result)
                }
            })
        }
    })

})
router.post('/acceptRequest', (req, res) => {
    connection.query(`UPDATE friend_requests SET accepted = 1 where sender_id =${req.body.receiver_id} and receiver_id = ${req.body.sender_id} `, (updateError, updateResult) => {
        if (updateError) {
            res.send(updateError)
        } else {

            connection.query(`INSERT INTO friends (sender_id,receiver_id) VALUES (${req.body.sender_id},${req.body.receiver_id}),(${req.body.receiver_id},${req.body.sender_id})`, (insert_error, inser_result) => {
                if (insert_error) {
                    return res.send(insert_error)
                }
                else {
                    connection.query(`SELECT u.id AS user_id,u.email, u.first_name,u.last_name,p.profile_image FROM users u LEFT JOIN PROFILE p ON p.user_id=u.id WHERE u.id IN (SELECT sender_id FROM friend_requests f WHERE f.receiver_id =${req.body.sender_id} AND f.accepted=0)`, (error, result) => {
                        if (error) {
                            return res.send(error)
                        }
                        else {
                            connection.query(`SELECT u.id AS user_id, u.email, u.first_name,u.last_name,p.profile_image FROM users u LEFT JOIN PROFILE p ON p.user_id=u.id WHERE u.id IN (SELECT receiver_id FROM friend_requests f WHERE f.sender_id=${req.body.sender_id} AND f.accepted=0)`, (erro, resu) => {
                                if (erro) {
                                    return res.send(erro)
                                }
                                else {
                                    return res.send({ from: resu, to: result })
                                }
                            })
                        }

                    })
                }
            })
        }
    })
})

router.post('/runprogram', (req, res) => {
    axios.post('https://api.jdoodle.com/execute', req.body[0]) 
        .then(result => {
            code_anal(req.body[0].script,req.body[1]);
            res.send(result.data)
        })
})

async function code_anal(code,user){
    var filePath = 'public/code/'+user.first_name+'_'+user.last_name+'/';
    
    // if(!fs.existsSync(filePath))
    //     fs.mkdirSync(filePath);
    // filePath+='_'+Date.now()+''+user.first_name+'_'+user.last_name+'coc.js'
    // await fs.writeFile(filePath, code , function (err) {
    //         if (err)  console.log(err);
    //         console.log('saved')
    // });
    await cmd.get('pmd -d public/code/code.js -f xml -R category/ecmascript/errorprone.xml/EqualComparison ',
        function(err, data, stderr){
            console.log("daatta",data)
        }
    )
    await cmd.get('lizard public/code/data.js',
        function(err, data, stderr){
            console.log("daatta",data)
        }
    )
}

router.delete('/cancelRequest/:sender_id/:receiver_id', (req, res) => {
    connection.query(`DELETE FROM friend_requests where (sender_id=${req.params.sender_id} and receiver_id=${req.params.receiver_id}) or (sender_id=${req.params.receiver_id} and receiver_id=${req.params.sender_id}) `, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {

            connection.query(`SELECT u.id as user_id,u.email,u.first_name,u.last_name,p.profile_image,f.accepted FROM friend_requests f RIGHT join users u on u.id=f.sender_id right join profile p on p.user_id=f.receiver_id where f.receiver_id=${req.params.sender_id} and f.accepted=0`, (error, result) => {
                if (error) {
                    return res.send(error)
                }
                else {
                    connection.query(`SELECT u.id as user_id,u.email,u.first_name,u.last_name,p.profile_image,f.accepted FROM friend_requests f RIGHT join users u on u.id=f.receiver_id right join profile p on p.user_id=f.sender_id where f.sender_id=${req.params.sender_id} and f.accepted=0`, (erro, resu) => {
                        if (erro) {
                            return res.send(erro)
                        }
                        else {
                            return res.send({ from: result, to: resu })
                        }
                    })
                }
            })
        }
    })
})

router.get('/friendRequests/:id', (req, res) => {

    connection.query(`SELECT u.email, u.id AS user_id, u.first_name,u.last_name,p.profile_image FROM users u LEFT JOIN PROFILE p ON p.user_id=u.id WHERE u.id IN (SELECT sender_id FROM friend_requests f WHERE f.receiver_id =${req.params.id} AND f.accepted=0)`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            connection.query(`SELECT u.id AS user_id, u.first_name,u.last_name,u.email,p.profile_image FROM users u LEFT JOIN PROFILE p ON p.user_id=u.id WHERE u.id IN (SELECT receiver_id FROM friend_requests f WHERE f.sender_id=${req.params.id} AND f.accepted=0)`, (erro, resu) => {
                if (erro) {
                    return res.send(erro)
                }
                else {
                    return res.send({ from: result, to: resu })
                }
            })
        }
    })
});
router.get('/getFriends/:id', (req, res) => {

    connection.query(`SELECT u.email, u.first_name,u.last_name,u.id as user_id, p.profile_image from users u LEFT JOIN profile p on u.id = p.user_id where not u.id in (SELECT friend_requests.receiver_id from friend_requests WHERE friend_requests.sender_id=${req.params.id}) and u.id not in (SELECT friend_requests.sender_id FROM friend_requests where friend_requests.receiver_id=${req.params.id}) and not u.id=${req.params.id} order by u.id `, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});


router.get('/Myfriends/:id', (req, res) => {
    connection.query(`SELECT u.email, u.id AS user_id ,CONCAT(u.first_name," ",u.last_name) as user_name,p.profile_image  FROM users u LEFT JOIN friends f on u.id=f.receiver_id LEFT JOIN profile p on p.user_id=f.receiver_id WHERE f.sender_id=${req.params.id}`,(error,result)=>{
        if(error){
            return res.send(error)
        }
        else{
            return res.send(result)
        }
    })
})

router.delete('/Removefriends/:me_id/:remove_friend_id', (req, res) => {
    connection.query(`DELETE friend_requests , friends FROM friend_requests INNER Join friends where ((friend_requests.sender_id=${req.params.me_id} and friend_requests.receiver_id=${req.params.remove_friend_id}) or (friend_requests.sender_id=${req.params.remove_friend_id} and friend_requests.receiver_id=${req.params.me_id}))
     and ((friends.sender_id=${req.params.me_id} and friends.receiver_id=${req.params.remove_friend_id}) or (friends.sender_id=${req.params.remove_friend_id} and friends.receiver_id=${req.params.me_id}))
    `, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else{
            connection.query(`SELECT u.email, u.id AS user_id ,CONCAT(u.first_name," ",u.last_name) as user_name,p.profile_image  FROM users u LEFT JOIN friends f on u.id=f.receiver_id LEFT JOIN profile p on p.user_id=f.receiver_id WHERE f.sender_id=${req.params.id}`,(erro,ress)=>{
                if(erro){
                    return res.send(erro)
                }
                else{
                    return res.send(ress)
                }
            })
            
        }
    })
})

module.exports = router;




// function test(){
//     var a = 3;
//     if(a == 3){
//         print('mohsin')
//     }else{
//         print('ali')
//     }
// }

// test();