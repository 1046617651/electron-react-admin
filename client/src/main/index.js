'use strict'
import { app, BrowserWindow } from 'electron'
import path from 'path'
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
