import {ipcRenderer} from 'electron';
export const WindowController = {
  close: () => ipcRenderer.send('windowController', 'close'),
  maximize: () => ipcRenderer.send('windowController', 'maximize'),
  minimize: () => ipcRenderer.send('windowController', 'minimize'),
};
