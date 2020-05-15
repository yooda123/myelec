var cron = require('node-cron');
var archiver = require('archiver');
var fs = require('fs');

cron.schedule('*/1 * * * *', function(){

  let logfile = './log_upload.log';

  // 標準出力をログファイルへ出力:
  const logstream = fs.createWriteStream(logfile, { flags: 'a' });
  console.log = function(d) {
    logstream.write(new Date().toLocaleString() + ': ' + d + '\n');
  };

  // zipファイルの連番
  let count = 0

  // 出力先のzipファイル名
  var zip_file_name = `log-${++count}.zip`;
  console.log(zip_file_name);

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

});
