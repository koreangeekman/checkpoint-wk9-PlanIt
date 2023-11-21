<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" :id="offcanvasId" :aria-labelledby="offcanvasId + 'Label'">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" :id="offcanvasId + 'Label'">
        <slot name="offcanvasTitle"></slot>
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <slot name="offcanvasBody"></slot>
    </div>
  </div>
</template>


<script>
// import { AppState } from '../AppState';
// import { computed } from 'vue';

export default {
  props: {
    offcanvasId: { type: String },

  },

  setup() {
    return {
      // account: computed(() => AppState.account),

    }
  }
};
</script>


<style lang="scss" scoped></style>