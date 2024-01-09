/* eslint-disable no-console */
import type {
  App,
} from 'electron'
import { dialog } from 'electron'
import electronUpdater from 'electron-updater'

function checkUpdate(app: App) {
  if (process.platform === 'darwin') {
    // 我们使用koa-static将静态目录设置成了static文件夹，
    // 所以访问http://127.0.0.1:9005/darwin，就相当于访问了static/darwin文件夹，win32同理
    electronUpdater.autoUpdater.setFeedURL('http://127.0.0.1:9005/darwin') // 设置要检测更新的路径
  }
  else {
    electronUpdater.autoUpdater.setFeedURL('http://127.0.0.1:9005/win32')
  }

  // 检测更新
  electronUpdater.autoUpdater.checkForUpdates()

  // 监听'error'事件
  electronUpdater.autoUpdater.on('error', (err) => {
    console.log(err)
  })

  // 监听'update-available'事件，发现有新版本时触发
  electronUpdater.autoUpdater.on('update-available', () => {
    console.log('found new version')
  })

  // 默认会自动下载新版本，如果不想自动下载，设置autoUpdater.autoDownload = false

  // 监听'update-downloaded'事件，新版本下载完成时触发
  electronUpdater.autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: '应用更新',
      message: '发现新版本，是否更新？',
      buttons: ['是', '否'],
    }).then((buttonIndex) => {
      if (buttonIndex.response === 0) { // 选择是，则退出程序，安装新版本
        electronUpdater.autoUpdater.quitAndInstall()
        app.quit()
      }
    })
  })
}
export default function useAutoUpdater(app: App) {
  app.on('ready', () => {
    checkUpdate(app)
  })
}
