// アプリケーション作成用のモジュールを読み込み
const {app, BrowserWindow} = require('electron');

// メインウィンドウ
let mainWindow;

function createWindow() {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 800, height: 600,
  });

  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadFile('index.html');

  // デベロッパーツールの起動
  mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

//  初期化が完了した時の処理
app.allowRendererProcessReuse = true; // 追加
app.on('ready', createWindow);

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
  // メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null) {
    createWindow();
  }
});

// var cron = require('node-cron');

// var archiver = require('archiver');
// var fs = require('fs');

// // 出力先のzipファイル名
// var zip_file_name = "tmp.zip";

// // ストリームを生成して、archiverと紐付ける
// var archive = archiver.create('zip', {});
// var output = fs.createWriteStream(zip_file_name);
// archive.pipe(output);

// // 圧縮対象のファイル及びフォルダ
// archive.glob('*.log', { cwd: 'D:/PostgreSQL/11/data/log' }, { prefix: 'pg_log' });
// archive.glob('*.js');
// archive.glob('*.css');
// archive.glob('*.ico');
// archive.glob('*.html');
// archive.glob('package.json');
// archive.glob('css/**/*');
// archive.glob('fonts/**/*');
// archive.glob('images/**/*');

// // zip圧縮実行
// archive.finalize();
// var archive_size = archive.pointer();
// console.log(`complete! total size : ${archive_size} bytes`);


// cron.schedule('*/1 * * * *', function(){
//     console.log("zip-start"); //every 2 o'clock

//     // zipファイルの連番
//     let count = 0

//     // zip.addLocalFile("D:/PostgreSQL/11/data/log","","postgresql-*.log");

//     // // まだzip化するファイルが存在するとき
//     // if (zip.getEntryCount()) {
//     //   // zipファイル書き出し
//     //   zip.writeZip(path.resolve(__dirname, `log-${++count}.zip`))
//     // }

// });

const { spawn } = require('child_process');

// 実行したい外部コマンド: (tick.logへ10回ログ出力します)
// const commandline = "node src/tick.js --times=10 --logfile=tick.log";
const commandline = "node src/log_upload.js";
runCommand(commandline);

/** コマンドを外部プロセスとして実行 */
function runCommand(command) {
  console.log("running commandline: %s", commandline);
  const parts = commandline.split(" ");
  const cmd = parts[0];
  const args = parts.splice(1);

  // バックグラウンドで実行:
  // メインプロセスが終了しても外部プロセスとして動作します。
  const child = spawn(cmd, args, {
    stdio: 'ignore', // piping all stdio to /dev/null
    detached: true, // メインプロセスから切り離す設定
    env: process.env, // NODE_ENV を tick.js へ与えるため
  });
  child.unref(); // メインプロセスから切り離す
}
