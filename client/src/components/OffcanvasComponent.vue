<template>
  <div class="offcanvas" :class="settings" tabindex="-1" :id="offcanvasId" :aria-labelledby="offcanvasId + 'Label'">
    <div class="offcanvas-header p-0">
      <slot name="offcanvasHeader">
        <h5 class="offcanvas-title" :id="offcanvasId + 'Label'">
          <slot name="offcanvasTitle"></slot>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </slot>
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
    settings: { type: String, default: 'offcanvas-start' }
  },

  setup() {
    return {
      // account: computed(() => AppState.account),

    }
  }
};
</script>


<style lang="scss" scoped></style>