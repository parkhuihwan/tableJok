var fs = require('fs');
fs.readFile('./recordJok.txt', 'utf8', function(err, totalRecord){
  //console.log(totalRecord);

  const WIN = 1;
  const PLAY = 1;
  const LOSE = 2;
  const NOSHOW = 0;

  const PLAYER_NUM=7;
  const PLAYER_INDEX = ["커두", "푸름", "바키", "서재", "강산", "영쿠", "빵길", "오범", "준형", "손민", "민우", "홍", "한", "고", "진호", "승훈", "박준", "태"];   
  const INDEX_FROM_PLAYER = {"커두":0, "푸름":1, "바키":2, "서재":3, "강산":4, "영쿠":5, "빵길":6, "오범":7, "준형":8, "손민":9, "민우":10, "홍":11, "한":12, "고":13, "진호":14, "승훈":15, "박준":16, "태":17};

  const MOST_NUM=5;
  const COMBINATIONS_OF_PLAYER = [
    ["푸름", "바키", "커두"],
    ["푸름", "바키", "서재"],
    ["푸름", "바키", "강산"],
    ["푸름", "바키", "영쿠"],
    ["푸름", "바키", "빵길"],
    ["푸름", "커두", "서재"],
    ["푸름", "커두", "강산"],
    ["푸름", "커두", "영쿠"],
    ["푸름", "커두", "빵길"],
    ["푸름", "서재", "강산"],
    ["푸름", "서재", "영쿠"],
    ["푸름", "서재", "빵길"],
    ["푸름", "강산", "영쿠"],
    ["푸름", "강산", "빵길"],
    ["푸름", "영쿠", "빵길"],
    ["바키", "커두", "서재"],
    ["바키", "커두", "강산"],
    ["바키", "커두", "영쿠"],
    ["바키", "커두", "빵길"],
    ["바키", "서재", "강산"],
    ["바키", "서재", "영쿠"],
    ["바키", "서재", "빵길"],
    ["바키", "강산", "영쿠"],
    ["바키", "강산", "빵길"],
    ["바키", "영쿠", "빵길"],
    ["커두", "서재", "강산"],
    ["커두", "서재", "영쿠"],
    ["커두", "서재", "빵길"],
    ["커두", "강산", "영쿠"],
    ["커두", "강산", "빵길"],
    ["커두", "영쿠", "빵길"],
    ["서재", "강산", "영쿠"],
    ["서재", "강산", "빵길"],
    ["서재", "영쿠", "빵길"],
    ["강산", "영쿠", "빵길"],
  ];
  let statsFromCombi = [
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
    {
      wins: 0,
      loses: 0,
    },
  ]
  let pointCombi = {
    mostWinCombi: [],
    mostWinRateCombi: [],
    mostLoseCombi: [],
    mostLoseRateCombi: [],
  }

  let recordArray = totalRecord.split('\r\n\r\n');
  //console.log(JSON.stringify(recordArray));


  //판:10 커두:5 홍:10 서재:4(7) 강산:7 푸름:4 영쿠:3 태:4 바키:3
  //커두 홍 서재 강산/바키 영쿠 태 푸름

  let eachDayStr = [];
  for(let i = 0; i < recordArray.length; i++) {
    eachDayStr[i] = recordArray[i].split('\r\n');
  }
  
  let eachDayObj = [];
  for(let day = 0; day < eachDayStr.length; day++) {

    eachDayObj[day] = {
      str: eachDayStr[day][0],
      members: [],
      total: 0,
      match: [],
    };
    eachDayObj[day].total = eachDayStr[day][0].split(' ')[0].split(':')[1];

    for(let i = 1; i < eachDayStr[day][0].split(' ').length; i++) {
      eachDayObj[day].members[INDEX_FROM_PLAYER[eachDayStr[day][0].split(' ')[i].split(':')[0]]] = PLAY;
    }

    for(let matchIndex = 1; matchIndex < eachDayStr[day].length; matchIndex++) {
      //console.log(matchIndex);
      let match = {
        win: eachDayStr[day][matchIndex].split('/')[1].split(' '),
        winNum: eachDayStr[day][matchIndex].split('/')[1].split(' ').length,
        lose: eachDayStr[day][matchIndex].split('/')[0].split(' '),
        loseNum: eachDayStr[day][matchIndex].split('/')[0].split(' ').length,
        members: {
          "커두": NOSHOW, // 0:불참, 1:승, 2:패, undefined:불참
          "푸름": NOSHOW,
          "바키": NOSHOW,
          "서재": NOSHOW,
          "강산": NOSHOW,
          "영쿠": NOSHOW,
          "빵길": NOSHOW,
          "오범": NOSHOW,
          "준형": NOSHOW,
          "민우": NOSHOW,
          "홍": NOSHOW,
          "한": NOSHOW,
          "고": NOSHOW,
          "진호": NOSHOW,
          "승훈": NOSHOW,
          "박준": NOSHOW,
          "태": NOSHOW,
        },
      }
      for(let i = 0; i < match.winNum; i++)
        match.members[match.win[i]] = WIN;
        
      for(let i = 0; i < match.loseNum; i++)
        match.members[match.lose[i]] = LOSE; 

      eachDayObj[day].match.push(match);
    }
  }

console.log("\n\n\n");
  let players = {
    '바키':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
    '강산':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
    '빵길':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
    '커두':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
    '영쿠':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
    '서재':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
    '푸름':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
    '태':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
    '오범':{
      dayTotal:0,
      matchTotal:0,

      sameSideTotal: new Array(PLAYER_NUM).fill(0),
      sameSideWin: new Array(PLAYER_NUM).fill(0),
      otherSideTotal: new Array(PLAYER_NUM).fill(0),
      otherSideWin: new Array(PLAYER_NUM).fill(0),

      threeToThreeTotal: 0,
      threeToThreeWin: 0,
      threeToFourTotal: 0,
      threeToFourWin: 0,
      fourToThreeTotal: 0,
      fourToThreeWin: 0,
      fourToFourTotal: 0,
      fourToFourWin: 0,

      firstWin: 0,
      lastWin: 0,

      afterWinTotal: 0,
      afterWinWin: 0,
      afterLoseTotal: 0,
      afterLoseWin: 0,

      conWin: 0,
      conLose: 0,

      elo: [],
      curElo: 1000,
    },
  };

  for(let k = 0; k < PLAYER_NUM; k++) {
  let pi = k;
  let p = PLAYER_INDEX[k];

    for(let day = 0; day < eachDayObj.length; day++){
      players[p].elo[day] = [];
      if(!eachDayObj[day].members[pi]) continue; // 불참이면
      players[p].dayTotal++;

      let currentConWin = 0;
      let currentConLose = 0;

      for(let matchIndex = 0, match; matchIndex < eachDayObj[day].match.length; matchIndex++) {
        match = eachDayObj[day].match[matchIndex];
        if(!match.members[p]) continue;// 불참이면 
        players[p].matchTotal++;

        const win = WIN === match.members[p];
        if(match.members[p] === WIN){ // 연승 기록
          currentConWin++;
          currentConLose = 0;
          currentConWin > players[p].conWin ? players[p].conWin = currentConWin : currentConWin = currentConWin;
        } else { // 연패 기록
          currentConWin = 0;
          currentConLose++;
          currentConLose > players[p].conLose ? players[p].conLose = currentConLose : currentConLose = currentConLose;
        }

        if(matchIndex === 0 && win) { // 첫 판
          players[p].firstWin++;
        } else if(matchIndex === eachDayObj[day].match.length-1 && match.members[p] === WIN) { // 막판
          players[p].lastWin++;
        }

        // 플레이어 수 별 승률 계산
        if(match.winNum === 3 && match.loseNum === 3) { // 33일 때
          players[p].threeToThreeTotal++;
          if(win) players[p].threeToThreeWin++;
        } else if(match.winNum === 4 && match.loseNum === 3) { // 43일 때
          if(win) { players[p].fourToThreeTotal++; players[p].fourToThreeWin++; }
          else { players[p].threeToFourTotal++; }
        } else if(match.winNum === 3 && match.loseNum === 4) { // 34일 때
          if(win) { players[p].threeToFourTotal++; players[p].threeToFourWin++; }
          else { players[p].fourToThreeTotal++; }
        } else if(match.winNum === 4 && match.loseNum === 4) { // 44일 때
          players[p].fourToFourTotal++;
          if(win) players[p].fourToFourWin++;
        }

        // 아군/적군일 경우 별 승률 계산
        for(let ssIndex = 0; ssIndex < PLAYER_NUM; ssIndex++) {
          if(ssIndex === pi) continue;
          if(match.members[PLAYER_INDEX[ssIndex]] === NOSHOW) continue;

          if(win) {
            if(match.win.includes(PLAYER_INDEX[ssIndex])) { players[p].sameSideTotal[ssIndex]++; players[p].sameSideWin[ssIndex]++; }
            else if(match.lose.includes(PLAYER_INDEX[ssIndex])) { players[p].otherSideTotal[ssIndex]++; players[p].otherSideWin[ssIndex]++; }
          } else {
            if(match.win.includes(PLAYER_INDEX[ssIndex])) { players[p].otherSideTotal[ssIndex]++; }
            else if(match.lose.includes(PLAYER_INDEX[ssIndex])) { players[p].sameSideTotal[ssIndex]++; }
          }
        }
      }
    }
  }

  // ELO Rating
  for(let day = 0; day < eachDayObj.length; day++){

    for(let matchIndex = 0, match; matchIndex < eachDayObj[day].match.length; matchIndex++) {

      match = eachDayObj[day].match[matchIndex];
      let winElo = 0;
      let loseElo = 0;

      for(let i = 0; i < match.winNum; i++)
        winElo += players[match.win[i]].curElo;
      winElo = Math.ceil(winElo / match.winNum); // 이긴 팀의 ELO 평균 점수
      //winElo = winElo / match.winNum; // 이긴 팀의 ELO 평균 점수

      for(let i = 0; i < match.loseNum; i++) 
        loseElo += players[match.lose[i]].curElo;
      loseElo = Math.ceil(loseElo / match.loseNum); // 진 팀의 ELO 평균 점수
      //loseElo = loseElo / match.loseNum; // 진 팀의 ELO 평균 점수

      //console.log("win:"+winElo+" vs lose:"+loseElo+ " / winNum: "+match.winNum+" vs loseNum: "+match.loseNum);

      for (let i = 0, winRate; i < match.winNum; i++) {
        winRate = 1 / (1 + (10 ** ((loseElo - players[match.win[i]].curElo) / 400)));
        players[match.win[i]].curElo = Math.ceil(players[match.win[i]].curElo + 16 * (1 - winRate));
        //players[match.win[i]].curElo = players[match.win[i]].curElo + 16 * (1 - winRate);
        players[match.win[i]].elo[day][matchIndex] = players[match.win[i]].curElo;
        //console.log("winRate: "+winRate+" / "+match.win[i] + ": " + players[match.win[i]].curElo);
      }

      for (let i = 0, winRate; i < match.loseNum; i++) {
        winRate = 1 / (1 + (10 ** ((winElo - players[match.lose[i]].curElo) / 400)));
        players[match.lose[i]].curElo = Math.ceil(players[match.lose[i]].curElo - 16 * (winRate));
        //players[match.lose[i]].curElo = players[match.lose[i]].curElo - 16 * (winRate);
        players[match.lose[i]].elo[day][matchIndex] = players[match.lose[i]].curElo;
        //console.log("winRate: "+winRate+" / "+match.lose[i] + ": " + players[match.lose[i]].curElo);
      }
    }
  }

  let str = "";
  for (let k = 0; k < PLAYER_NUM; k++) {
    str = str+PLAYER_INDEX[k]+",";
    for (let day = 0; day < eachDayObj.length; day++) {
      for (let matchIndex = eachDayObj[day].match.length-1, match; matchIndex < eachDayObj[day].match.length; matchIndex++) {
        str = str+players[PLAYER_INDEX[k]].elo[day][matchIndex]+",";
        //str = str+players[PLAYER_INDEX[k]].elo[day][matchIndex]+",";
      }
    }
    str = str+"\n";
  }
  fs.writeFile('./elo.csv', str, 'utf-8', function(err, totalRecord){
  });

  const calMatchFromCombi = (win, lose) => {
    for (let i = 0; i < COMBINATIONS_OF_PLAYER.length; i++) {
      if( COMBINATIONS_OF_PLAYER[i].filter(x => win.includes(x)).length === 3 ) statsFromCombi[i].wins++;
      if( COMBINATIONS_OF_PLAYER[i].filter(x => lose.includes(x)).length === 3 ) statsFromCombi[i].loses++;
    }
  };
  
  // Combination Statistics
  for(let day = 0; day < eachDayObj.length; day++){
    for(let matchIndex = 0, match; matchIndex < eachDayObj[day].match.length; matchIndex++) {
      match = eachDayObj[day].match[matchIndex]
      calMatchFromCombi(match.win, match.lose);
    }
  }

  // 최다승 최다패 최고승률 최저승률 조합 탐색
  for(let i = 0; i < COMBINATIONS_OF_PLAYER.length; i++) {
    statsFromCombi[i].index = i;
  }
  statsFromCombi.sort((x, y) => y.wins - x.wins);
  for (let i = 0; i < MOST_NUM; i++ ){
    pointCombi.mostWinCombi[i] = statsFromCombi[i].index;
  }  
  statsFromCombi.sort((x, y) => y.loses - x.loses);
  for (let i = 0; i < MOST_NUM; i++ ){
    pointCombi.mostLoseCombi[i] = statsFromCombi[i].index;
  }  
  statsFromCombi.sort((x, y) => y.wins/(y.wins+y.loses)*100 - x.wins/(x.wins+x.loses)*100);
  for (let i = 0; i < MOST_NUM; i++ ){
    pointCombi.mostWinRateCombi[i] = statsFromCombi[i].index;
  }  
  statsFromCombi.sort((x, y) => y.loses/(y.wins+y.loses)*100 - x.loses/(x.wins+x.loses)*100);
  for (let i = 0; i < MOST_NUM; i++ ){
    pointCombi.mostLoseRateCombi[i] = statsFromCombi[i].index;
  }
  statsFromCombi.sort((x, y) => x.index - y.index);
  
  console.log("[ 조합 별 승률 ]");
  let strStatsFromCombies = "";
  for(let i = 0; i < COMBINATIONS_OF_PLAYER.length; i++)  {
    //if(i%15 === 0) strStatsFromCombies = strStatsFromCombies +"\n";
    strStatsFromCombies = strStatsFromCombies + "[ "+COMBINATIONS_OF_PLAYER[i].toString()+" ] - WINS: "+statsFromCombi[i].wins+" / LOSES: "+statsFromCombi[i].loses+" / RATE: "+(statsFromCombi[i].wins/(statsFromCombi[i].loses+statsFromCombi[i].wins)*100).toFixed(2)+"%\n";
  }
  strStatsFromCombies = strStatsFromCombies + "\n[ 최다 승리 조합 ]\n"
  for(let i = 0; i < MOST_NUM; i++ ) {
    strStatsFromCombies = strStatsFromCombies +"[ "+COMBINATIONS_OF_PLAYER[pointCombi.mostWinCombi[i]].toString()+" ] - WINS: "+statsFromCombi[pointCombi.mostWinCombi[i]].wins+"\n";
  }
  strStatsFromCombies = strStatsFromCombies + "\n[ 최고 승률 조합 ]\n"
  for(let i = 0; i < MOST_NUM; i++ ) {
    strStatsFromCombies = strStatsFromCombies +"[ "+COMBINATIONS_OF_PLAYER[pointCombi.mostWinRateCombi[i]].toString()+" ] - WIN_RATES: "+(statsFromCombi[pointCombi.mostWinRateCombi[i]].wins/(statsFromCombi[pointCombi.mostWinRateCombi[i]].wins+statsFromCombi[pointCombi.mostWinRateCombi[i]].loses)*100).toFixed(2)+"%\n";
  }
  strStatsFromCombies = strStatsFromCombies + "\n[ 최다 패배 조합 ]\n"
  for(let i = 0; i < MOST_NUM; i++ ) {
    strStatsFromCombies = strStatsFromCombies +"[ "+COMBINATIONS_OF_PLAYER[pointCombi.mostLoseCombi[i]].toString()+" ] - LOSES: "+statsFromCombi[pointCombi.mostLoseCombi[i]].loses+"\n";
  }
  strStatsFromCombies = strStatsFromCombies + "\n[ 최저 승률 조합 ]\n"
  for(let i = 0; i < MOST_NUM; i++ ) {
    strStatsFromCombies = strStatsFromCombies +"[ "+COMBINATIONS_OF_PLAYER[pointCombi.mostLoseRateCombi[i]].toString()+" ] - WIN_RATES: "+(statsFromCombi[pointCombi.mostLoseRateCombi[i]].wins/(statsFromCombi[pointCombi.mostLoseRateCombi[i]].wins+statsFromCombi[pointCombi.mostLoseRateCombi[i]].loses)*100).toFixed(2)+"%\n";
  }
  
  console.log(strStatsFromCombies);

  for(let i = 0; i < PLAYER_NUM; i++) {
    let p = players[PLAYER_INDEX[i]];
    console.log(" [ "+PLAYER_INDEX[i]+" ] ");
    console.log(" | 참석: "+p.dayTotal+" | 경기: "+p.matchTotal+" | MMR: "+p.curElo+" |\n | 첫판 승률: "+(p.firstWin / p.dayTotal*100).toFixed(2) + "% | 막판 승률: "+(p.lastWin / p.dayTotal*100).toFixed(2)+"% | \n | 최다 연승: "+p.conWin+" | 최다 연패: "+p.conLose+" | \n");
    console.log(" [ 매칭 인원 별 승률 ]");
    console.log(" | 3:3  "+p.threeToThreeTotal+"전 "+p.threeToThreeWin+"승 "+(p.threeToThreeWin / p.threeToThreeTotal*100).toFixed(2) + "% | \n | 3:4  "+p.threeToFourTotal+"전 "+p.threeToFourWin+"승 "+(p.threeToFourWin / p.threeToFourTotal*100).toFixed(2) + "% | \n | 4:3  "+p.fourToThreeTotal+"전 "+p.fourToThreeWin+"승 "+(p.fourToThreeWin / p.fourToThreeTotal*100).toFixed(2) + "% | \n | 4:4  "+p.fourToFourTotal+"전 "+p.fourToFourWin+"승 "+(p.fourToFourWin / p.fourToFourTotal*100).toFixed(2)+"% | \n");
    console.log(" [ 아군 매칭 시 승률 ]");
    let sameStr = "";
    for(let j = 0; j < PLAYER_NUM; j++) {
      if(i === j) continue;
      sameStr += " | "+PLAYER_INDEX[j] + " " + p.sameSideTotal[j] +"전 " + p.sameSideWin[j] + "승 " + (p.sameSideWin[j] / p.sameSideTotal[j] * 100).toFixed(2) + "% | \n";
    }
    console.log(sameStr);
    console.log(" [ 적군 매칭 시 승률 ]");
    let otherStr = "";
    for(let j = 0; j < PLAYER_NUM; j++) {
      if(i === j) continue;
      otherStr += " | "+PLAYER_INDEX[j] + " " + p.otherSideTotal[j] +"전 " + p.otherSideWin[j] + "승 " + (p.otherSideWin[j] / p.otherSideTotal[j]*100).toFixed(2) + "% | \n";   
    }
    console.log(otherStr);
    console.log("\n\n");
  }
});





// ///////////////////
// 같은 편일 때 승률 
// 상대 편일 때 승률 
// 3:3 승률
// 3:4 승률
// 4:3 승률
// 4:4 승률
// 막판 승률
// 첫판 승률
// 전판 졌을 때 승률
// 전판 이겼을 때 승률
// 최다 연승
// 최다 연패
// ELO Ratings
// ///////////////////


// 공격수 승률(서재+바키)
// 도구 승률(커두+영쿠)
// 수비 승률(푸름+빵길+강산)



// 포지션 알고리즘?



