const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function initial() {
	if (mainWindow instanceof BrowserWindow) {
		return;
	}

	// 創建一個瀏覽器視窗
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		'use-content-size': true
	});

	// 載入 index.html
	mainWindow.loadURL(`file://${__dirname}/index.html`);

	// 開啟瀏覽器的開發人員工具
	mainWindow.webContents.openDevTools();

	// 當視窗關閉時清除變數
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

// 當 Electron 就緒時會呼叫此事件
app.on('ready', initial);

// 修正 OS X 問題
app.on('activate', initial);

// 當所有視窗關閉時結束程式
app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
	    app.quit();
    }
});
