<template>
  <div id="app" class="mx-auto bg-light shadow-sm">
    <header-component />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderComponent from './components/HeaderComponent.vue';

@Component({
  components: {
    HeaderComponent,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  max-width: 500px;
  min-height: 100%;
}
</style>
