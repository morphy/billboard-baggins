
  const electron = require('electron');
  const path = require('path');
  const url = require('url');
  const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;

  let addr;
  let win;

  if(process.env.NODE_ENV === 'DEV') {
    addr = 'http://localhost:8080/';
  }
  else {
    addr = url.format({
      pathname: path.join(process.cwd(), 'dist', 'index.html'),
      protocol: 'file:',
      slashes: true
    });
  }

  function createWin() {
    win = new BrowserWindow({
      width: 1000,
      height: 600
    });

    win.loadURL(addr);
    win.on('closed', () => { win = null });
    //win.setMenu(null);
    //win.maximize();
    //win.webContents.openDevTools();
  }

  app.on('ready', createWin);

  app.on('activate', () => {
    if(win === null) createWin();
  });

  app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
  });
