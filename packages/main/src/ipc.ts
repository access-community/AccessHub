import * as settings from 'electron-settings';
import {BrowserWindow, ipcMain, dialog, net, app} from 'electron';

const getWindow = () => BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

ipcMain.on('windowController', (event, args) => {
  switch (args) {
    case 'close':
      /* getWindow()?.hide(); */
      app.quit();
      return;
    case 'maximize':
      const window = getWindow();
      if (window) {
        if (window.isMaximized()) window.unmaximize();
        else window.maximize();
      }
      return;
    case 'minimize':
      getWindow()?.minimize();
      return;
    default:
      return;
  }
});

ipcMain.handle('fileSystem', () => {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        filters: [{name: 'cmdbinding', extensions: ['txt']}],
        title: 'Ouvrez votre ficher cmdbinding.txt',
        properties: ['openFile'],
      })
      .then(function (response) {
        if (!response.canceled) {
          resolve(response.filePaths[0]);
        } else {
          reject('no file selected');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
});

ipcMain.handle('getSettingValue', (event, key) => {
  return settings.get(key);
});

ipcMain.handle('setSettingValue', async (event, args) => {
  try {
    await settings.set(args[0], args[1]);
  } catch {
    await settings.set({[args[0]]: args[1]});
  }
});

ipcMain.handle('enableInputEvent', async (event, args) => {
  const mainWindow = BrowserWindow.getFocusedWindow();

  if (!mainWindow) {
    throw new Error('No focused window found');
  }

  return new Promise(resolve => {
    const handler = (event: Electron.Event, input: Electron.Input) => {
      if (input.key !== undefined && input.code !== undefined) {
        mainWindow.webContents.removeListener('before-input-event', handler);
        resolve({key: input.key, code: input.code});
      }
    };

    mainWindow.webContents.on('before-input-event', handler);
  });
});

ipcMain.handle('getApiData', async (event, args) => {
  const endpoint = 'https://access-community.fr/api/v1'
  return new Promise((resolve, reject) => {
    let link = `${endpoint}`;
    switch (args) {
      case 'bind':
        link = `${endpoint}/bind_managers`;
        break
      case 'stats':
        link = `${endpoint}/statistics`;
        break
      case 'servers':
        link = `${endpoint}/servers`;
        break
    }

    const request = net.request(link);
    let returnData: string = '';

    request.on('response', response => {
      response.on('data', chunk => {
        returnData = chunk.toString('utf-8');
      });

      response.on('end', () => {
        resolve(returnData);
      });
    });

    request.on('error', error => {
      resolve(null);
    });

    request.end();
  });
});
