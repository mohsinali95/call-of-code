const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../config/connection');


router.get('/:id', (req, res) => {
    connection.query(`SELECT * FROM userimage where id=${req.params.id}`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});


router.post('/', (req, res) => {
    var file = req.files.file;
    console.log("req.files 1", req.files);
    console.log("req.files 2", req.files.file.mimetype);
    console.log("req.files 2", req.files.file.name);
    if (req.files.file.mimetype == "image/jpeg" || req.files.file.mimetype == "image/png" || req.files.file.mimetype == "image/gif") {
        file.mv('public/images/upload_images/' + req.files.file.name, function (err) {
            if (err)
                return res.status(500).send(err);
            connection.query(`INSERT INTO userimage(name,image) VALUES('${req.files.file.name}','${req.files.file.name}')`, (error, result) => {
                if (error) {
                    return res.send(error)
                }
                else {
                    console.log("restlut", result);
                }
            })
        })
    }
})


module.exports = router;