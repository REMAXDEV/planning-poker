<template>
  <div class="p-5">
    <h1 class="mb-4 text-center">Sign In</h1>
    <form @submit="onSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Session Name</label>
        <input type="text" class="form-control" placeholder="e.g. remax/motto..." v-model="room" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Your Name</label>
        <input type="text" class="form-control" v-model="myName" />
      </div>
      <div class="mt-4">
        <button type="submit" class="btn btn-primary">Join Session</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Signin extends Vue {
  room = '';
  myName = '';

  mounted() {
    this.myName = localStorage.getItem('myName') || '';
    this.room = localStorage.getItem('room') || '';
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.myName = this.myName.toLowerCase().trim();
    this.room = this.room.toLowerCase().trim();
    if (this.myName) {
      localStorage.setItem('myName', this.myName);
    }
    if (this.room) {
      localStorage.setItem('room', this.room);
      this.$router.push('/' + this.room);
    }
  }
}
</script>

<style scoped lang="scss"></style>
