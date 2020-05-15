//
// cli/tick.js
// 
// ログをn回出力するだけの簡単なcliツール
// Usage: $ node cli/tick.js --times=3 --logfile=tick.log
// 
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

let { times, logfile } = argv;
if (!times) times = 10;
if (!logfile) logfile = './tick.log';


// 標準出力をログファイルへ出力:
const logstream = fs.createWriteStream(logfile, { flags: 'a' });
console.log = function(d) {
  logstream.write(new Date().toLocaleString() + ': ' + d + '\n');
};

// ティック実行:
let time = 0;
const intervalId = setInterval(() => {
  console.log("tick...");
  time += 1;
  if (time >= times) {
    clearInterval(intervalId);
    console.log("end.");
  }
}, 1000);