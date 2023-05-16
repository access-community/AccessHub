<template>
  <Popper
    arrow
    hover
    content="Votre clavier est écouté en attente d'une touche."
    class="!text-base"
    placement="auto-start"
  >
    <div class="relative ml-2">
      <font-awesome-icon
        :icon="['far', 'keyboard']"
        class="text-emerald-400 text-2xl"
      />
      <font-awesome-icon
        :icon="['far', 'keyboard']"
        class="text-emerald-400 text-2xl absolute left-0 top-0 animate-ping"
      />
    </div>
  </Popper>
</template>
