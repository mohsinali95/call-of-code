const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../config/connection');
const { check, validationResult } = require('express-validator/check')
const session = require('express-session')
const socket = require('../../server');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    connection.query("SELECT * FROM users", (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});
router.get('/checkSession', (req, res) => {
    if (req.session.user) {
        res.json({ msg: req.session.user, isLogin: true })
    } else {
        res.json({ isLogin: false })
    }
});

router.get('/logout', (req, res) => {
    
    res.json({ isLogin: false })
});


router.post('/',
    [check('first_name').not().isEmpty(),
    check('last_name').not().isEmpty(),
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('password').isLength({ min: 6 })
    ], (req, res) => {
        const checkerror = validationResult(req);
        if (!checkerror.isEmpty()) {
            return res.send({ error: checkerror.array() })
            console.log('erre', checkerror)
        }
        else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {console.log(hash)
                   if(err) console.log(err);
                   else{
                        connection.query(`INSERT INTO users(first_name,last_name,email,password) VALUES('${req.body.first_name}','${req.body.last_name}','${req.body.email}','${hash}')`, (error, result) => {
                            if (error) {
                                return res.send(error)
                            }
                            else {
                                connection.query(`SELECT * FROM users where id=${result.insertId} `, (er, resu) => {
                                    if (er) {
                                        console.log("er", er);
                                    }
                                    else {
                                        return res.json({ msg: resu[0], error: [], success: true })
                                    }
                                })
                            }
                        })
                   }
                });
            });
        }
    })
router.post('/login',
    [
        check('lEmail').isEmail().withMessage('Invalid Email.'),
        check('lPassword').isLength({ min: 6 }).withMessage('Passowor must be at least 6 characters long')
    ], (req, res) => {
        const checkerror = validationResult(req);
        if (!checkerror.isEmpty()) {
            return res.send({ msg: undefined, error: checkerror.array() })
        }
        else {
            connection.query(`SELECT u.email, u.password,u.first_name,u.last_name,u.id,p.profile_image FROM  users u LEFT JOIN profile p ON u.id=p.user_id where email='${req.body.lEmail}'`, (error, result) => {
                if (error) {
                    return res.send(error)
                }
                else {
                    if (result.length > 0) {
                        bcrypt.compare(req.body.lPassword, result[0].password, function(err, respo) {
                            if(respo === true){
                                return res.send({ msg: result[0], error: '', isLogin: true })
                            }else{
                                return res.send({ error: [{ msg: "Email or Password is incorrect", param: 'query_error' }], msg: undefined, success: false })
                            }
                        });
                    }
                    else {
                        return res.send({ error: [{ msg: "Email or Password is incorrect", param: 'query_error' }], msg: undefined, success: false })
                    }
                }
            })
        }
    })

module.exports = router;