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

    <!-- ProjectList & ProjectSettings Offcanvas/Modal Buttons -->
    <div class="d-flex flex-column position-absolute ">
      <button data-bs-toggle="offcanvas" data-bs-target="#create-project" aria-controls="create-project"
        class="px-4 mb-2 fs-1 bg-primary text-white border-0 selectable darken-20">
        P
      </button>
      <button data-bs-toggle="offcanvas" data-bs-target="#edit-project" aria-controls="create-project"
        class="px-4 fs-1 bg-gray text-dark border-0 selectable lighten-30">
        <i class="mdi mdi-cog"></i>
      </button>
    </div>

  </span>

  <OffcanvasComponent :offcanvasId="'project-list'">
    <template #offcanvasBody>
      <ProjectList :showMembers="false" :createBtn="'bottom'" />
    </template>
  </OffcanvasComponent>
</template>


<script>
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { computed, onMounted } from 'vue';
import { AppState } from "../AppState.js";
import { projectService } from '../services/ProjectService.js'
import OffcanvasComponent from "../components/OffcanvasComponent.vue";
import ProjectList from "../components/ProjectList.vue";
import { onBeforeRouteUpdate } from "vue-router";

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

    // watchEffect(() => {
    //   if (route.params.projectId) {
    //     _getProjectById();
    //     _getSprintsByProjectId();
    //     _getTasksByProjectId();
    //   }
    // })

    onBeforeRouteUpdate(() => {
      _getProjectById();
      _getSprintsByProjectId();
      _getTasksByProjectId();
    })

    onMounted(() => {
      if (AppState.activeProject.id != route.params.projectId) {
        _getProjectById();
        _getSprintsByProjectId();
        _getTasksByProjectId();
      }
    });

    return {
      account: computed(() => AppState.account),
      activeProject: computed(() => AppState.activeProject),
    };
  },
  components: { OffcanvasComponent, ProjectList }
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