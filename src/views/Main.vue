<template>
  <div class="p-5">
    <h1 class="mb-4 text-center">{{ myName | nameFilter }}</h1>
    <div class="mb-4">
      <poker-component @onPoint="point" :currentPoint="myPoint" class="justify-content-center" />
    </div>
    <players-component
      class="table text-center mb-5 bg-light w-auto mx-auto shadow-sm"
      :players="players"
      :showPoints="showPoints"
      :myName="myName"
    />
    <div class="row mb-5">
      <div class="col">
        <button @click="clearVotes" class="btn btn-lg btn-block btn-danger">Clear Votes</button>
      </div>
      <div class="col">
        <button @click="showVotes" class="btn btn-lg btn-block btn-primary">Show Votes</button>
      </div>
    </div>
    <div class="text-secondary text-center">
      <p><span class="badge badge-secondary">Tips</span> To delete a player, right click its name.</p>
      <!-- <pre>{{ players }}</pre> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PokerComponent from '../components/PokerComponent.vue';
import PlayersComponent from '../components/PlayersComponent.vue';

import db from '../services/firebase';
import nameFilter from '../filters/nameFilter';
import { Players } from '../types/player';

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

  // from database
  showPoints = false;
  players: Players = {};

  created() {
    this.room = this.$route.params.room.toLowerCase();
    this.myName = localStorage.getItem('myName') || '';
    if (!this.myName) {
      const name = prompt('Welcome! May I have your name?');
      if (name) {
        localStorage.setItem('myName', name.toLowerCase());
        this.myName = name;
      } else {
        this.myName = 'Guest';
      }
    }
    // init
    db.signIn(this.room, this.myName);
  }

  mounted() {
    db.watch(snapshot => {
      const res = snapshot.val();
      this.players = res.players;
      this.myPoint = this.players[this.myName].point;
      //
      this.showPoints =
        res.showPoints == 1
          ? true
          : Object.values(this.players).filter(player => {
              return player.point == 0;
            }).length === 0;
    });
    // init
    this.point(0);
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

  beforeDestroy() {
    db.detachListener();
  }
}
</script>

<style scoped lang="scss"></style>
