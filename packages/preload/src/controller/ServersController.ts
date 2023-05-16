import {ipcRenderer} from 'electron';

export async function getStatistics() {
  try {
    return JSON.parse(atob(await ipcRenderer.invoke('getSettingValue', 'access_api_stats')));
  } catch {
    return false;
  }
}
