<script lang="ts" setup>
import TitleBar from '/src/components/commons/TitleBar.vue';
import Header from '/src/components/navbar/Header.vue';
import {ModalsContainer} from 'vue-final-modal';
import {writeApiData} from '#preload';

writeApiData();
</script>

<template>
  <TitleBar />
  <Header />

  <div class="content bg-gray-900">

    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Transition name="fade" mode="out-in" :key="route.path">
          <KeepAlive>
            <Suspense timeout="0">
              <component :is="Component"></component>
              <template #fallback>
                <div class="text-white text-3xl flex items-center justify-center pt-6">
                  <svg class="animate-spin h-7 w-7 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" stroke="currentColor" stroke-width="4" cx="12" cy="12" r="10"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <h1 class="ml-2 font-medium">Chargement</h1>
                </div>
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>

  </div>

  <ModalsContainer />
  <div class="!top-32">
    <notifications
      :max="3"

      :ignore-duplicates="true"
      position="bottom left"
      :pauseOnHover="true"
      classes="border-l-4 p-4 mt-1 rounded-r-md"
    />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.notif-success {
  @apply !bg-green-200 border-green-600 text-green-600;
}
.notif-error {
  @apply !bg-red-200 border-red-600 text-red-600;
}
.notif-warn {
  @apply !bg-yellow-200 border-yellow-600 text-yellow-600;
}
.notif-info {
  @apply !bg-blue-200 border-blue-600 text-blue-600;
}

:root {
  --popper-theme-background-color: #4b5563;
  --popper-theme-background-color-hover: #4b5563;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 15px;
}

*,
*::after,
*::before {
  -webkit-user-select: none;
  -webkit-user-drag: none;
}

*::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

*::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
  border-radius: 10px;
}

body {
  overflow-y: hidden;
}

#app {
  font-family: Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol, Noto Color Emoji;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {
  margin-top: calc(96px + 24px);
  min-height: calc(100vh - (96px + 24px));
  max-height: calc(100vh - (96px + 24px));
}

/*Autosuggest*/

.simple-typeahead .simple-typeahead-list {
  @apply rounded-lg absolute w-full border-0 z-10 overflow-y-auto max-h-56 xl:max-h-96;
}

.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item {
  @apply cursor-pointer first:rounded-t-lg last:rounded-b-lg px-2 py-2 bg-white text-gray-600 last:border-0;
  border-right-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 1px;
}

.simple-typeahead
  .simple-typeahead-list
  .simple-typeahead-list-item.simple-typeahead-list-item-active {
  @apply bg-gray-100;
}
</style>
