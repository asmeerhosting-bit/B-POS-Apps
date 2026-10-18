const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let url = 'https://1993.2000.12.pos.besttaup.lk/';
try { url = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')).url || url; } catch (e) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 900, minHeight: 600,
    title: 'B-POS', icon: path.join(__dirname, 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  Menu.setApplicationMenu(null);
  win.maximize();
  win.loadURL(url);
  win.webContents.on('did-fail-load', (e, code, desc, failedUrl, isMain) => {
    if (isMain) win.loadFile(path.join(__dirname, 'offline.html'));
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
