<template>
  <div id="desktop" class="d-flex flex-wrap justify-content-around align-items-center mx-auto">
    <single-player-component
      v-for="(player, name) in players"
      :key="name"
      :player="player"
      :name="name"
      :myName="myName"
      :showPoints="showPoints"
      :cheated="checkCheaters(player)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Players, Player } from '../types/player';
import SinglePlayerComponent from './SinglePlayerComponent.vue';

@Component({
  components: {
    SinglePlayerComponent,
  },
})
export default class PlayersComponent extends Vue {
  @Prop() players!: Players;
  @Prop() showPoints!: boolean;
  @Prop() myName!: string;
  @Prop() cheaterModeOn!: boolean;
  @Prop() timedVoting!: boolean;

  checkCheaters(player: Player) {
    if (this.cheaterModeOn && player.cheated) {
      return true;
    }
    return false;
  }
}
</script>

<style scoped lang="scss">
#desktop {
  width: 560px;
  height: 300px;

  img {
    width: 130px;
    height: 90px;
    display: block;
  }
}
</style>
