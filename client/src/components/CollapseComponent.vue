<template>
  <div class="collapse bg-grey lighten-10 border-top border-primary rounded-bottom p-3" :id="collapseId">
    <slot name="collapseBody"></slot>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Sprint } from "../models/Sprint.js";

export default {
  props: {
    collapseId: { type: String },
    // sprint: { type: Sprint }
  },

  setup() {
    return {
      account: computed(() => AppState.account),

    }
  }
};
</script>


<style lang="scss" scoped></style>