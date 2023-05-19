import {ipcRenderer} from 'electron';
import {readFileSync, writeFileSync, stat} from 'node:fs';
import {Key} from '../enum/key';
import {Command} from '../enum/command';

export async function readFile(path: string) {
  await ipcRenderer.invoke('setSettingValue', ['last_file', path]);
  return readFileSync(path, {
    encoding: 'utf8',
  });
}

export async function writeFile(data: string) {
  const path = await ipcRenderer.invoke('getSettingValue', 'last_file');
  if (!path) {
    return {status: false, message: 'Erreur interne.'};
  }
  await writeFileSync(path, data);
}

export async function tryReadFile() {
  try {
    return await readFile(await ipcRenderer.invoke('getSettingValue', 'last_file'));
  } catch {
    return await readFile(process.env.APPDATA + '/SCP Secret Laboratory/cmdbinding.txt');
  }
}

type Result =
  | {
      status: true;
      message: Record<string, string[]>;
    }
  | {
      status: false;
      message: string;
    };

export async function getBindFile(path?: string): Promise<{status: boolean; message: string}> {
  try {
    if (path) return {status: true, message: await readFile(path)};
    else return {status: true, message: await tryReadFile()};
  } catch {
    let fs;
    try {
      fs = await ipcRenderer.invoke('fileSystem');
      if (fs.split('\\').pop() !== 'cmdbinding.txt')
        return {
          status: false,
          message: 'Le nom du fichier est incorrect, il doit être "cmdbinding.txt".',
        };
    } catch {
      return {status: false, message: 'Sélection du fichier annulé.'};
    }
    return await getBindFile(fs);
  }
}

export async function getBindData(path?: string): Promise<Result> {
  async function serialize(data: string): Promise<Result> {
    if (!data) {
      return {status: true, message: {}};
    }

    const lines = data.split('\n').filter(line => line.trim() !== '');
    const result = lines.reduce((acc, line) => {
      const separatorIndex = line.indexOf(':');
      const key = line.slice(0, separatorIndex);
      const value = line.slice(separatorIndex + 1);

      if (key && value) {
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(value.trim());
      }
      return acc;
    }, {} as Record<string, string[]>);

    const totalValues = Object.values(result).reduce((sum, values) => sum + values.length, 0);
    if (totalValues !== lines.length) {
      return {
        status: false,
        message: 'Structure du fichier incorrect. Essayez de supprimer le contenu.',
      };
    }

    return {status: true, message: result};
  }

  const bindFile = await getBindFile();

  if (!bindFile.status) return {status: false, message: bindFile.message};

  return await serialize(bindFile.message);
}

export const humanKey = (keyCode: string): string => {
  const key = Object.keys(Key).find(name => Key[name] === parseInt(keyCode.toString()));
  return key || 'Inconnu';
};

export const getBindEnum = Key;

export async function getCommandEnum() {
  try {
    const encodedAccessBind = await ipcRenderer.invoke('getSettingValue', 'access_api_bind');
    const accessBind = JSON.parse(atob(encodedAccessBind));
    return {...Command, ...accessBind};
  } catch {
    return Command;
  }
}

export async function addBind(
  key: string,
  command: string,
  update = false,
): Promise<{status: boolean; message: string}> {
  const content = await tryReadFile();
  const lines = content.split('\n').filter(line => line.trim());
  const newEntry = `${key}:${command}`;

  if (!/^\d+:\s*[A-Za-z0-9-.-/][^\n]*$/.test(newEntry)) {
    return {status: false, message: 'Assignation dans un format incorrect'};
  }

  const entryExists = lines.includes(newEntry);

  if (entryExists) {
    if (update) return {status: true, message: 'Assignation mise à jour'};
    else return {status: false, message: 'Assignation déjà présente'};
  }

  const index = lines.findIndex(line => line.startsWith(`${key}:`));

  if (update && index >= 0) {
    lines[index] = newEntry;
    const serialized = lines.join('\n');
    await writeFile(serialized);
    return {status: true, message: 'Assignation mise à jour'};
  }

  lines.push(newEntry);
  const serialized = lines.join('\n');
  await writeFile(serialized);
  return {status: true, message: 'Assignation ajoutée'};
}

export async function deleteBind(
  key: string,
  command: string,
): Promise<{status: boolean; message: string}> {
  const content = await tryReadFile();
  const lines = content.split('\n');
  const targetLine = `${key}:${command}`;

  const filteredLines = lines.filter(line => {
    const trimmedLine = line.trim();
    return trimmedLine && trimmedLine !== targetLine;
  });

  if (filteredLines.length === lines.length) {
    return {status: false, message: 'Erreur interne'};
  }

  const filteredContent = filteredLines.join('\n');
  await writeFile(filteredContent);

  return {status: true, message: 'Assignation supprimée'};
}

export async function getKey(): Promise<number> {
  function keycodeTranslate({key, code}: {key: string; code: string}) {
    if (/^[a-zA-Z]$/.test(key)) return key.toLowerCase().charCodeAt(0);
    return getBindEnum[key] || getBindEnum[code];
  }
  return keycodeTranslate(await ipcRenderer.invoke('enableInputEvent'));
}

export async function firstVisit(set: boolean = false) {
  if (set) {
    await ipcRenderer.invoke('setSettingValue', ['bind_visited', 'true']);
    return true;
  }
  try {
    return !!(await ipcRenderer.invoke('getSettingValue', 'bind_visited'));
  } catch {
    return false;
  }
}
