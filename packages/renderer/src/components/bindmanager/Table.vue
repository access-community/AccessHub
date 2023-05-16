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
  <div class="flex flex-col">
    <div
      v-if="!isEmpty(data)"
      class="p-4 bg-gray-800 mt-5 rounded-lg hidden xl:block"
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
      class="px-5 py-5 text-sm bg-gray-800 mt-5 xl:rounded-lg rounded-r-lg"
    >
      <p class="text-indigo-500 p-4 font-bold text-lg">Aucune assignation.</p>
    </div>

    <div
      v-else
      class="inline-block min-w-full overflow-y-scroll"
      style="max-height: 80.5vh"
    >
      <table class="min-w-full leading-normal">
        <thead class="sticky top-0 z-10">
          <tr>
            <th
              scope="col"
              class="px-5 py-3 text-sm font-bold text-left text-white uppercase bg-gray-900"
            >
              Touche
            </th>
            <th
              scope="col"
              class="px-5 py-3 text-sm font-bold text-left text-white uppercase bg-gray-900"
            >
              Commande associée
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="([key, command], id) in data"
            :key="id"
            class="bg-gray-800 hover:bg-gray-700 cursor-pointer duration-75 border-b border-gray-600 last:border-0"
            @click="setActive(id)"
          >
            <td class="px-5 py-5 text-sm">
              <span
                class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
              >
                <span
                  aria-hidden="true"
                  class="absolute inset-0 bg-green-200 rounded-full opacity-100"
                >
                </span>
                <span class="relative"> {{ humanKey(key) }} </span>
              </span>
            </td>
            <td class="px-5 py-5 text-sm">
              <p
                class="bg-blue-200 break-all text-blue-900 p-4 whitespace-pre-wrap rounded font-semibold"
              >
                {{ command }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
