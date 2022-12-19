const { app, BrowserWindow, Menu, shell } = require('electron')
// include the Node.js 'path' module at the top of your file 
const path = require('path')
// modify your existing createWindow() function 
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // win.loadFile('index.html')
  win.loadURL('http://localhost:3000')
}

const template = [
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        type: "checkbox",
        checked: true,
        click: () => {
          console.log("clicked Open!!");
          shell.openExternal("https://www.electronjs.org/docs/latest/api/app");
        }
      },
      {
        type: "separator"
      },
      {
        role: "toggleDevTools"
      }
    ]
  }
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})