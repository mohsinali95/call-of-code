const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../config/connection');
const fs=require('fs');



router.get('/:id', (req, res) => {
    connection.query(`SELECT p.level ,p.score,p.phone,p.profile_image,u.first_name,u.last_name,u.password, u.email , u.id as user_id FROM users u left join profile p on u.id=p.user_id where u.id=${req.params.id}`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});
router.get('/matchhistory/:id', (req, res) => {
    connection.query(`SELECT match_detail.id, questions.language,DATE_FORMAT(match_detail.created_at,'%d-%m-%Y') as date from match_detail 
    join player_detail on match_detail.id = player_detail.match_id
    join questions on questions.id = match_detail.question_id
    join users on users.id = player_detail.player
    WHERE users.id = ${req.params.id}`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});
router.get('/matchhistorydetail/:id', (req, res) => {
    connection.query(`
    SELECT evalutaion.*,users.id as User_id,users.first_name,users.last_name,match_detail.winner_id from match_detail  
    join player_detail on player_detail.match_id = match_detail.id
    join evalutaion on evalutaion.id = player_detail.evaluation_id
    join users on users.id = player_detail.player
    WHERE match_detail.id= ${req.params.id}`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});
router.get('/playerstat/:id', (req, res) => {
    connection.query(`
    select profile.level,profile.score,COUNT(match_detail.id) as match_played,COUNT(match_detail.winner_id) as winner from users
join profile on profile.user_id = users.id
join player_detail on player_detail.player = users.id
join match_detail on match_detail.id = player_detail.match_id
where users.id = ${req.params.id}`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});

router.post('/', (req, res) => {
    connection.query(`SELECT COUNT(*) as total FROM profile where user_id=${req.body.user_id}`, (error, result) => {

        if (error) {
            console.log("error", error)
            return res.send(error)
        }
        else {
            console.log("result", result[0].total)
            if (result[0].total == 0) {
                connection.query(`INSERT INTO profile(phone,user_id) VALUES('${req.body.phone}','${req.body.user_id}')`, (error, resul) => {
                    if (error) {
                        return res.send(error)
                    }
                    else {
                        console.log("resul", resul)
                    }
                })
            }
            else {
                connection.query(`UPDATE profile p inner join users u  ON p.user_id=u.id SET p.phone ='${req.body.phone}',u.first_name='${req.body.first_name}',u.last_name='${req.body.last_name}' where p.user_id=${req.body.user_id}`, (er, re) => {
                    if (er) {
                        console.log("er", er)
                        return re.send(er)
                    }
                    else {

                        console.log("re", re)
                        connection.query(`SELECT p.level, p.profile_image ,p.score,p.phone,u.first_name,u.last_name,u.password, u.email , u.id as user_id FROM users u left join profile p on u.id=p.user_id where u.id=${req.body.user_id}`, (erro, resu) => {
                            if (erro) {
                                return res.send(erro)
                            }
                            else {
                                console.log("resu", resu)
                                return res.send(resu)
                            }
                        })
                    }
                })
            }
        }
    })
})


router.post('/uploadimage', (req, res) => {

    var file =req.files.file;
    console.log("req.files 1",req.files);
    console.log("req.body.user_name",req.body.user_name);
    console.log("req.body.user_id",req.body.user_id);
    console.log("req.body.user_email",req.body.user_email);
    console.log("req.files 2",req.files.file.mimetype);
    console.log("req.files 2",req.files.file.name);
    let time=new Date().getTime();
    console.log("time",time)
    let profile_image=time+req.files.file.name;
    console.log("profile_image",profile_image)
    
    if(req.files.file.mimetype == "image/jpeg" ||req.files.file.mimetype == "image/png"||req.files.file.mimetype== "image/gif" ){
        let dir='client/public/images/upload_images/'+req.body.user_email+'/'
        console.log("dir",dir);
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        file.mv('client/public/images/upload_images/'+req.body.user_email+'/'+time+req.files.file.name, function(err) {
        if (err)
        return res.status(500).send(err);
           connection.query(`UPDATE profile SET profile_image='${profile_image}' where user_id=${req.body.user_id}`, (error, result) => {
            if (error) {
                return res.send(error)
            }
            else {
                
                console.log("restlut", result);

                connection.query(`SELECT p.level, p.profile_image ,p.score,p.phone,u.first_name,u.last_name,u.password, u.email , u.id as user_id FROM users u left join profile p on u.id=p.user_id where u.id=${req.body.user_id}`, (erro, resu) => {
                    if (erro) {
                        return res.send(erro)
                    }
                    else {
                        console.log("resu", resu)
                       
                        return res.send(resu)
                    }
                })
               
            }
        })
    
    })
        
    }

    })






module.exports = router;