<template>
  <table>
    <thead class="thead-dark">
      <tr>
        <th scope="col">Player</th>
        <th scope="col">Point</th>
      </tr>
    </thead>
    <tbody :class="{ 'table-success': showPoints }">
      <tr v-for="(player, index) in players" :key="index" :class="{ 'table-warning': player.point == 0 }">
        <td @contextmenu="deletePlayer($event, index)">{{ index | nameFilter }}</td>
        <td>
          <font-awesome-icon
            v-if="!showPoints && player.point != 0"
            icon="check-circle"
            size="lg"
            class="text-success"
          />
          <font-awesome-icon v-else-if="!showPoints" icon="question-circle" size="lg" class="text-secondary" />
          <template v-if="(index === myName || showPoints) && player.point != 0">
            {{ player.point > 0 ? player.point : '?' }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import db from '../services/Firebase';
import { Players } from '../types/player';
import nameFilter from '../filters/nameFilter';

@Component({
  components: {},
  filters: {
    nameFilter,
  },
})
export default class PlayersComponent extends Vue {
  @Prop() players!: Players;
  @Prop() showPoints!: boolean;
  @Prop() myName!: string;

  deletePlayer(e: Event, player: string) {
    e.preventDefault();
    if (confirm('Delete player "' + player + '" ?')) {
      db.deletePlayer(player);
    }
  }
}
</script>

<style scoped lang="scss">
table {
  min-width: 16em;
}
</style>
