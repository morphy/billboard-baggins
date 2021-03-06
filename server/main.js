const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const http = require('http');
const fs = require('fs-extra');

let win;

function createWindow()
{
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(url.format(
  {
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {win = null});

  win.webContents.openDevTools();

  win.setMenu(null);
  win.maximize();
}

app.on('ready', createWindow);

app.on('window-all-closed', () =>
{
  if(process.platform !== 'darwin') app.quit();
});

app.on('activate', () =>
{
  if(win === null) createWindow();
});

http.createServer(function(req, res)
{
  var q = url.parse(req.url, true);

  if(q.pathname == '/current-version')
  {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(fs.readFileSync('config.json'));
    res.end();
    console.log('got a request');
  }
  else if(q.pathname == '/download')
  {
    var f_content = fs.readFileSync(path.join('packages', 'package' + q.query.version + '.zip'));
    res.setHeader('Content-disposition', 'attachment; filename=' + 'package' + q.query.version + '.zip');
    res.end(f_content);
    console.log('got a request');
  }
}).listen(8080);
