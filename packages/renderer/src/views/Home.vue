<script lang="ts" setup>
import logo from '../../assets/logo.svg';
</script>
<template>
  <div>
    <div class="bg-gray-900 flex justify-center logo-wrapper">
      <img
        class="w-1/3"
        :src="logo"
      />
    </div>

    <div class="shapes">
      <div class="shape shape1"></div>
      <div class="shape shape2"></div>
      <div class="shape shape3"></div>
      <div class="shape shape4"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  height: calc(100vh - 7.55rem);
}
img {
  z-index: 50;
  animation: img 2s forwards 1s;
}
@keyframes img {
  0% {
    z-index: 1;
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    z-index: 0;
    opacity: 1;
  }
}
.shapes {
  .shape {
    background-color: rgb(31 41 55);
    width: 50%;
    height: 50%;
    position: fixed;

    &.shape1 {
      top: 0;
      left: 0;
      animation: shape1 2s forwards 2s, shape1Move 10.9s 4.1s infinite;
    }
    &.shape2 {
      right: 0;
      bottom: 0;
      animation: shape2 2s forwards 2s, shape2Move 9.7s 4.1s infinite;
    }
    &.shape3 {
      top: 0;
      right: 0;
      animation: shape3 2s forwards 2s, shape3Move 9.2s 4.1s infinite;
    }
    &.shape4 {
      bottom: 0;
      left: 0;
      animation: shape4 2s forwards 2s, shape4Move 10.3s 4.1s infinite;
    }
  }
}

@keyframes shape1 {
  from {
    transform: translate(0%, 0%) rotate(0deg);
    border-radius: 0;
    box-shadow: none;
  }
  to {
    transform: translate(-20%, -25%) rotate(12deg);
    border-radius: 10px;
    box-shadow: 0 0 5px rgb(31 41 55);
  }
}
@keyframes shape1Move {
  0% {
    transform: translate(-20%, -25%) rotate(12deg);
  }
  25% {
    transform: translate(-16%, -22%) rotate(12.8deg);
  }
  50% {
    transform: translate(-21%, -19%) rotate(12deg);
  }
  75% {
    transform: translate(-17%, -23%) rotate(11.9deg);
  }
  100% {
    transform: translate(-20%, -25%) rotate(12deg);
  }
}
@keyframes shape2 {
  from {
    transform: translate(0%, 0%) rotate(0deg);
    border-radius: 0;
    box-shadow: none;
  }
  to {
    transform: translate(20%, 25%) rotate(12deg);
    border-radius: 10px;
    box-shadow: 0 0 5px rgb(31 41 55);
  }
}
@keyframes shape2Move {
  0% {
    transform: translate(20%, 25%) rotate(12deg);
  }
  25% {
    transform: translate(19%, 22%) rotate(13deg);
  }
  50% {
    transform: translate(23%, 19%) rotate(12deg);
  }
  75% {
    transform: translate(20%, 17%) rotate(14deg);
  }
  100% {
    transform: translate(20%, 25%) rotate(12deg);
  }
}
@keyframes shape3 {
  from {
    transform: translate(0%, 0%) rotate(0deg);
    border-radius: 0;
    box-shadow: none;
  }
  to {
    transform: translate(20%, -25%) rotate(12deg);
    border-radius: 10px;
    box-shadow: 0 0 5px rgb(31 41 55);
  }
}
@keyframes shape3Move {
  0% {
    transform: translate(20%, -25%) rotate(12deg);
  }
  25% {
    transform: translate(19%, -22%) rotate(13deg);
  }
  50% {
    transform: translate(23%, -19%) rotate(12deg);
  }
  75% {
    transform: translate(20%, -16%) rotate(14deg);
  }
  100% {
    transform: translate(20%, -25%) rotate(12deg);
  }
}
@keyframes shape4 {
  from {
    transform: translate(0%, 0%) rotate(0deg);
    border-radius: 0;
    box-shadow: none;
  }
  to {
    transform: translate(-20%, 25%) rotate(12deg);
    border-radius: 10px;
    box-shadow: 0 0 5px rgb(31 41 55);
  }
}
@keyframes shape4Move {
  0% {
    transform: translate(-20%, 25%) rotate(12deg);
  }
  25% {
    transform: translate(-16%, 24%) rotate(12.7deg);
  }
  50% {
    transform: translate(-21%, 26%) rotate(12deg);
  }
  75% {
    transform: translate(-17%, 23%) rotate(11.5deg);
  }
  100% {
    transform: translate(-20%, 25%) rotate(12deg);
  }
}
</style>
