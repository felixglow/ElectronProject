const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
// 引入node.js模块
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({width: 1000, height: 600, icon: path.join(__dirname, 'src/favicon.ico')})

    // 加载指定页面
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/student.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.openDevTools() // 开启调试窗口，发布应用时关闭
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);
// 设置dock图标
app.dock.setIcon(path.join(__dirname, 'src/favicon.ico'))

// 所有窗口关闭时，退出应用
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})



