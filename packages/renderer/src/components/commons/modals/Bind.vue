<script setup lang="ts">
import {VueFinalModal} from 'vue-final-modal';
import Keyboard from '/@/components/commons/modals/Keyboard.vue';

defineProps<{
  inputKey: boolean | number | undefined;
}>();
</script>

<template>
  <VueFinalModal
    content-class="absolute bottom-0 w-full p-4 space-y-2 z-100 text-white bg-gray-900 text-xl"
    content-transition="vfm-slide-down"
    overlay-transition="vfm-fade"
    :click-to-close="false"
    :esc-to-close="false"
    modal-id="bindModal"
    style="z-index: 50001"
  >
    <h1 class="text-2xl font-extrabold"> Assignation d'une touche </h1>
    <h2 class="pb-5"> Appuyez sur une touche de votre clavier. Échap pour annuler. </h2>

    <h3 class="pb-5">
      <span v-if="inputKey === true">
        En attente...
        <Keyboard />
      </span>

      <span v-else-if="inputKey === undefined">
        La touche n'est pas valide. Recommencez.
        <Keyboard />
      </span>

      <span v-else-if="inputKey === 27">
        Annulation.
        <font-awesome-icon
          :icon="['fas', 'circle-stop']"
          class="text-red-400 animate-pulse"
        />
      </span>

      <span v-else>
        Touche valide.
        <font-awesome-icon
          :icon="['fas', 'circle-check']"
          class="text-green-400 animate-pulse"
        />
      </span>
    </h3>
  </VueFinalModal>
</template>
