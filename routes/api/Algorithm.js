
function Algo(body){
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
  if (playerDetails.smellyCode === 0) {
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

