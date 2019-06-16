const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../config/connection');
const axios = require('axios');
var parseString = require('xml2js').parseString;
const cmd = require('node-cmd');
const fs = require('fs')

router.post('/startCompetiton', (req, res) => {

    // connection.query(`SELECT * FROM questions where questions.difficulty = '${req.body.language}'`,(quesErr, quesRes)=>{
    //     if(quesErr) res.send(quesErr)
    //     let quesLen = quesRes.length;
    //     let random = Math.floor(Math.random() * Math.floor(quesLen));
    //     connection.query(`INSERT INTO match_detail(question_id) value(${quesRes[random].id})`,(insertErr, insertRes) => {
    //         if(insertErr) res.send(insertErr)
    //         res.send({matchId: insertRes.insertId, senderId: req.body.sender_id})
    //     })
    // })

})


router.post('/runprogram', (req, res) => {
    console.log(req.body)
    axios.post('https://api.jdoodle.com/execute', req.body[0])
        .then(result => {
            if (req.body[1].type == "run") {
                res.send(result.data)
            } else if (req.body[1].type == "submit") {
                code_anal(req.body[0].script, req.body[1], result.data)
                res.send(result.data)
            }
        })
})


function code_anal(code, user, result) {
    var filePath = 'public/code/' + user.first_name + '_' + user.last_name + '/';
    var language = user.language;
    var ext = '';
    var ruleSet = '';

    if (language == "js") {
        ext = '.js'
        ruleSet = 'category/ecmascript/bestpractices.xml/UseBaseWithParseInt,category/ecmascript/errorprone.xml/EqualComparison,category/ecmascript/errorprone.xml/InnaccurateNumericLiteral,category/ecmascript/bestpractices.xml/AvoidWithStatement,category/ecmascript/bestpractices.xml/ConsistentReturn,category/ecmascript/bestpractices.xml/GlobalVariable,category/ecmascript/bestpractices.xml/ScopeForInVariable'
    } else if (language == "java") {
        ext = '.java'
        ruleSet = 'category/java/bestpractices.xml/UseCollectionIsEmpty,category/java/bestpractices.xml/UnusedPrivateMethod,category/java/bestpractices.xml/UnusedPrivateField,category/java/bestpractices.xml/UnusedLocalVariable,category/java/bestpractices.xml/SwitchStmtsShouldHaveDefault,category/java/bestpractices.xml/PositionLiteralsFirstInComparisons,category/java/bestpractices.xml/OneDeclarationPerLine,category/java/bestpractices.xml/MissingOverride,category/java/bestpractices.xml/MethodReturnsInternalArray,category/java/bestpractices.xml/DefaultLabelNotLastInSwitchStmt,category/java/bestpractices.xml/AvoidUsingHardCodedIP,category/java/bestpractices.xml/AvoidReassigningParameters,category/java/bestpractices.xml/AvoidPrintStackTrace,category/java/bestpractices.xml/ArrayIsStoredDirectly,category/java/bestpractices.xml/AbstractClassWithoutAbstractMethod,category/java/bestpractices.xml/AccessorClassGeneration';
    } else if (language == "C") {
        ext = '.cpp'
    }

    if (!fs.existsSync(filePath))
        fs.mkdirSync(filePath);
    filePath += '_' + Date.now() + '' + user.first_name + '_' + user.last_name + 'coc' + ext;
    fs.writeFileSync(filePath, code, function (err) {
        if (err) console.log(err);
        console.log('saved')
    });

    cmd.get(`pmd -d ${filePath} -f xml -R ${ruleSet} `, (err, pmdData, stderr) => {
        cmd.get(`lizard --xml ${filePath}`, (err, lizData, stderr) => {
            var arr = [];
            var loc = 0;
            var ccn = 0;
            var pmdCount = 0;
            parseString(pmdData, function (err, result) {
                if (result.pmd.file != undefined) {
                    for (var i = 0; i < result.pmd.file[0].violation.length; i++) {
                        arr.push({ Rule: result.pmd.file[0].violation[i].$.rule })
                    }
                }
            });
            pmdCount = arr.length
            parseString(lizData, function (err, result) {
                if (result.cppncss.measure[0] != undefined) {
                    loc = result.cppncss.measure[0].average[0].$.value
                    ccn = result.cppncss.measure[0].average[1].$.value
                }
            });
            var a = JSON.stringify(arr);
            connection.query(`INSERT INTO evalutaion(complexity,pmd,loc,pmdCount,output,memory,cpuTime) VALUES (${ccn},'${a}',${loc},${pmdCount},'${result.output}',${result.memory},${result.cpuTime})`, (insErr, insRes) => {
                if (insErr) console.log(insErr)
                connection.query(`INSERT INTO player_detail(player,match_id,evaluation_id) VALUES(${user.userid},${user.matchId},${insRes.insertId})`, (playerInsErr, playerInsRes) => {
                    if (playerInsErr) console.log(playerInsErr)

                })
            })
        })
    }
    )

}

var arr = [];
router.post('/runAlgo', (req, res) => {
    console.log(req.body)
    connection.query(`SELECT COUNT(match_id) as total FROM player_detail WHERE player_detail.match_id = ${req.body.matchId}`, (countErr, countRes) => {
        if (countErr) console.log(countErr)
        if (countRes[0].total == 2) {
            connection.query(`SELECT * from player_detail JOIN evalutaion on evalutaion.id = player_detail.evaluation_id WHERE player_detail.match_id = ${req.body.matchId}`, (selectErr, selectRes) => {
                if (selectErr) console.log(selectErr)
                console.log(selectRes[0])
                console.log(selectRes[1])
                var current = 1;
                
                var current2 = 2;
                var totalPlayers = 2;

                var ob = {
                    compileTime: selectRes[0].cpuTime,
                    memoryUsed: selectRes[0].memory,
                    cpuUsed: 0,
                    complexity: selectRes[0].complexity,
                    cpd: 1,
                    smellyCode: selectRes[0].pmdCount,
                    position: 1,
                    submitTime: 120
                }
                var ob1 = {
                    compileTime: selectRes[1].cpuTime,
                    memoryUsed: selectRes[1].memory,
                    cpuUsed: 0,
                    complexity: selectRes[1].complexity,
                    cpd: 1,
                    smellyCode: selectRes[1].pmdCount,
                    position: 2,
                    submitTime: 120
                }
                var obj={
                    current:current,
                    totalPlayers:2,
                    player1:ob,
                    player2:ob1
                }
                var obj2={
                    current:current2,
                    totalPlayers:2,
                    player1:ob,
                    player2:ob1
                }
               var player1Score= Algo(obj);
               var totalScorePlayer1=0;
               totalScorePlayer1=player1Score.complexity+player1Score.cpd+player1Score.smellyCode+player1Score.compileTime+player1Score.memoryUsed+player1Score.cpuUsed+player1Score.submitTime;
               var player2Score= Algo(obj2);
               var totalScorePlayer2=0;
               totalScorePlayer2=player2Score.complexity+player2Score.cpd+player2Score.smellyCode+player2Score.compileTime+player2Score.memoryUsed+player2Score.cpuUsed+player2Score.submitTime;

               connection.query(`UPDATE evalutaion SET score_complexity = ${player1Score.complexity}
               , score_cpd = ${player1Score.cpd}, score_smellyCode = ${player1Score.smellyCode},
               score_compileTime = ${player1Score.compileTime}, score_memoryUsed = ${player1Score.memoryUsed},
               score_cpuUsed = ${player1Score.cpuUsed}, score_submitTime = ${player1Score.submitTime}, match_score = ${totalScorePlayer1}
               where evalutaion.id = ${selectRes[0].evaluation_id}`,(updateErr,updateIns)=>{
                    if(updateErr) console.log(updateErr)
                    // console.log(updateIns)
               })

               connection.query(`UPDATE evalutaion SET score_complexity = ${player2Score.complexity}
               , score_cpd = ${player2Score.cpd}, score_smellyCode = ${player2Score.smellyCode},
               score_compileTime = ${player2Score.compileTime}, score_memoryUsed = ${player2Score.memoryUsed},
               score_cpuUsed = ${player2Score.cpuUsed}, score_submitTime = ${player2Score.submitTime}, match_score = ${totalScorePlayer2}
               where evalutaion.id = ${selectRes[1].evaluation_id}`,(updateErr,updateIns)=>{
                    if(updateErr) console.log(updateErr)
                    // console.log(updateIns)
               })

               var winner = 0
               if(totalScorePlayer1 > totalScorePlayer2 ){
                    winner = selectRes[0].player
               }else{
                   winner = selectRes[1].player
               }

               connection.query(`UPDATE match_detail set winner_id = ${winner} where match_detail.id = ${selectRes[0].match_id}`,(updateErr,updateIns)=>{
                    if(updateErr) console.log(updateErr)
                    // console.log(updateIns)
               })
               connection.query(`SELECT profile.score from profile where profile.user_id = ${selectRes[0].player}`,(selectErr,selectIns)=>{
                   if(selectErr) console.log(selectErr)
                   var score = selectIns[0].score
                   score+=totalScorePlayer1
                   var level = parseInt(score/100);
                    connection.query(`UPDATE profile set score = ${score}, level = ${level} where profile.user_id = ${selectRes[0].player}`)                   
               })
               connection.query(`SELECT profile.score from profile where profile.user_id = ${selectRes[1].player}`,(selectErr,selectIns)=>{
                   if(selectErr) console.log(selectErr)
                   var score = selectIns[0].score
                   score+=totalScorePlayer2
                   var level = parseInt(score/100);
                    connection.query(`UPDATE profile set score = ${score}, level = ${level} where profile.user_id = ${selectRes[0].player}`)                   
               })
            })


        }
    })

})

function Algo(body){
    const playerDetails = {};
  const score = {};
    playerDetails.totalPlayers = parseInt(body.totalPlayers);
    playerDetails.errorMessage = body.errorMessage;
  
    // Set the objects according to toal players 4
    if (playerDetails.totalPlayers === 4) {
      playerDetails.compileTime = {
        player1: parseFloat(body.player1.compileTime),
        player2: parseFloat(body.player2.compileTime),
        player3: parseFloat(body.player3.compileTime),
        player4: parseFloat(body.player4.compileTime)
      };
  
      playerDetails.memoryUsed = {
        player1: parseFloat(body.player1.memoryUsed),
        player2: parseFloat(body.player2.memoryUsed),
        player3: parseFloat(body.player3.memoryUsed),
        player4: parseFloat(body.player4.memoryUsed)
      };
  
      playerDetails.cpuUsed = {
        player1: parseFloat(body.player1.cpuUsed),
        player2: parseFloat(body.player2.cpuUsed),
        player3: parseFloat(body.player3.cpuUsed),
        player4: parseFloat(body.player4.cpuUsed)
      };
  
      playerDetails.submitTime = {
        player1: parseFloat(body.player1.submitTime),
        player2: parseFloat(body.player2.submitTime),
        player3: parseFloat(body.player3.submitTime),
        player4: parseFloat(body.player4.submitTime)
      };
    }
    // Set the objects according to toal players 3
    if (playerDetails.totalPlayers === 3) {
      playerDetails.compileTime = {
        player1: parseFloat(body.player1.compileTime),
        player2: parseFloat(body.player2.compileTime),
        player3: parseFloat(body.player3.compileTime)
      };
  
      playerDetails.memoryUsed = {
        player1: parseFloat(body.player1.memoryUsed),
        player2: parseFloat(body.player2.memoryUsed),
        player3: parseFloat(body.player3.memoryUsed)
      };
  
      playerDetails.cpuUsed = {
        player1: parseFloat(body.player1.cpuUsed),
        player2: parseFloat(body.player2.cpuUsed),
        player3: parseFloat(body.player3.cpuUsed)
      };
  
      playerDetails.submitTime = {
        player1: parseFloat(body.player1.submitTime),
        player2: parseFloat(body.player2.submitTime),
        player3: parseFloat(body.player3.submitTime)
      };
    }
    // Set the objects according to toal players 2
    if (playerDetails.totalPlayers === 2) {
      playerDetails.compileTime = {
        player1: parseFloat(body.player1.compileTime),
        player2: parseFloat(body.player2.compileTime)
      };
  
      playerDetails.memoryUsed = {
        player1: parseFloat(body.player1.memoryUsed),
        player2: parseFloat(body.player2.memoryUsed)
      };
  
      playerDetails.cpuUsed = {
        player1: parseFloat(body.player1.cpuUsed),
        player2: parseFloat(body.player2.cpuUsed)
      };
  
      playerDetails.submitTime = {
        player1: parseFloat(body.player1.submitTime),
        player2: parseFloat(body.player2.submitTime)
      };
    }
  
    // For direct data in request
    // playerDetails.complexity = parseFloat(body.complexity);
    // playerDetails.cpd = parseFloat(body.cpd);
    // playerDetails.smellyCode = parseFloat(body.smellyCode);
    // playerDetails.position = parseFloat(body.position);
  
    // For current player according to position
    const current = body.current;
    const currentPlayer = {};
    if (current == 1) {
      currentPlayer.compileTime = playerDetails.compileTime.player1;
      currentPlayer.memoryUsed = playerDetails.memoryUsed.player1;
      currentPlayer.cpuUsed = playerDetails.cpuUsed.player1;
      currentPlayer.submitTime = playerDetails.submitTime.player1;
  
      playerDetails.complexity = parseFloat(body.player1.complexity);
      playerDetails.cpd = parseFloat(body.player1.cpd);
      playerDetails.smellyCode = parseFloat(body.player1.smellyCode);
      playerDetails.position = parseFloat(body.player1.position);
    }
    if (current == 2) {
      currentPlayer.compileTime = playerDetails.compileTime.player2;
      currentPlayer.memoryUsed = playerDetails.memoryUsed.player2;
      currentPlayer.cpuUsed = playerDetails.cpuUsed.player2;
      currentPlayer.submitTime = playerDetails.submitTime.player2;
  
      playerDetails.complexity = parseFloat(body.player2.complexity);
      playerDetails.cpd = parseFloat(body.player2.cpd);
      playerDetails.smellyCode = parseFloat(body.player2.smellyCode);
      playerDetails.position = parseFloat(body.player2.position);
    }
    if (current == 3) {
      currentPlayer.compileTime = playerDetails.compileTime.player3;
      currentPlayer.memoryUsed = playerDetails.memoryUsed.player3;
      currentPlayer.cpuUsed = playerDetails.cpuUsed.player3;
      currentPlayer.submitTime = playerDetails.submitTime.player3;
  
      playerDetails.complexity = parseFloat(body.player3.complexity);
      playerDetails.cpd = parseFloat(body.player3.cpd);
      playerDetails.smellyCode = parseFloat(body.player3.smellyCode);
      playerDetails.position = parseFloat(body.player3.position);
    }
    if (current == 4) {
      currentPlayer.compileTime = playerDetails.compileTime.player4;
      currentPlayer.memoryUsed = playerDetails.memoryUsed.player4;
      currentPlayer.cpuUsed = playerDetails.cpuUsed.player4;
      currentPlayer.submitTime = playerDetails.submitTime.player4;
  
      playerDetails.complexity = parseFloat(body.player4.complexity);
      playerDetails.cpd = parseFloat(body.player4.cpd);
      playerDetails.smellyCode = parseFloat(body.player4.smellyCode);
      playerDetails.position = parseFloat(body.player4.position);
    }
    playerDetails.currentPlayer = currentPlayer;
  
    // res.json(playerDetails);
  
    // Score according to player position
    if (playerDetails.totalPlayers === 4) {
      if (playerDetails.position === playerDetails.totalPlayers) {
        score.position = 10;
      }
      if (playerDetails.position === playerDetails.totalPlayers - 1) {
        score.position = 20;
      }
      if (playerDetails.position === playerDetails.totalPlayers - 2) {
        score.position = 30;
      }
      if (playerDetails.position === playerDetails.totalPlayers - 3) {
        score.position = 40;
      }
    }
    if (playerDetails.totalPlayers === 3) {
      if (playerDetails.position === playerDetails.totalPlayers - 1) {
        score.position = 20;
      }
      if (playerDetails.position === playerDetails.totalPlayers - 2) {
        score.position = 30;
      }
      if (playerDetails.position === playerDetails.totalPlayers - 3) {
        score.position = 40;
      }
    }
    if (playerDetails.totalPlayers === 2) {
      if (playerDetails.position === playerDetails.totalPlayers - 2) {
        score.position = 30;
      }
      if (playerDetails.position === playerDetails.totalPlayers - 3) {
        score.position = 40;
      }
    }
  
    // Display the error message
    if (playerDetails.errorMessage) {
      score.errorMessage = playerDetails.errorMessage;
    }
  
    // Score according to complexity
    if (playerDetails.complexity <= 10) {
      score.complexity = 40;
    }
    if (playerDetails.complexity <= 20 && playerDetails.complexity > 10) {
      score.complexity = 30;
    }
    if (playerDetails.complexity <= 50 && playerDetails.complexity > 20) {
      score.complexity = 20;
    }
    if (playerDetails.complexity > 50) {
      score.complexity = 10;
    }
  
    // Score according copy paste
    if (playerDetails.cpd === 0) {
      score.cpd = 30;
    }
    if (playerDetails.cpd !== 0) {
      score.cpd = -playerDetails.cpd * 5;
    }
  
    // Score according smelly code
    if (playerDetails.smellyCode === 0.0) {
      score.smellyCode = 30;
    }
    if (playerDetails.smellyCode !== 0) {
      score.smellyCode = -playerDetails.smellyCode * 10;
    }
  
    // Score according to compile time and array is set according to total plyers
    if (playerDetails.totalPlayers === 4) {
      const compileTimeArr = [
        playerDetails.compileTime.player1,
        playerDetails.compileTime.player2,
        playerDetails.compileTime.player3,
        playerDetails.compileTime.player4
      ];
      let compileTimeArrSort = compileTimeArr.sort((a, b) => {
        return b - a;
      });
      let compileScore = compileTimeArrSort.indexOf(currentPlayer.compileTime);
      score.compileTime = (compileScore + 1) * 10;
    }
    if (playerDetails.totalPlayers === 3) {
      const compileTimeArr = [
        playerDetails.compileTime.player1,
        playerDetails.compileTime.player2,
        playerDetails.compileTime.player3
      ];
      let compileTimeArrSort = compileTimeArr.sort((a, b) => {
        return b - a;
      });
      let compileScore = compileTimeArrSort.indexOf(currentPlayer.compileTime);
      score.compileTime = (compileScore + 2) * 10;
    }
    if (playerDetails.totalPlayers === 2) {
      const compileTimeArr = [
        playerDetails.compileTime.player1,
        playerDetails.compileTime.player2
      ];
      let compileTimeArrSort = compileTimeArr.sort((a, b) => {
        return b - a;
      });
      let compileScore = compileTimeArrSort.indexOf(currentPlayer.compileTime);
      score.compileTime = (compileScore + 3) * 10;
    }
  
    // Score according to memory used and array is set according to total plyers
    if (playerDetails.totalPlayers === 4) {
      const memoryUsedArr = [
        playerDetails.memoryUsed.player1,
        playerDetails.memoryUsed.player2,
        playerDetails.memoryUsed.player3,
        playerDetails.memoryUsed.player4
      ];
      let memoryUsedArrSort = memoryUsedArr.sort((a, b) => {
        return b - a;
      });
      let memoryScore = memoryUsedArrSort.indexOf(currentPlayer.memoryUsed);
      score.memoryUsed = (memoryScore + 1) * 10;
    }
    if (playerDetails.totalPlayers === 3) {
      const memoryUsedArr = [
        playerDetails.memoryUsed.player1,
        playerDetails.memoryUsed.player2,
        playerDetails.memoryUsed.player3
      ];
      let memoryUsedArrSort = memoryUsedArr.sort((a, b) => {
        return b - a;
      });
      let memoryScore = memoryUsedArrSort.indexOf(currentPlayer.memoryUsed);
      score.memoryUsed = (memoryScore + 2) * 10;
    }
    if (playerDetails.totalPlayers === 2) {
      const memoryUsedArr = [
        playerDetails.memoryUsed.player1,
        playerDetails.memoryUsed.player2
      ];
      let memoryUsedArrSort = memoryUsedArr.sort((a, b) => {
        return b - a;
      });
      let memoryScore = memoryUsedArrSort.indexOf(currentPlayer.memoryUsed);
      score.memoryUsed = (memoryScore + 3) * 10;
    }
  
    // Score according to cpu used and array is set according to total plyers
    if (playerDetails.totalPlayers === 4) {
      const cpuUsedArr = [
        playerDetails.cpuUsed.player1,
        playerDetails.cpuUsed.player2,
        playerDetails.cpuUsed.player3,
        playerDetails.cpuUsed.player4
      ];
      let cpuUsedArrSort = cpuUsedArr.sort((a, b) => {
        return b - a;
      });
      let cpuScore = cpuUsedArrSort.indexOf(currentPlayer.cpuUsed);
      score.cpuUsed = (cpuScore + 1) * 10;
    }
    if (playerDetails.totalPlayers === 3) {
      const cpuUsedArr = [
        playerDetails.cpuUsed.player1,
        playerDetails.cpuUsed.player2,
        playerDetails.cpuUsed.player3
      ];
      let cpuUsedArrSort = cpuUsedArr.sort((a, b) => {
        return b - a;
      });
      let cpuScore = cpuUsedArrSort.indexOf(currentPlayer.cpuUsed);
      score.cpuUsed = (cpuScore + 2) * 10;
    }
    if (playerDetails.totalPlayers === 2) {
      const cpuUsedArr = [
        playerDetails.cpuUsed.player1,
        playerDetails.cpuUsed.player2
      ];
      let cpuUsedArrSort = cpuUsedArr.sort((a, b) => {
        return b - a;
      });
      let cpuScore = cpuUsedArrSort.indexOf(currentPlayer.cpuUsed);
      score.cpuUsed = (cpuScore + 3) * 10;
    }
  
    // Score according to submit time and array is set according to total plyers
    if (playerDetails.totalPlayers === 4) {
      const submitTimeArr = [
        playerDetails.submitTime.player1,
        playerDetails.submitTime.player2,
        playerDetails.submitTime.player3,
        playerDetails.submitTime.player4
      ];
      let submitTimeArrSort = submitTimeArr.sort((a, b) => {
        return b - a;
      });
      let submitScore = submitTimeArrSort.indexOf(currentPlayer.submitTime);
      score.submitTime = (submitScore + 1) * 10;
    }
    if (playerDetails.totalPlayers === 3) {
      const submitTimeArr = [
        playerDetails.submitTime.player1,
        playerDetails.submitTime.player2,
        playerDetails.submitTime.player3
      ];
      let submitTimeArrSort = submitTimeArr.sort((a, b) => {
        return b - a;
      });
      let submitScore = submitTimeArrSort.indexOf(currentPlayer.submitTime);
      score.submitTime = (submitScore + 2) * 10;
    }
    if (playerDetails.totalPlayers === 2) {
      const submitTimeArr = [
        playerDetails.submitTime.player1,
        playerDetails.submitTime.player2
      ];
      let submitTimeArrSort = submitTimeArr.sort((a, b) => {
        return b - a;
      });
      let submitScore = submitTimeArrSort.indexOf(currentPlayer.submitTime);
      score.submitTime = (submitScore + 3) * 10;
    }
  
   return score; 
 }


module.exports = router;