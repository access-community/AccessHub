<script lang="ts" setup>
import Table from '/@/components/bindmanager/Table.vue';
import Manager from '/@/components/bindmanager/Manager.vue';
import {getBindData, firstVisit, isSLRunning} from '#preload';
import {useBindStore} from '/@/store/bind';
import {ref} from 'vue';

const alreadyVisited = ref(await firstVisit());
const isGameRunning = ref(await isSLRunning());

const bindStore = useBindStore();
const {setData, setActive} = bindStore;

const data = ref(await getBindData());
if (data.value.status) setData(data.value.message);

async function getData() {
  data.value = await getBindData();
  if (data.value.status) setData(data.value.message);
}
async function setVisited() {
  alreadyVisited.value = await firstVisit(true);
}

// Check if the game is running every 1 second
setInterval(async function() {
  isGameRunning.value = await isSLRunning()
}, 1000)

</script>

<template>
  <div>
    <template v-if="alreadyVisited">

      <template v-if="isGameRunning">
        <div class="absolute w-full h-full z-50 bg-gray-900 bg-opacity-90">

          <div
            class="flex justify-center items-center"
            style="height: calc(100vh - (96px + 24px))"
          >
            <div class="z-20 duration-75 text-white">
              <h1 class="text-3xl font-extrabold">

                <span class="block">
                  <font-awesome-icon :icon="['fas', 'fa-circle-exclamation']" />
                  Impossible de modifier <span class="text-indigo-500">les assignations</span>
                </span>
                <span class="block"> votre jeu est <span class="text-indigo-500">en cours d'exécution</span>.</span>
              </h1>

              <h1 class="text-2xl font-medium mt-5">
                <span class="block">
                  Pour modifier vos assignations, <span class="text-indigo-500">SCP:SL</span> doit être fermé.
                </span>
              </h1>

            </div>
          </div>

        </div>
      </template>

      <div
        v-if="!data.status"
        class="text-center"
      >
        <div class="py-5 text-red-300">
          <h1 class="font-medium text-3xl mb-1">
            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
            Erreur
          </h1>

          <h2 class="font-medium text-1xl">
            {{ data.message }}
          </h2>
        </div>

        <button
          @click="getData"
          class="py-2 px-3 text-3xl bg-red-200 hover:bg-red-300 text-red-700 transition ease-in font-semibold duration-200 focus:outline-none rounded-full"
        >
          <font-awesome-icon :icon="['fas', 'arrows-rotate']" /> Réessayer
        </button>
      </div>

      <template v-else>
        <div class="grid gap-2 grid-cols-12 mx-auto max-w-7xl">
          <Table />
          <Manager />
        </div>

        <div class="absolute bottom-12 right-12">
          <Popper
            arrow
            hover
            content="Nouveau"
            placement="auto-start"
            :style="{
              '--popper-theme-padding': '13px',
            }"
          >
            <button
              @click="setActive(-1)"
              class="text-3xl py-2 px-3.5 bg-green-600 hover:bg-green-700 text-white transition ease-in duration-200 font-semibold shadow-md focus:outline-none rounded-full"
            >
              <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
          </Popper>
        </div>
      </template>
    </template>

    <template v-else>
      <div
        class="flex justify-center items-center xl:items-baseline"
        style="height: calc(100vh - (96px + 24px))"
      >
        <div class="w-9/12 2xl:w-6/12 lg:mt-16 z-20 duration-75 text-white">
          <h1 class="text-3xl font-extrabold">
            <span class="block">Bienvenue </span>

            <span class="block">
              dans le <span class="text-indigo-500">gestionnaire d'assignations</span>.
            </span>
          </h1>

          <h1 class="text-2xl font-medium mt-5">
            <span class="block">
              Ici, vous pouvez gérez vos assignations personnalisées pour
              <span class="text-indigo-500">SCP:SL</span>.
            </span>

            <span class="=block">
              Si vous ne connaissez pas cette fonctionnalité, c'est une option du jeu qui permet de
              créer <span class="text-indigo-500">vos propre raccourcis</span>, pour exécuter
              <span class="text-indigo-500">les commandes que vous voulez</span>.
            </span>
          </h1>

          <div class="mt-12 inline-flex rounded-md shadow">
            <button
              @click="setVisited()"
              class="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Commencer
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
