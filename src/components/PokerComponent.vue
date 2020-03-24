<template>
  <div class="btn-toolbar" role="toolbar">
    <div class="btn-group mr-2" role="group">
      <button
        v-for="(point, index) in points"
        :key="index"
        @click="select(point)"
        type="button"
        :class="['btn', currentPoint == point ? 'btn-primary' : 'btn-outline-primary']"
      >
        {{ point }}
      </button>
    </div>
    <div class="btn-group" role="group">
      <button
        @click="select(-1)"
        type="button"
        :class="['btn', currentPoint == -1 ? 'btn-secondary' : 'btn-outline-secondary']"
      >
        ?
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PokerComponent extends Vue {
  @Prop() currentPoint!: number;
  points = [0.5, 1, 2, 3, 5, 8, 13];

  select(point: number) {
    this.$emit('onPoint', point);
  }
}
</script>

<style scoped lang="scss">
.btn-primary {
  font-weight: bold !important;
}
</style>
