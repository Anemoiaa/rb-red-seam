<template>
  <component :is="this.$route.meta.layout">
    <slot />
  </component>
</template>
