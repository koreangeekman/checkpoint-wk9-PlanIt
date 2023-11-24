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
            data-bs-target="#createSprint">
            Add Sprint
          </button>
        </div>

        <div class="col-12 p-0">
          <section v-for="(sprint, i) in sprints" class="row p-0 px-md-5 py-md-4 my-2">
            <div class="col-12 bg-light shadow p-0 border border-primary rounded">
              <span class="d-flex align-items-center rounded-top py-3 px-2 px-md-4" type="button"
                @click="expandSprint('#' + sprint.id)" aria-expanded="false" :aria-controls="sprint.id">
                <i class="fs-1 mdi mdi-abacus" :style="'color:' + colorGen() + ';'"></i>
                <p class="mb-0 mx-3 fw-bold fs-5">S{{ i + 1 }} - {{ sprint.name }} </p>
                <span class="text-primary fs-5 d-flex align-items-center ms-3 me-auto">
                  <p class="mb-0 fw-bold fs-5">{{ calcWeight(sprint.id) }}</p>
                  <i class="fs-2 mdi mdi-weight"></i>
                </span>
                <span class="d-flex">
                  <button class="btn btn-outline-primary ps-1 ps-md-3 py-0 text-nowrap" @click.stop="addTask(sprint)">
                    Add Task <i class="fs-5 mdi mdi-plus"></i>
                  </button>
                  <p v-if="tasks.filter(task => task.sprintId == sprint.id).length > 0" class="mb-0 ms-3 fw-bold fs-5">
                    {{ tasks.filter(task => task.sprintId == sprint.id && task.isComplete).length + '/' +
                      tasks.filter(task => task.sprintId == sprint.id).length }} Tasks Complete
                  </p>
                  <p class="mb-0 ms-3 py-0"></p>
                </span>
              </span>

              <span class="rounded-bottom">
                <CollapseComponent :collapseId="sprint.id">
                  <template #collapseBody>
                    <div v-if="tasks.filter(task => task.sprintId == sprint.id).length > 0" class="container-fluid">
                      <section v-for="task in tasks.filter(task => task.sprintId == sprint.id)"
                        class="row hovered rounded my-2 pt-2" type="button" @click="openTaskDetails(sprint, task)">
                        <div class="col-12 d-flex align-items-center px-0 px-md-5">
                          <input type="checkbox" name="isComplete" id="isComplete" class="mx-3" :checked="task.isComplete"
                            @click.stop="completeTask(task)" :disabled="task.isComplete">
                          <p class="mb-0 px-3 py-1 rounded-pill bg-light shadow outline"
                            :style="'border: 2px solid ' + colorGen() + ';'">
                            {{ task.name }}
                          </p>
                          <i class="fs-3 mx-3 text-secondary mdi mdi-delete-forever" type="button"
                            @click.stop="deleteTask(task.id)"></i>
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
                                <p class="mb-1"> {{ notes.filter(note => note.taskId == task.id).length }} </p>
                                <i class="mx-2 mdi mdi-message-reply-text"></i>
                              </span>
                              <span class="fs-5 ms-4 d-flex align-items-center">
                                <p class="mb-1"> {{ task.weight }} </p>
                                <i class="fs-4 mx-2 mdi mdi-weight"></i>
                              </span>
                            </div>
                          </span>
                        </div>
                      </section>
                    </div>
                    <div class="W-100 d-flex justify-content-end justify-content-md-end align-items-end p-0">
                      <button class="btn selectable text-primary d-flex align-items-center"
                        @click="deleteSprint(sprint.id)">
                        Delete Sprint {{ i + 1 }}
                        <i class="fs-3 ms-2 mdi mdi-delete-forever"></i>
                      </button>
                    </div>
                  </template>
                </CollapseComponent>
              </span>
            </div>
          </section>
        </div>
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
  <span v-if="account">

    <OffcanvasComponent :offcanvasId="'project-list'">
      <template #offcanvasBody>
        <ProjectList :showMembers="false" :createBtn="'bottom'" />
      </template>
    </OffcanvasComponent>

    <span v-if="activeTask">
      <OffcanvasComponent :offcanvasId="'taskDetails'" :settings="'offcanvas-end offcanvas-size-xxl'">
        <template #offcanvasHeader>
          <span class="d-flex align-items-center w-100 border-bottom border-primary ps-3 pe-2">
            <button type="button" class="btn-close me-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <p class="mb-0"> {{ activeSprint?.name }} </p>
            <i class="fs-1 mx-2 mdi mdi-chevron-right"></i>
            <p class="mb-0"> {{ activeTask?.name }} </p>
            <button v-if="activeTask?.edit" type="button" class="btn selectable my-1 ms-auto" aria-label="Save"
              @click="saveTask()">
              <i class="fs-3 text-primary mdi mdi-content-save"></i>
            </button>
            <button v-else type="button" class="btn selectable my-1 ms-auto" aria-label="Edit" @click="editTask()">
              <i class="fs-3 mdi mdi-pencil"></i>
            </button>
          </span>
        </template>
        <template #offcanvasBody>
          <span v-if="activeTask?.edit" class="">
            <form @submit.prevent="saveTask()">
              <div class="mb-3">
                <label for="name">Name</label>
                <input v-model="taskForm.name" type="text" class="form-control" name="name" maxlength="50" required>
              </div>
              <span class="d-flex">
                <div class="mb-3 pe-3 w-25">
                  <label for="weight">Weight <i class="text-primary mdi mdi-weight"></i></label>
                  <input v-model="taskForm.weight" type="number" class="form-control" name="weight" min="1" max="10"
                    required>
                </div>
                <div class="mb-3 w-75">
                  <label for="sprintId">Sprint</label>
                  <select v-model="taskForm.sprintId" type="text" class="form-select" name="sprint" maxlength="50"
                    required>
                    <option v-for="sprint in sprints" :value="sprint.id">{{ sprint.name }}</option>
                  </select>
                </div>
              </span>
              <button class="btn btn-outline-secondary mx-2" @click="editTask()">Cancel</button>
              <button class="btn btn-primary px-4" type="submit">Save</button>
            </form>
          </span>
          <span v-else>
            <span class="d-block">
              <p class="">Status</p>
              <span class="d-flex align-items-center mx-3 mb-4">
                <p class="rounded-pill bg-primary mb-0 px-4 py-1">Pending</p>
                <p class="mb-0 px-4 py-1 w-100">
                  <hr>
                </p>
                <p v-if="!activeTask?.isComplete" class="rounded-pill btn btn-outline-success mb-0 px-4 py-1">Done</p>
                <p v-else class="rounded-pill btn btn-success mb-0 px-4 py-1">Done</p>
              </span>
            </span>
          </span>
          <span class="notes">
            <div class="px-md-5 py-md-3 fw-bold text-center">
              <p class="mb-0 fs-5">Notes</p>
              <hr>
            </div>
            <form @submit="addNote()">
              <label for="body">Add a Note</label>
              <span class="d-flex mt-2">
                <textarea v-model="noteForm.body" class="rounded-start w-100 ps-2" name="body" id="body" rows="2"
                  placeholder="Say something..."></textarea>
                <button class="px-4 text-center border-0 rounded-end bg-primary darken-10 selectable" type="submit">
                  <i class="text-light mdi mdi-send"></i>
                </button>
              </span>
            </form>
            <div v-for="note in notes.filter(n => n.taskId == activeTask.id)" class="card">

            </div>
          </span>
        </template>
      </OffcanvasComponent>
    </span>

    <span v-if="activeProject">
      <ModalComponent :modalId="'editProject'">
        <template #modalTitle> Edit Project </template>
        <template #modalBody>
          <ProjectForm :edit="true" />
        </template>
      </ModalComponent>
    </span>

    <span v-if="activeProject">
      <ModalComponent :modalId="'createSprint'">
        <template #modalTitle>
          Create Sprint
        </template>
        <template #modalBody>
          <form @submit.prevent="createSprint()">
            <div class="mb-3">
              <label for="name">Name</label>
              <input v-model="sprintForm.name" type="text" class="form-control" maxlength="50" name="name"
                placeholder="Name..." required>
            </div>
            <button class="btn btn-outline-primary" type="submit">Create</button>
          </form>
        </template>
      </ModalComponent>

      <ModalComponent :modalId="'createTask'">
        <template #modalTitle>
          Create Task
          <p class="fs-6 mb-0">{{ activeProject.name + ' > ' + taskForm.sprintName }}</p>
        </template>
        <template #modalBody>
          <form @submit.prevent="createTask()">
            <span class="d-flex">
              <div class="mb-4 w-100">
                <label for="name">Name</label>
                <input v-model="taskForm.name" type="text" class="form-control" maxlength="50" name="name"
                  placeholder="Name..." required>
              </div>
              <div class="ms-5 me-4 mb-4 w-25">
                <label for="weight">Weight</label>
                <input v-model="taskForm.weight" type="number" class="form-control" min="1" max="10" name="weight"
                  placeholder="1-10" required>
              </div>
            </span>
            <button class="btn btn-outline-primary mt-2" type="submit">Create</button>
          </form>
        </template>
      </ModalComponent>
    </span>

  </span>
</template>


<script>
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { Collapse, Modal, Offcanvas } from "bootstrap";
import { computed, watchEffect, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { projectService } from '../services/ProjectService.js'
import { sprintService } from '../services/SprintService.js'
import { taskService } from '../services/TaskService.js'
import OffcanvasComponent from "../components/OffcanvasComponent.vue";
import CollapseComponent from "../components/CollapseComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import ProjectList from "../components/ProjectList.vue";
import ProjectForm from '../components/ProjectForm.vue'
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const sprintForm = ref({});
    const taskForm = ref({});
    const noteForm = ref({});

    const route = useRoute();
    const router = useRouter();

    async function _getProjectById(projectId) {
      try { await projectService.getProjectById(projectId); }
      catch (error) { Pop.error(error); }
    }

    async function _getSprintsByProjectId(projectId) {
      try { await projectService.getSprintsByProjectId(projectId); }
      catch (error) { Pop.error(error); }
    }
    async function _getTasksByProjectId(projectId) {
      try { await projectService.getTasksByProjectId(projectId); }
      catch (error) { Pop.error(error); }
    }
    async function _getNotesByProjectId(projectId) {
      try { await projectService.getNotesByProjectId(projectId); }
      catch (error) { Pop.error(error); }
    }

    watchEffect(async () => {
      if (route.params.projectId) {
        _getProjectById(route.params.projectId);
        _getSprintsByProjectId(route.params.projectId);
        _getTasksByProjectId(route.params.projectId);
        _getNotesByProjectId(route.params.projectId);
      }
      if (AppState.activeTask.edit) {
        taskForm.value = { ...AppState.activeTask }
      } else {
        taskForm.value = {}
      }
    })
    function colorGen() {
      const hexArr = '0123456789abcdef'.split('');
      let hexCode = '';
      for (let i = 0; i < 6; i++) {
        hexCode += hexArr[Math.floor(Math.random() * hexArr.length)];
      }
      logger.log('colorCode #' + hexCode);
      return '#' + hexCode;
    }

    return {
      sprintForm,
      taskForm,
      noteForm,
      colorGen,
      account: computed(() => AppState.account),
      activeProject: computed(() => AppState.activeProject),
      projects: computed(() => AppState.projects),
      activeSprint: computed(() => AppState.activeSprint),
      sprints: computed(() => AppState.sprints),
      activeTask: computed(() => AppState.activeTask),
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
      async deleteSprint(sprintId) {
        try {
          const yes = await Pop.confirm('Delete this sprint?');
          if (!yes) { return }
          await sprintService.deleteSprint(sprintId);
        } catch (error) { Pop.error(error); }
      },
      async deleteTask(taskId) {
        try {
          const yes = await Pop.confirm('Delete this task?');
          if (!yes) { return }
          await taskService.deleteTask(taskId);
        } catch (error) { Pop.error(error); }
      },

      async createSprint() {
        try {
          sprintForm.value.projectId = route.params.projectId;
          await sprintService.createSprint(sprintForm.value);
          sprintForm.value = {};
          Modal.getOrCreateInstance('#createSprint').hide();
        }
        catch (error) { Pop.error(error); }
      },
      async createTask() {
        try {
          await taskService.createTask(taskForm.value);
          taskForm.value = {};
          Modal.getOrCreateInstance('#createTask').hide();
        }
        catch (error) { Pop.error(error); }
      },

      async completeTask(taskObj) {
        try { await taskService.completeTask(taskObj); }
        catch (error) { Pop.error(error); }
      },
      async saveTask() {
        try {
          await taskService.updateTask(taskForm.value);
          AppState.activeTask.edit = false;
          Offcanvas.getOrCreateInstance('#taskDetails').hide();
        }
        catch (error) { Pop.error(error); }
      },

      editTask() {
        AppState.activeTask.edit = !AppState.activeTask.edit;
      },

      addTask(sprintObj) {
        taskForm.value.projectId = sprintObj.projectId;
        taskForm.value.sprintId = sprintObj.id;
        taskForm.value.sprintName = sprintObj.name;
        Modal.getOrCreateInstance('#createTask').show();
      },

      expandSprint(collapseId) {
        Collapse.getOrCreateInstance(collapseId).show();
        Collapse.getOrCreateInstance(collapseId).hide();
      },

      openTaskDetails(sprintObj, taskObj) {
        AppState.activeSprint = sprintObj;
        AppState.activeTask = taskObj;
        Offcanvas.getOrCreateInstance('#taskDetails').show();
      },

      calcWeight(sprintId) {
        let total = 0;
        this.tasks?.forEach(task => {
          if (task.sprintId == sprintId) {
            total += task.weight
          }
        });
        return total
      },

    };
  },
  components: { ModalComponent, OffcanvasComponent, CollapseComponent, ProjectList, ProjectForm }
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

.hovered:hover {
  box-shadow: 0 0 8px 2px #01234567;
}
</style>