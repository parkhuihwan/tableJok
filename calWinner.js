var fs = require('fs');
fs.readFile('./dayLose.txt', 'utf8', function (err, totalRecord) {
    // let members = ["커두", "푸름", "바키", "서재", "강산", "영쿠", "이다"]
    let members = [];
    let recordArray = totalRecord.split('\r\n');
    let result = "";
    
    // console.log(JSON.stringify(recordArray));

    recordArray.forEach((value, index, array) => {
        // console.log(value);
        if(index === 0) {
            for(let i = 1; i < value.split(" ").length; i++ ) 
                members.push(value.split(" ")[i].split(":")[0]);
            return;
        }
        let winners = members.filter(x => !value.replace("\r","").split(' ').includes(x));
        let line = value.replace("\r","");
        for(let i = 0; i < winners.length; i++) {
            line += (i ? " " : "/") + winners[i];
        }
        result += line+"\r\n";
    }) 
    fs.writeFile('./dayLoseWin.txt', result, () =>{
        ;
    })
});
