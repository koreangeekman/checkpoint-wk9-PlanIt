<template>
  <span class="position-relative">
    <div class="container-fluid ps-5 px-md-5" v-if="activeProject?.id">
      <section class="row p-0 p-md-5 pt-md-4">
        <div class="col-12 ps-5 px-md-5">
          <span class="d-flex align-items-center">
            <p class="fs-1 fw-bold mb-0">
              {{ activeProject.name }}
            </p>
            <button class="btn selectable darken-20 mx-2 p-1 fs-1" @click="deleteProject()">
              <i class="text-primary mdi mdi-delete-forever"></i>
            </button>
          </span>
          <small>
            <p class="">{{ activeProject.description }}</p>
          </small>
        </div>
        <div class="col-12 ps-5 px-md-5 d-flex align-items-center">
          <span v-if="sprints.length > 0" class="me-auto">
            <p class="mb-0 fs-5 fw-bold text-primary darken-20">Sprints</p>
            <small>
              <p class="mb-0">
                Group your tasks into sprints for over-arching collections for better organization.
              </p>
            </small>
          </span>
          <span v-else class="">
            <div class="d-flex pe-2">
              <p class="m-2 px-3 py-2"> No sprints created </p>
            </div>
          </span>
          <button class="btn btn-outline-primary text-nowrap mx-3 py-2 px-md-5" data-bs-toggle="modal"
            data-bs-target="#create-sprint">
            Add Sprint
          </button>
        </div>

        <section v-for="(sprint, i) in sprints" class="row p-0 px-md-5 py-md-4 my-2">
          <div class="col-12 bg-light shadow p-0 border border-primary rounded">
            <span class="d-flex align-items-center rounded-top py-3 px-2 px-md-4" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#' + sprint.id" aria-expanded="false" :aria-controls="collapseId">
              <i class="fs-1 mdi mdi-abacus" :style="'color:' + colorGen() + ';'"></i>
              <p class="mb-0 mx-3 fw-bold fs-5">S{{ i + 1 }} - {{ sprint.name }} </p>
              <span class="text-primary fs-5 d-flex align-items-center ms-3 me-auto">
                <p class="mb-0 fw-bold fs-5">{{ sprint.weight + 1 }}</p>
                <i class="fs-2 mdi mdi-weight"></i>
              </span>
              <span class="d-flex">
                <button class="btn btn-outline-primary ps-1 ps-md-3 py-0 text-nowrap">
                  Add Task <i class="fs-5 mdi mdi-plus"></i>
                </button>
                <p v-if="tasks.length > 0" class="mb-0 ms-3 fw-bold fs-5">
                  {{ tasks.filter(task => task.isComplete).length + '/' + tasks.length }} Tasks Complete
                </p>
                <p class="mb-0 ms-3 py-0"></p>
              </span>
            </span>

            <span v-if="tasks.length > 0" class="rounded-bottom">
              <CollapseComponent :collapseId="sprint.id">
                <template #collapseBody>
                  <div class="container-fluid">
                    <section v-for="task in tasks" class="row">
                      <div class="col-12 d-flex align-items-center px-0 px-md-5">
                        <input type="checkbox" name="isComplete" id="isComplete" class="mx-3">
                        <p class="mb-0 px-3 py-1 rounded-pill bg-light shadow outline"
                          :style="'border: 2px solid ' + colorGen() + ';'">
                          {{ task.name }}
                        </p>
                        <i class="fs-3 mx-3 text-secondary mdi mdi-delete-forever" type="button"
                          @click="deleteTask(task.id)"></i>
                      </div>
                      <div class="col-10 px-4 px-md-5 py-3 d-flex">
                        <div class="vert me-4 mx-md-4 ps-1"></div>
                        <span class="d-block">
                          <small class="d-flex align-items-center text-secondary mb-2">
                            <i class=" me-2 fs-5 mdi mdi-run"></i>
                            <span class="d-flex">
                              <p class="mb-0 text-nowrap">Created - {{ task.createdAt.toLocaleDateString() }}</p>
                              <span v-if="task.isComplete" class="d-flex">
                                <p class="mb-0 mx-2">|</p>
                                <p class="mb-0 text-nowrap">Completed - {{ task.completedOn.toLocaleDateString() }}</p>
                              </span>
                            </span>
                          </small>
                          <div class="d-flex align-items-center text-secondary mx-1">
                            <span class="fs-5 d-flex align-items-center">
                              <p class="mb-1"> {{ notes.length }} </p>
                              <i class="mx-2 mdi mdi-message-reply-text"></i>
                            </span>
                            <span class="fs-5 ms-4 d-flex align-items-center">
                              <p class="mb-1"> {{ task.weight }} </p>
                              <i class="fs-4 mx-2 mdi mdi-weight"></i>
                            </span>
                          </div>
                        </span>
                      </div>
                      <div class="col-12 col-md-2 d-flex justify-content-end justify-content-md-end align-items-end p-0">
                        <button class="btn selectable text-primary d-flex align-items-center">
                          Delete Sprint {{ i + 1 }}
                          <i class="fs-3 ms-2 mdi mdi-delete-forever"></i>
                        </button>
                      </div>
                    </section>
                  </div>
                </template>
              </CollapseComponent>
            </span>
          </div>
        </section>
      </section>
    </div>

    <!-- ProjectList & ProjectSettings Offcanvas/Modal Buttons -->
    <div class="d-flex flex-column position-absolute buttons">
      <button data-bs-toggle="offcanvas" data-bs-target="#project-list" aria-controls="project-list"
        class="px-3 py-1 mb-2 fs-1 bg-primary text-white border-0 selectable darken-20">
        P
      </button>
      <button data-bs-toggle="modal" data-bs-target="#editProject" aria-controls="editProject"
        class="px-3 py-1 fs-1 bg-gray text-dark border-0 selectable lighten-30">
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

  <ModalComponent :modalId="'editProject'">
    <template #modalTitle> Edit Project </template>
    <template #modalBody>
      <ProjectForm :edit="true" />
    </template>
  </ModalComponent>

  <ModalComponent :modalId="'createSprint'">
    <template #modalTitle>
      Create Sprint
    </template>
    <template #modalBody>
      <form @submit.prevent="createSprint()">
        <label for="name">Name</label>
        <input type="text" class="form-control" maxlength="50" placeholder="Name..." required>
        <button class="btn btn-outline-primary" type="submit">Create</button>
      </form>
    </template>
  </ModalComponent>
</template>


<script>
import Pop from "../utils/Pop.js";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { computed, onMounted, watchEffect } from 'vue';
import { onBeforeRouteUpdate } from "vue-router";
import { projectService } from '../services/ProjectService.js'
import OffcanvasComponent from "../components/OffcanvasComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import ProjectList from "../components/ProjectList.vue";
import ProjectForm from '../components/ProjectForm.vue'
import CollapseComponent from "../components/CollapseComponent.vue";
import { logger } from "../utils/Logger.js";
import { router } from "../router.js";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    async function _getProjectById() {
      try {
        await projectService.getProjectById(route.params.projectId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function _getSprintsByProjectId() {
      try {
        await projectService.getSprintsByProjectId(route.params.projectId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function _getTasksByProjectId() {
      try {
        await projectService.getTasksByProjectId(route.params.projectId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function _getNotesByProjectId() {
      try {
        await projectService.getNotesByProjectId(route.params.projectId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    // watchEffect(() => {
    //   if (route.params.projectId) {
    //     _getProjectById();
    //     _getSprintsByProjectId();
    //     _getTasksByProjectId();
    //     _getNotesByProjectId();
    //   }
    // });
    function colorGen() {
      const hexArr = '0123456789abcdef'.split('');
      let hexCode = '';
      for (let i = 0; i < 6; i++) {
        hexCode += hexArr[Math.floor(Math.random() * hexArr.length)];
      }
      logger.log('colorCode #' + hexCode);
      return '#' + hexCode;
    }
    onBeforeRouteUpdate(() => {
      _getProjectById();
      _getSprintsByProjectId();
      _getTasksByProjectId();
      _getNotesByProjectId();
    })
    onMounted(() => {
      if (AppState.activeProject.id != route.params.projectId) {
        _getProjectById();
      }
      _getSprintsByProjectId();
      _getTasksByProjectId();
      _getNotesByProjectId();
    });
    return {
      colorGen,
      account: computed(() => AppState.account),
      activeProject: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      notes: computed(() => AppState.notes),

      async deleteProject() {
        try {
          const yes = await Pop.confirm('Delete this project?');
          if (!yes) { return }
          await projectService.deleteProject();
          router.push({ name: 'Projects' });
        } catch (error) { Pop.error(error); }
      },

    };
  },
  components: { ModalComponent, OffcanvasComponent, ProjectList, ProjectForm }
}
</script>


<style scoped lang="scss">
input[type=checkbox] {
  height: 1.5rem;
  width: 1.5rem;
}

.courier {
  font-family: 'Courier New', Courier, monospace;
}

.fs-1 {
  line-height: 2.4rem;
}

.mdi-plus {
  line-height: 1rem;
}

.memberImg {
  height: 3rem;
  width: 3rem;
  border: 1px solid black;
}

.projectOwner {
  border: 2px solid blue;
}

.buttons {
  top: 2rem;
}

.vert {
  border-right: 1px solid grey;
  height: 100%;
}
</style>