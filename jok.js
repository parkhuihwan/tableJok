var fs = require('fs');
fs.readFile('./simpleJok.txt', 'utf8', function(err, totalRecord){
  //console.log(totalRecord);

  let recordArray = totalRecord.split('\n');
  //console.log(JSON.stringify(recordArray));

  let recordObject = {};

  const PLAYER_NUM=7;
  let playerIndex = ["커두", "푸름", "바키", "서재", "강산", "영쿠", "빵길", "오범", "준형", "손민", "민우", "홍", "한", "고", "진호", "승훈", "박준", "태"];   
  let player = { };
  for(let i = 0; i < playerIndex.length; i++) {
    player[playerIndex[i]] = {
      total: 0,
      win: 0,
      lose: 0,
      rate: 0,
      best: 0,
      worst: 1,
      record: []
    }
  };
  for(let i = 0; i < recordArray.length; i++) {
    let totalPerRecord = recordArray[i].split(' ')[0].split(':')[1];
    for(let j = 1; j < recordArray[i].split(' ').length; j++) {
      const playerName = recordArray[i].split(' ')[j].split(':')[0];
      let total, lose;
      if(recordArray[i].split(' ')[j].split(':')[1].includes('(')) {
        total = Number(recordArray[i].split(' ')[j].split(':')[1].substring(recordArray[i].split(' ')[j].split(':')[1].indexOf('(')+1,recordArray[i].split(' ')[j].split(':')[1].indexOf(')')));
        lose = Number(recordArray[i].split(' ')[j].split(':')[1].substring(0,Number(recordArray[i].split(' ')[j].split(':')[1].indexOf('('))));
      }
      else {
        total = Number(totalPerRecord);
        lose = Number(recordArray[i].split(' ')[j].split(':')[1]);
      }
      player[playerName].total += total;
      player[playerName].lose += lose;
      player[playerName].win = player[playerName].total - player[playerName].lose;
      player[playerName].rate = player[playerName].win / player[playerName].total;
      if(player[playerName].best < 1 - recordArray[i].split(' ')[j].split(':')[1] / total)
        player[playerName].best = ((1 - (recordArray[i].split(' ')[j].split(':')[1] / total)));
      if(player[playerName].worst > 1 - (recordArray[i].split(' ')[j].split(':')[1] / total))
        player[playerName].worst = ((1 - recordArray[i].split(' ')[j].split(':')[1] / total));
        player[playerName].record.push(total + "전 " + (total - lose) + "승 "+ lose + "패");
    }
  }
  // console.log(JSON.stringify(recordObject, null, 4));
  // console.log(JSON.stringify(player, null, 4));

  console.log("\n\n[시즌 23-24]");
  console.log("- 통산전적 - ");
  for(let i = 0; i < PLAYER_NUM; i++) {
    const pName = playerIndex[i];
    const p = player[pName];
         
    if(pName.length === 2)
      console.log(" | "+playerIndex[i]+" | "+ p.total+"전 "+p.win+"승 "+ p.lose+"패 | 승률:"+(p.rate*100).toFixed(2)+"% 최고:"+(p.best*100).toFixed(2)+"%");
    else 
      console.log(" | "+playerIndex[i]+"   | "+ p.total+"전 "+p.win+"승 "+ p.lose+"패 | 승률:"+(p.rate*100).toFixed(2)+"% 최고:"+(p.best*100).toFixed(2)+"%");
  }


  console.log("\n\n - 최근 3전 개인 기록 -")
  for(let i = 0; i < PLAYER_NUM; i++) {
    const pName = playerIndex[i];
    const p = player[pName];
    for(;p.record.length > 3;)
      p.record.shift();
  }


  //console.log("\n\n - 개인 기록 -")
  for(let i = 0; i < PLAYER_NUM; i++) {
    const pName = playerIndex[i];
    const p = player[pName];
    if(pName.length === 2)
      console.log(" "+pName+": "+JSON.stringify(p.record));
    else
      console.log(" "+pName+"  : "+JSON.stringify(p.record));
  }
  console.log("\n\n");
});


const ppppps = [
["커두", "푸름", "바키", "서재", "강산", "영쿠", "빵길"],
["바키", "푸름", "커두", "서재", "강산", "영쿠", "빵길"],
["푸름", "바키", "커두", "서재", "강산", "영쿠", "빵길"],
["서재", "바키", "푸름", "커두", "강산", "영쿠", "빵길"],
["강산", "바키", "푸름", "커두", "서재", "영쿠", "빵길"],
["영쿠", "바키", "푸름", "커두", "서재", "강산", "빵길"],
["빵길", "바키", "푸름", "커두", "서재", "강산", "영쿠"],
];

for (let l = 0; l < 7; l++) {

  for (let i = 0; i < 1; i++) {
    for (let j = i + 1; j < 7; j++) {
      for (let k = j + 1; k < 7; k++) {
        //console.log("[\"" + ppppps[l][i] + "\", \"" + ppppps[l][j] + "\", \"" + ppppps[l][k] + "\"],");
      }
    }
  }
}