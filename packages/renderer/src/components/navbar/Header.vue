<script lang="ts" setup>
import Link from '/src/components/navbar/Link.vue';
import logo from '../../../assets/logo.svg';
import {filteredRoutes} from '/@/router';
</script>

<template>
  <nav class="bg-gray-800 fixed w-full py-4 z-10 test top-6">
    <div class="px-8 mx-auto max-w-7xl flex items-center h-16">
      <router-link
        to="/"
        class="flex items-center"
      >
        <img
          class="w-12"
          :src="logo"
          alt="Workflow"
        />
        <h1 class="uppercase ml-2 text-white font-bold text-2xl tracking-wider">access hub</h1>
      </router-link>

      <div class="flex items-baseline ml-10 space-x-4">
        <Link
          v-for="(route, index) in filteredRoutes"
          :key="index"
          :link="route.path"
          :text="route.name"
        />
      </div>
    </div>
  </nav>
</template>
