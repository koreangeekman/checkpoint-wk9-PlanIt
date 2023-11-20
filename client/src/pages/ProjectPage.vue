<template>
  <span class="position-relative">
    <div class="container-fluid px-5">
      <section class="row p-md-5">
        <div class="col-12 p-3 px-md-5">
          <section class="row card bg-light shadow p-3 px-md-5 py-md-4">

          </section>
        </div>
      </section>
    </div>
    <div class="d-flex flex-column position-absolute ">
      <button class="px-4 mb-2 fs-1 bg-primary text-white border-0 selectable darken-20">
        P
      </button>
      <button class="px-4 fs-1 bg-gray text-dark border-0 selectable lighten-30">
        <i class="mdi mdi-cog"></i>
      </button>
    </div>
  </span>
</template>


<script>
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { computed, onMounted } from 'vue';
import { AppState } from "../AppState.js";
import { projectService } from '../services/ProjectService.js'

export default {
  setup() {
    const route = useRoute();

    async function _getProjectById() {
      try { await projectService.getProjectById(route.params.projectId); }
      catch (error) { Pop.error(error); }
    }
    async function _getSprintsByProjectId() {
      try { await projectService.getSprintsByProjectId(route.params.projectId); }
      catch (error) { Pop.error(error); }
    }
    async function _getTasksByProjectId() {
      try { await projectService.getTasksByProjectId(route.params.projectId); }
      catch (error) { Pop.error(error); }
    }

    onMounted(() => {
      if (AppState.activeProject.id != route.params.projectId) {
        _getProjectById();
        _getSprintsByProjectId();
        _getTasksByProjectId();
      }
    })

    return {
      account: computed(() => AppState.account),
      activeProject: computed(() => AppState.activeProject),

    }
  }
}
</script>


<style scoped lang="scss">
.courier {
  font-family: 'Courier New', Courier, monospace;
}

.memberImg {
  height: 3rem;
  width: 3rem;
  border: 1px solid black;
}

.projectOwner {
  border: 2px solid blue;
}
</style>