'use strict'
import { app, BrowserWindow } from 'electron'
import path from 'path'
import fs from 'fs'
import os from 'os'
if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
  }
  let mainWindow
  const winURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9081'
    : `file://${path.join(__dirname, 'index.html')}`
  function loadExtension (extensionHash) {
    const chrome_extension_dir = `${os.homedir()}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions`
    const extension_dir = path.join(chrome_extension_dir, extensionHash)
    if (fs.existsSync(extension_dir)) {
      let versions = fs.readdirSync(extension_dir)
      if (versions && versions.length > 0) {
        versions = versions.sort((val1, val2) => {
          const stat1 = fs.statSync(path.join(extension_dir, val1))
          const stat2 = fs.statSync(path.join(extension_dir, val2))
          return stat2.mtime - stat1.mtime
        })
        const lastVersion = versions[0]
        BrowserWindow.addDevToolsExtension(
          path.join(extension_dir, lastVersion))
      }
    }
  }
  function createWindow () {
  /**
   * Initial window options
   */
    mainWindow = new BrowserWindow({
      height: 563,
      useContentSize: true,
      width: 1000,
      webPreferences: {
        nodeIntegration: true
      }
    })

    mainWindow.loadURL(winURL)
    if (process.env.NODE_ENV === 'development') {
      const react_devtool_extension_hash = 'fmkadmapgofadopljbjfkapdkoienihi'
      const redux_devtool_extension_hash = 'lmhkpmbekcpmknklioeibfkpmmfibljd'
      loadExtension(react_devtool_extension_hash)
      loadExtension(redux_devtool_extension_hash)
    }
    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', createWindow)
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) { mainWindow.restore() } else {
        mainWindow.focus()
      }
    }
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}
