<template>
  <div class="p-5">
    <h1 class="mb-4 text-center">
      <!-- {{ myName || 'guest' | nameFilter }}
      @ -->
      {{ room | nameFilter }}
    </h1>
    <div class="mb-4" v-if="!observer">
      <poker-component @onPoint="point" :currentPoint="myPoint" class="justify-content-center" />
    </div>
    <players-component
      class="table text-center mb-5 bg-light w-auto mx-auto shadow-sm"
      :players="players"
      :showPoints="showPoints"
      :myName="myName"
    />
    <div class="row mb-5" v-if="!observer">
      <div class="col">
        <button @click="clearVotes" class="btn btn-lg btn-block btn-danger">Clear Votes</button>
      </div>
      <div class="col">
        <button @click="showVotes" class="btn btn-lg btn-block btn-primary">Show Votes</button>
      </div>
    </div>
    <div class="text-secondary text-center">
      <p v-if="observer"><span class="badge badge-info">info</span> You are an observer of this session.</p>
      <p v-if="!observer"><span class="badge badge-secondary">Tips</span> To delete a player, right click its name.</p>
      <!-- <pre>{{ players }}</pre> -->
      <p>
        <a href @click.prevent="refresh">Refresh</a>
        |
        <a href @click.prevent="logout">Log Out</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PokerComponent from '../components/PokerComponent.vue';
import PlayersComponent from '../components/PlayersComponent.vue';

import db from '../services/firebase';
import nameFilter from '../filters/nameFilter';
import { Players, Player } from '../types/player';

@Component({
  components: {
    PokerComponent,
    PlayersComponent,
  },
  filters: {
    nameFilter,
  },
})
export default class Main extends Vue {
  room = '';
  myName = '';
  myPoint = 0;
  observer: boolean = false;

  // from database
  showPoints = false;
  players: Players = {};

  created() {
    this.room = this.$route.params.room.toLowerCase().trim();
    this.observer = (this.$route.query.observer as string) == '1';
    if (!this.observer) {
      this.myName = this.$store.getters.getName;
    }
    this.$store.commit('setRoom', this.room);
  }

  mounted() {
    if (!this.room || (!this.myName && !this.observer)) {
      this.$router.push('/');
    } else {
      // init
      db.signIn(this.room, this.myName);
      // listener
      db.watch(snapshot => {
        const res = snapshot.val();
        this.players = res.players;
        //
        this.updateMyPoint();
        //
        const playerArr = Object.values(this.players);
        this.showPoints = res.showPoints == 1 ? true : this.allPlayersVoted(playerArr);
        if (this.isConsistent(playerArr)) {
          this.$store.commit('showConfetti');
        }
      });
    }
  }

  point(pt: number) {
    db.setPoint(pt);
  }

  clearVotes() {
    db.clearVotes();
  }

  showVotes() {
    db.showVotes();
  }

  refresh() {
    window.location.reload();
  }

  logout() {
    db.deletePlayer(this.myName);
    this.$router.push('/');
  }

  isConsistent(playerArr: Player[]): boolean {
    const validPlayerArr = playerArr.filter(player => {
      return player.connected && player.point >= 0;
    });
    const consistent =
      validPlayerArr.length >= 2 &&
      validPlayerArr[0].point > 0 &&
      validPlayerArr.every(player => {
        return player.point == validPlayerArr[0].point;
      });
    return consistent;
  }

  allPlayersVoted(playerArr: Player[]) {
    return (
      playerArr.filter(player => {
        return player.point == 0;
      }).length === 0
    );
  }

  updateMyPoint() {
    if (this.players[this.myName]) {
      this.myPoint = this.players[this.myName].point;
    }
  }

  beforeDestroy() {
    db.detachListener();
  }
}
</script>

<style scoped lang="scss"></style>
