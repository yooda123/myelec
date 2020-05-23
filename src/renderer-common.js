var log4js = require('log4js');
log4js.configure('./config/log4js.json');
var logger = log4js.getLogger("renderer");

module.exports = logger;

var ipc = require('electron').ipcRenderer;
window.onerror = function(error, url, line) {
    ipc.send('errorInWindow', error, url, line);
};

