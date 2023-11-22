<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalId + 'Label'" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="modalId + 'Label'">
            <slot name="modalTitle"></slot>
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="modalBody"></slot>
        </div>
        <div v-if="showFooter" class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <slot name="modalSubmit"></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';

export default {
  props: {
    modalId: { type: String },
    showFooter: { type: Boolean, default: false },
  },

  setup() {
    return {

    }
  }
};
</script>


<style lang="scss" scoped></style>