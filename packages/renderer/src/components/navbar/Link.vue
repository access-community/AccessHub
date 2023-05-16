<script lang="ts" setup>
defineProps<{
  link: string;
  text: string;
}>();
</script>

<template>
  <router-link
    class="text-gray-400 hover:text-white px-3 text-md font-medium duration-100 tracking-wide"
    :to="link"
  >
    {{ text }}
  </router-link>
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  @apply text-white;
}
</style>
