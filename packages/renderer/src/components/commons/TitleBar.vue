<script lang="ts" setup>
import {WindowController} from '#preload';
</script>

<template>
  <div class="titlebar fixed w-full bg-gray-900 flex cursor-pointer z-50 top-0">
    <div
      class="text-white w-full ml-3 text-sm flex self-center"
      style="-webkit-app-region: drag"
    >
      <p>Access Hub</p>
    </div>
    <div class="flex">
      <div
        @click="WindowController.minimize()"
        class="flex items-center px-3 hover:bg-gray-800"
      >
        <svg>
          <path
            fill="#fff"
            d="M20,14H4V10H20"
          />
        </svg>
      </div>
      <div
        @click="WindowController.maximize()"
        class="flex items-center px-3 hover:bg-gray-800"
      >
        <svg>
          <path
            fill="#fff"
            d="M4,4H20V20H4V4M6,8V18H18V8H6Z"
          />
        </svg>
      </div>
      <div
        @click="WindowController.close()"
        class="flex items-center px-3 hover:bg-red-600"
      >
        <svg>
          <path
            fill="#fff"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.titlebar {
  height: 26px;
}
svg {
  width: 24px;
  height: 24px;
}
</style>
