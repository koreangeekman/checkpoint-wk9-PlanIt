<template>
  <div class="container-fluid">
    <section class="row p-md-5">
      <div class="col-12 p-3 px-md-5">
        <div v-if="user" class="card bg-light shadow p-3 px-md-5 py-md-4">
          <ProjectList :showMembers="true" :createBtn="'top'" />
        </div>
        <div v-else class="card bg-light shadow p-3 px-md-5 py-md-4">
          <p class="text-center my-3">Please login to access your projects</p>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from "../AppState.js";
import ProjectList from "../components/ProjectList.vue";

export default {
  setup() {

    return {
      user: computed(() => AppState.user.isAuthenticated),

    }
  },
  components: { ProjectList }
}
</script>


<style scoped lang="scss"></style>