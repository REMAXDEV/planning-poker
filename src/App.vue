<template>
  <div id="app" class="mx-auto bg-light shadow-sm position-relative">
    <transition name="fade">
      <confetti-component v-if="$store.state.confetti" />
    </transition>
    <header-component />
    <div class="position-relative">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderComponent from './components/HeaderComponent.vue';
import ConfettiComponent from './components/ConfettiComponent.vue';

@Component({
  components: {
    HeaderComponent,
    ConfettiComponent,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './styles/reset-bootstrap.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import './styles/global.scss';
#app {
  max-width: 500px;
  min-height: 100%;
  overflow: hidden;
  .view {
    z-index: 10;
  }
}
</style>
