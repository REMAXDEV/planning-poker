<template>
  <div class="p-5">
    <h1 class="mb-4 text-center">
      <!-- {{ myName || 'guest' | nameFilter }}
      @-->
      {{gameMode}}
      <!--Room Settings -@-->
      <div class="row">
        <div class="col">
          <button @click="toggleSettings" class="btn btn-lg btn-block btn-light">
            Change Game Mode
            <font-awesome-icon icon="cog" size="md" class="text-secondary" />
          </button>
        </div>
      </div>

      <div v-if="settingsOpen" class="row mt-2">
        <div class="col">
          <button
            @click="changeGameMode('Standard')"
            class="btn btn-lg btn-block btn-outline"
            v-bind:class="{'btn-danger' : gameMode==='Standard'}"
          >Standard</button>
        </div>
        <div class="col">
          <button
            @click="changeGameMode('Cheater')"
            class="btn btn-lg btn-block btn-outline"
            v-bind:class="[cheaterMode ? 'btn-danger': 'btn-light']"
          >Cheater</button>
        </div>
        <div class="col">
          <button
            @click="changeGameMode('Timed Voting')"
            class="btn btn-lg btn-block"
            v-bind:class="[timedVoting ? 'btn-danger': 'btn-light']"
          >Timed</button>
        </div>
      </div>
    </h1>
    <div class="mb-4" v-if="!observer">
      <div v-if="timedVoting">
        <div class="col">
          <button
            @click="startVoting"
            v-if="!voting"
            class="btn btn-lg btn-block btn-primary"
          >Start the clock!</button>
        </div>
        <div class="col text-center" v-if="timedVoting && voting">
          <h1>Place your bets!</h1>
          <base-timer-component @timesUp="timesUp" />
        </div>
      </div>
      <poker-component
        v-if="!timedVoting || (timedVoting && voting)"
        @onPoint="point"
        :currentPoint="myPoint"
        class="justify-content-center"
      />
    </div>
    <players-component
      class="table text-center mb-5 bg-light w-auto mx-auto shadow-sm"
      :players="players"
      :showPoints="showPoints"
      :myName="myName"
      :gameMode="gameMode"
      :cheaterModeOn="cheaterMode"
      :timedVoting="timedVoting"
    />
    <div class="row mb-5" v-if="!observer && !timedVoting">
      <div class="col">
        <button @click="clearVotes" class="btn btn-lg btn-block btn-danger">Clear Votes</button>
      </div>
      <div class="col">
        <button @click="showVotes" class="btn btn-lg btn-block btn-primary">Show Votes</button>
      </div>
    </div>
    <div class="text-secondary text-center">
      <p v-if="observer">
        <span class="badge badge-info">info</span> You are an observer of this session.
      </p>
      <p v-if="!observer">
        <span class="badge badge-secondary">Tips</span> To delete a player, right click its name.
      </p>
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
import BaseTimerComponent from '../components/BaseTimer.vue';

import db from '../services/firebase';
import nameFilter from '../filters/nameFilter';
import { Players, Player } from '../types/player';

@Component({
  components: {
    PokerComponent,
    PlayersComponent,
    BaseTimerComponent,
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
  gameMode = 'Standard';
  cheaterMode: boolean = false;
  timedVoting: boolean = false;
  voting: boolean = false;
  settingsOpen: boolean = false;

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
          if (this.nobodyCheated(playerArr) && this.cheaterMode) {
            this.$store.commit('showSuperConfetti');
          };
          this.$store.commit('showConfetti');
        }
      });
    }
  }

  point(pt: number) {
    db.setPoint(pt);
  }

  changeGameMode(mode: string) {
    db.clearVotes();
    this.gameMode = mode;
    switch (mode) {
      case 'Cheater': {
        this.cheaterMode = true;
        this.timedVoting = false;
        break;
      }
      case 'Timed Voting': {
        this.timedVoting = true;
        this.cheaterMode = false;
        break;
      }
      default: {
        this.timedVoting = false;
        this.cheaterMode = false;
      }
    }
  }

  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  }

  startVoting() {
    this.voting = true;
    db.clearVotes();
  }

  timesUp() {
    this.voting = false;
    db.showVotes();
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

  nobodyCheated(playerArr: Player[]): boolean {
    const cheaters = playerArr.filter(player => {
      return player.cheated && player.point >= 0;
    });
    if (cheaters.length > -1) {
      return false;
    }
    return true;
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
      if (this.showPoints && this.cheaterMode) {
        this.players[this.myName].cheated = true;
      }
    }
  }

  beforeDestroy() {
    db.detachListener();
    // disconnect
    db.offline();
  }
}
</script>

<style scoped lang="scss"></style>
