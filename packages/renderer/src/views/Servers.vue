<script lang="ts" setup>
import {getServers, getStatistics} from '#preload';
import {ref} from 'vue';
import {notify} from '@kyvg/vue3-notification';

const servers: {[key: string]: any} = ref(await getServers());
const statistics: {[key: string]: any} = await getStatistics();

function isEmpty(obj: object) {
  return !obj || !Object.values(obj).some(x => x !== void 0);
}

function numberToHuman(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function secondsToHuman(value: number) {
  const years = Math.floor(value / (86400 * 365.2425));
  const months = Math.floor((value % (86400 * 365.2425)) / (86400 * 30.436875));
  const days = Math.floor(((value % (86400 * 365.2425)) % (86400 * 30.436875)) / 86400);

  return `${years} années, ${months} mois, ${days} jours`;
}

async function updateServers() {
  const button = document.querySelector('.rotate-button');
  if (!button) return;

  button.classList.add('animate-spin');

  servers.value = await getServers();

  setTimeout(() => {
    button.classList.remove('animate-spin');

    notify({
      title: 'Serveurs mis à jours',
      type: 'notif-success',
    });
  }, 900);
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-12 pt-3 xl:p-0 xl:pt-12 duration-75">
    <h1 class="text-white mb-5 text-2xl font-medium flex items-center flex-wrap">
      Nos serveurs
      <button
        @click="updateServers"
        class="rotate-button w-10 py-1 px-1 ml-auto bg-purple-600 hover:bg-purple-700 text-white transition ease-in duration-200 font-semibold shadow-md focus:outline-none rounded-full mr-4"
      >
        <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
      </button>
      <span class="font-normal text-lg block w-full"
        >Access propose des serveurs de jeu sur SCP:SL.</span
      >
    </h1>

    <!-- Servers -->
    <div class="grid justify-between gap-4 grid-cols-3">
      <div
        v-if="!isEmpty(servers)"
        v-for="({name, server_data}, id) in servers"
        class="rounded-2xl bg-gray-800 p-4"
      >
        <div class="flex-row flex items-center gap-4">
          <span
            class="flex w-12 h-12 items-center justify-center text-2xl font-bold font-heading rounded-full bg-violet-100 text-violet-600"
          >
            <font-awesome-icon :icon="['fas', 'server']" />
          </span>
          <div class="flex flex-col">
            <span class="text-white text-lg font-medium">
              {{ name }}
            </span>

            <span class="relative text-gray-400">
              {{ server_data.players ? `${server_data.players} joueur(s)` : 'Serveur hors ligne' }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-else
        class="rounded-2xl bg-gray-800 p-4 col-span-3 grid-cols-3 grid relative"
      >
        <h1
          class="absolute text-white text-xl font-medium m-0 p-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        >
          Vous êtes hors ligne
        </h1>

        <div
          class="rounded-2xl opacity-5"
          v-for="_ in 3"
        >
          <div class="flex-row flex items-center gap-4">
            <span
              class="flex w-12 h-12 items-center justify-center text-2xl font-bold font-heading rounded-full bg-violet-100 text-violet-600"
            >
              <font-awesome-icon :icon="['fas', 'server']" />
            </span>
            <div class="flex flex-col">
              <span class="text-white text-lg font-medium"> Serveur </span>

              <span class="relative text-gray-400"> Serveur hors ligne </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div v-if="statistics">
      <h1 class="text-white my-5 text-2xl font-medium grid"> Statistiques </h1>

      <div class="grid justify-between gap-4 grid-cols-2">
        <div
          v-for="({name, icon, popover_content, value, type}, id) in statistics"
          class="flex rounded-2xl bg-gray-800 p-4"
        >
          <div class="flex-row flex items-center gap-4">
            <span
              class="flex w-12 h-12 items-center justify-center text-2xl font-bold font-heading rounded-full bg-violet-100 text-violet-600"
              style="min-width: 48px"
            >
              <font-awesome-icon :icon="['fas', icon]" />
            </span>
            <div class="flex flex-col">
              <span class="relative text-gray-400">
                {{ name }}

                <Popper
                  arrow
                  hover
                  :content="popover_content"
                  placement="top"
                  :style="{
                    '--popper-theme-padding': '13px',
                  }"
                >
                  <font-awesome-icon :icon="['fas', 'circle-info']" />
                </Popper>
              </span>

              <span class="text-white text-lg font-medium">
                {{ type == 'number' ? numberToHuman(value) : secondsToHuman(value) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
