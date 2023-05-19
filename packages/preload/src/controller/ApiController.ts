import {ipcRenderer} from 'electron';
import {lookup} from 'dns';

// API

enum Stats {
  all,
  bind,
  statistics,
}

// Generic type

type Data<T> = {
  attributes: T;
};

// Excpected type

type BindData = {
  name: string;
  command: string;
};

type StatisticsData = {
  name: string;
  icon: string;
  popover_content: string;
  value: string;
  type: string;
};

type ServersData = {
  id: number;
  name: string;
  ip: string;
  port: string;
  server_data: {
    id: number;
    port: number;
    online: boolean;
    players: string;
    playerslist: [
      {
        id: string;
        nickname: string;
      },
    ];
  };
};

async function get(data: string) {
  try {
    return JSON.parse(await ipcRenderer.invoke('getApiData', data)).data;
  } catch {
    return null;
  }
}

export async function getServers() {
  const data = await get('servers');
  const value = data
    ? data.reduce((obj: {[key: string]: any}, item: {attributes: ServersData}) => {
        const {attributes} = item;
        const {name, ip, port, server_data} = attributes;
        obj[name] = {name, ip, port, server_data: {...server_data, port: undefined}};
        return obj;
      }, {})
    : {};
  return value;
}

export async function writeApiData(stats = Stats.all) {
  if (!(stats in Stats)) return;

  const sections = {
    [Stats.bind]: {
      getArgs: ['bind'],
      settingKey: 'access_api_bind',
      reducer: (obj: {[key: string]: string}, item: Data<BindData>) => {
        const {name, command} = item.attributes;
        obj[name] = command;
        return obj;
      },
    },
    [Stats.statistics]: {
      getArgs: ['stats'],
      settingKey: 'access_api_stats',
      reducer: (obj: {[key: string]: any}, item: Data<StatisticsData>) => {
        const {name, popover_content, value, type} = item.attributes;
        const icon = item.attributes.icon.split('-').slice(1).join('-');
        obj[name] = {name, icon, popover_content, value, type};
        return obj;
      },
    },
  };

  const requests =
    stats === Stats.all
      ? Object.values(sections).map(section => section.getArgs)
      : [sections[stats].getArgs];

  // @ts-ignore
  const results = await Promise.all(requests.map(args => get(...args)));

  for (let i = 0; i < results.length; i++) {
    const section = stats === Stats.all ? Object.values(sections)[i] : sections[stats];
    const data = results[i];
    if (data === null) continue;
    const value = data.reduce(section.reducer, {});
    await ipcRenderer.invoke('setSettingValue', [section.settingKey, btoa(JSON.stringify(value))]);
  }
}

export async function isOnline(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    lookup('google.com', err => {
      if (err && err.code === 'ENOTFOUND') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
