<template>
  <nav class="navbar navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">
      <img src="img/logo.png" class="d-inline-block align-top mr-2" />
      Planning Poker
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HeaderComponent extends Vue {}
</script>

<style scoped lang="scss"></style>
