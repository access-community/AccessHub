<script lang="ts" setup>
import {humanKey} from '#preload';
import {useBindStore} from '/@/store/bind';
import {storeToRefs} from 'pinia';

const bindStore = useBindStore();
const {setActive, activeBind} = bindStore;

const {data} = storeToRefs(bindStore);

function isEmpty(obj: object) {
  return !obj || !Object.values(obj).some(x => x !== void 0);
}
</script>
<template>
  <div class="flex flex-col col-span-5">
    <div
      class="p-4 bg-gray-800 mt-5 xl:rounded-md rounded-r-md"
    >
      <div class="max-w-sm mx-auto md:w-full md:mx-0">
        <div class="inline-flex items-center space-x-4">
          <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
            <span
              aria-hidden="true"
              class="absolute inset-0 bg-green-200 rounded-full opacity-100"
            >
            </span>
            <span class="relative"> <font-awesome-icon :icon="['far', 'keyboard']" /> </span>
          </span>
          <h1 class="text-white font-medium"> Vos touches </h1>
        </div>
      </div>
    </div>

    <div
      v-if="isEmpty(data)"
      class="px-5 py-5 text-sm bg-gray-800 mt-2 xl:rounded-lg rounded-r-lg"
    >
      <p class="text-indigo-500 p-4 font-bold text-lg">Aucune assignation.</p>
    </div>

    <div
      v-else
    >
      <div class="sticky top-0 z-10 bg-gray-900 flex items-center text-center text-sm font-bold text-white uppercase">
        <div class="px-5 py-3 w-5/12">
          Touche
        </div>
        <div class="px-5 py-3 w-7/12">
          Commande associée
        </div>
      </div>

      <div
        style="max-height: 55.8vh"
        class="overflow-y-scroll pr-1"
      >
        <div
          v-for="([key, command], id) in data"
          :key="id"
          :class="{ 'rounded-tr-md xl:rounded-t-md': id == 1 }"
          class="hover:bg-gray-700 bg-gray-800 cursor-pointer flex items-center xl:last:rounded-b-md duration-75 border-b border-gray-600 last:border-0 last:rounded-br-md"
          @click="setActive(id)"
        >
          <div class="px-5 py-4 text-sm w-5/12">
          <span
            class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
          >
            <span
              aria-hidden="true"
              class="absolute inset-0 bg-green-200 rounded-full opacity-100"
            ></span>
            <span class="relative">{{ humanKey(key) }}</span>
          </span>
          </div>
          <div class="px-5 py-2 text-sm w-7/12">
            <p
              class="bg-blue-200 break-all text-blue-900 px-3 py-2 whitespace-pre-wrap font-semibold rounded"
            >
              {{ command }}
            </p>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>
