import {defineStore} from 'pinia';

interface BindState {
  activeBind: {key: string; command: string; id: number};
  data: BindData;
}

interface BindData {
  [id: number]: [key: string, command: string];
}

export const useBindStore = defineStore({
  id: 'bind',
  state: (): BindState => ({
    activeBind: {key: '', command: '', id: 0},
    data: {},
  }),
  actions: {
    setActive(id: number) {
      const [key = '', command = ''] = this.data[id] || [];
      this.activeBind = {key, command, id};
      if (id === -1) {
        this.activeBind = {key: '', command: '', id: -1};
      }
    },
    setData(file: Record<string, string[]>) {
      let id = 1;
      const data: BindData = {};

      for (const [key, commands] of Object.entries(file)) {
        for (const command of commands) {
          data[id] = [key, command];
          id++;
        }
      }

      this.data = data;
    },
    addBindData(key: string, command: string) {
      const newId = this.generateNewId();
      this.data[newId] = [key, command];
    },
    editBindData(id: number, key?: string, command?: string) {
      if (this.data[id] && (key || command))
        this.data[id] = [key ?? this.data[id][0], command ?? this.data[id][1]];
    },
    deleteBindData(id: number) {
      if (this.data[id]) delete this.data[id];
    },
    generateNewId(): number {
      const existingIds = Object.keys(this.data).map(Number);
      const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
      return newId;
    },
  },
});
