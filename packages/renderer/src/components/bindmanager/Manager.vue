<script lang="ts" setup>
import {
  humanKey,
  addBind,
  getCommandEnum,
  getBindEnum,
  deleteBind,
  getBindData,
  getKey,
} from '#preload';
import {useBindStore} from '/@/store/bind';
import {storeToRefs} from 'pinia';
import {useNotification} from '@kyvg/vue3-notification';
import {useModal} from 'vue-final-modal';
import BindModal from '/src/components/commons/modals/Bind.vue';
import vue3SimpleTypehead from '/@/components/commons/vue3-simple-typehead.vue';

const {notify} = useNotification();
const bindStore = useBindStore();
const {activeBind} = await storeToRefs(bindStore);
const {addBindData, deleteBindData, editBindData} = bindStore;

interface BindModalAttrs {
  inputKey?: boolean | number | undefined;
}

const {open, close, destroy, options} = useModal({
  component: BindModal,
  attrs: {
    inputKey: true,
  } as BindModalAttrs,
});

async function detectKey() {
  await open();

  let key = await getKey();
  while (key === undefined) {
    key = await getKey();
    options.attrs.inputKey = key;
  }

  options.attrs.inputKey = key;

  await new Promise(resolve => setTimeout(resolve, 500));

  // If Escape, do not save the key
  if (key !== 27) activeBind.value.key = String(key);

  await close();
  options.attrs.inputKey = true;
}

function updateKey(keyName: string): void {
  const keyCode = getBindEnum[keyName];
  if (keyCode !== undefined) {
    activeBind.value.key = String(keyCode);
  }
}

function autoSuggestEvent(event) {
  activeBind.value.command = typeof event == 'string' ? event : event.input;
}
const commandEnum = await getCommandEnum();
const commandDisplayValue = Object.values(commandEnum);
const commandDisplayName = item => {
  return Object.keys(commandEnum).find(k => commandEnum[k] === item);
};

async function add() {
  const {key, command, id} = activeBind.value;
  const updated = id !== -1;

  const result = await addBind(key, command, updated);

  if (!result.status) {
    notify({
      title: 'Erreur',
      type: 'notif-error',
      text: result.message,
    });
    return;
  }

  if (updated) {
    editBindData(id, key, command);
  } else {
    activeBind.value = {key: '', command: '', id: 0};
    addBindData(key, command);
  }

  notify({
    title: 'Succès',
    type: 'notif-success',
    text: result.message,
  });
}
async function remove() {
  const {key, command, id} = activeBind.value;

  const result = await deleteBind(key, command);

  if (!result.status) {
    notify({
      title: 'Erreur',
      type: 'notif-error',
      text: result.message,
    });
    return;
  }

  deleteBindData(id);
  activeBind.value = {key: '', command: '', id: 0};
  notify({
    title: 'Succès',
    type: 'notif-success',
    text: result.message,
  });
}
</script>

<template>
  <section
    v-if="activeBind && activeBind.id == 0"
    class="col-span-2"
  >
      <div class="container max-w-2xl mx-auto shadow-md md:w-3/4 mt-5">
        <div class="p-4 rounded-lg bg-gray-800">
          <div class="inline-flex items-center space-x-4">
          <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-blue-900">
            <span
              aria-hidden="true"
              class="absolute inset-0 bg-blue-200 rounded-full opacity-100"
            >
            </span>
            <span class="relative"><font-awesome-icon :icon="['fas', 'circle-info']" /></span>
          </span>
            <h1 class="text-white font-medium">Commençons</h1>
          </div>
        </div>
        <div class="bg-gray-800 rounded-lg mt-2">
          <div class="items-center w-full p-4 space-y-4 text-gray-400 md:inline-flex md:space-y-0">
            <h2 class="font-bold text-white text-xl">
              <span class="block text-indigo-500"> Choisissez une assignation ou créez en une. </span>
              <span class="block mt-2 font-normal">Vous pouvez cliquez sur le bouton vert en dessous pour créer votre première assignation.</span>
            </h2>
          </div>

        </div>
      </div>
  </section>

  <section
    v-else-if="activeBind.id == -1"
    class="col-span-2 mt-5"
  >
    <div class="container max-w-2xl mx-auto shadow-md md:w-3/4">
      <div class="p-4 rounded-lg bg-gray-800">
        <div class="inline-flex items-center space-x-4">
          <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
            <span
              aria-hidden="true"
              class="absolute inset-0 bg-green-200 rounded-full opacity-100"
            >
            </span>
            <span class="relative"><font-awesome-icon :icon="['fas', 'plus']" /></span>
          </span>
          <h1 class="text-white font-medium"> Nouvelle assignation </h1>
        </div>
      </div>
      <div class="bg-gray-800 rounded-lg mt-2">
        <div class="items-center w-full p-4 space-y-4 text-gray-400 md:inline-flex md:space-y-0">
          <h2 class="max-w-sm mx-auto md:w-1/3"> Touche </h2>
          <div
            class="max-w-sm mx-auto md:w-2/3 grid gap-2"
            :class="{'grid-cols-1': !activeBind.key, 'grid-cols-2': activeBind.key}"
          >
            <p
              v-if="activeBind.key"
              class="rounded-lg py-2 px-4 bg-white text-gray-700 shadow-sm text-base text-center"
              >{{ humanKey(activeBind.key) }}</p
            >

            <button
              @click="detectKey"
              class="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              {{ activeBind.key ? 'Éditer' : 'Cliquez pour ajouter' }}
            </button>
          </div>
        </div>

        <div class="items-center w-full p-4 space-y-4 text-gray-400 md:inline-flex md:space-y-0">
          <h2
            class="max-w-sm mx-auto md:w-1/3"
            @click="autoSuggestEvent"
          >
            Commande
          </h2>
          <div class="max-w-sm mx-auto space-y-5 md:w-2/3">
            <div class="relative">
              <vue3SimpleTypehead
                maxlength="80"
                class="rounded-lg border-transparent appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Commencez à écrire..."
                :items="commandDisplayValue"
                :itemProjection="commandDisplayName"
                :minInputLength="0"
                @selectItem="autoSuggestEvent"
                @onInput="autoSuggestEvent"
              />
            </div>
          </div>
        </div>

        <div class="px-4 pb-4">
          <button
            @click="add"
            class="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </section>

  <section
    v-else
    class="col-span-2 mt-5"
  >
    <div class="container max-w-2xl mx-auto shadow-md md:w-3/4">
      <div class="p-4 rounded-lg bg-gray-800">
        <div class="inline-flex items-center space-x-4">
          <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
            <span
              aria-hidden="true"
              class="absolute inset-0 bg-green-200 rounded-full opacity-100"
            >
            </span>
            <span class="relative">{{ humanKey(activeBind.key) }}</span>
          </span>
          <h1 class="text-white font-medium break-all">
            {{ activeBind.command }}
          </h1>
        </div>
      </div>
      <div class="bg-gray-800 rounded-lg mt-2">
        <div class="items-center w-full p-4 space-y-4 text-gray-400 md:inline-flex md:space-y-0">
          <h2 class="max-w-sm mx-auto md:w-1/3">
            Touche
            <Popper
              arrow
              hover
              content="Si vous voulez modifier la touche, créez une nouvelle assignation."
            >
              <font-awesome-icon :icon="['fas', 'circle-info']" />
            </Popper>
          </h2>
          <div class="max-w-sm mx-auto md:w-2/3">
            <div class="relative">
              <input
                disabled
                :value="humanKey(activeBind.key)"
                type="text"
                class="rounded-lg border-transparent appearance-none w-full py-2 px-4 bg-gray-400 text-gray-700 cursor-not-allowed placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Appuyez"
              />
            </div>
          </div>
        </div>

        <div class="items-center w-full p-4 space-y-4 text-gray-400 md:inline-flex md:space-y-0">
          <h2 class="max-w-sm mx-auto md:w-1/3">Commande</h2>
          <div class="max-w-sm mx-auto space-y-5 md:w-2/3">
            <div class="relative">
              <vue3SimpleTypehead
                :key="activeBind.id"
                maxlength="80"
                class="rounded-lg border-transparent appearance-none w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Commencez à écrire..."
                :items="commandDisplayValue"
                :itemProjection="commandDisplayName"
                :minInputLength="0"
                :defaultItem="activeBind.command"
                @selectItem="autoSuggestEvent"
                @onInput="autoSuggestEvent"
              />
            </div>
          </div>
        </div>

        <div class="px-4 pb-4 grid gap-2 grid-cols-2">
          <button
            @click="remove"
            class="py-2 px-4 bg-red-700 hover:bg-red-800 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Supprimer
          </button>
          <button
            @click="add"
            class="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
