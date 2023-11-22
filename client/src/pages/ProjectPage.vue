<template>
  <span class="position-relative">
    <div class="container-fluid px-5" v-if="activeProject?.id">
      <section class="row p-md-5">
        <div class="col-12 px-md-5">
          <span class="d-flex align-items-center">
            <p class="fs-1 fw-bold mb-0">
              {{ activeProject.name }}
            </p>
            <button class="btn selectable darken-20 mx-2 p-1 fs-1">
              <i class="text-primary mdi mdi-delete-forever"></i>
            </button>
          </span>
          <small>
            <p class="">{{ activeProject.description }}</p>
          </small>
        </div>
        <div class="col-12 px-md-5 d-flex align-items-center justify-content-between">
          <span class="">
            <p class="mb-0 fs-5 fw-bold text-primary darken-20">Sprints</p>
            <small>
              <p class="mb-0">
                Group your tasks into sprints for over-arching collections for better organization.
              </p>
            </small>
          </span>
          <button class="btn btn-primary mx-3 py-2 px-md-5" data-bs-toggle="modal" data-bs-target="#create-sprint">
            Add Sprint
          </button>
        </div>
        <section v-for="sprint in sprints" class="row p-3 px-md-5 py-md-4 my-1">
          <div class="col-12 bg-light shadow p-0 border border-primary rounded">
            <span class="d-flex align-items-center rounded-top py-3 px-4" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#' + sprint.id" aria-expanded="false" :aria-controls="collapseId">
              <i class="fs-1 mdi mdi-abacus"></i>
              <p class="mb-0 mx-3 fw-bold fs-5"> {{ sprint.name }} </p>
              <span class="text-primary fs-5 d-flex align-items-center ms-3 me-auto">
                <p class="mb-0 fw-bold fs-5">{{ sprint.weight + 1 }}</p>
                <i class="fs-2 mdi mdi-weight"></i>
              </span>
              <span class="d-flex">
                <button class="btn btn-primary ps-3 py-0">
                  Add Task <i class="fs-5 mdi mdi-plus"></i>
                </button>
                <p class="mb-0 ms-3 fw-bold fs-5">{{ taskDone + '/' + tasks.length }} Tasks Complete</p>
              </span>
            </span>
            <span class="rounded-bottom">
              <CollapseComponent :collapseId="sprint.id">
                <template #collapseBody>
                  boop
                </template>
              </CollapseComponent>
            </span>
          </div>
        </section>
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

  <!-- ProjectList & ProjectSettings Offcanvas/Modal Buttons -->
  <OffcanvasComponent :offcanvasId="'project-list'">
    <template #offcanvasBody>
      <ProjectList :showMembers="false" :createBtn="'bottom'" />
    </template>
  </OffcanvasComponent>

  <ModalComponent>
    <template #modalTitle>
      Create Sprint
    </template>
    <template #modalBody>
      <form @submit.prevent="createSprint()">
        <label for="name">Name</label>
        <input type="text" class="form-control" maxlength="50" placeholder="Name..." required>
        <button class="btn btn-primary" type="submit">Create</button>
      </form>
    </template>
  </ModalComponent>
</template>


<script>
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { computed, onMounted } from 'vue';
import { onBeforeRouteUpdate } from "vue-router";
import { projectService } from '../services/ProjectService.js'
import OffcanvasComponent from "../components/OffcanvasComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import ProjectList from "../components/ProjectList.vue";
import CollapseComponent from "../components/CollapseComponent.vue";

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
    async function _getNotesByProjectId() {
      try { await projectService.getNotesByProjectId(route.params.projectId); }
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
      _getNotesByProjectId();
    })

    onMounted(() => {
      if (AppState.activeProject.id != route.params.projectId) {
        _getProjectById();
        _getSprintsByProjectId();
        _getTasksByProjectId();
        _getNotesByProjectId();
      }
    });

    return {
      account: computed(() => AppState.account),
      activeProject: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      notes: computed(() => AppState.notes),

    };
  },
  components: { OffcanvasComponent, ProjectList, ModalComponent, CollapseComponent }
}
</script>


<style scoped lang="scss">
.courier {
  font-family: 'Courier New', Courier, monospace;
}

.fs-1 {
  line-height: 2.4rem;
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