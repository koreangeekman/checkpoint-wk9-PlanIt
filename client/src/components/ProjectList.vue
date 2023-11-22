<template>
  <div class="container-fluid">
    <section class="row card bg-light shadow p-3 px-md-5 py-md-4">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <span class="">
          <p class="mb-0 fw-bold fs-5 text-primary darken-20">Projects</p>
          <p class="mb-0 text-secondary">A list of all the projects for {{ account.email }}</p>
        </span>
        <button v-if="createBtn == 'top'" class="btn btn-primary" type="button" data-bs-toggle="modal"
          data-bs-target="#create-project">Create Project</button>
      </div>
      <div class="col-12 mt-4 mt-md-5 p-0">

        <section class="row px-3 text-primary darken-20">
          <div class="col-5">
            <p class="mb-0">NAME</p>
          </div>
          <div class="col-4" v-if="showMembers">
            <p class="mb-0">MEMBERS</p>
          </div>
          <div class="col-3">
            <p class="mb-0">STARTED</p>
          </div>
        </section>

        <hr>

        <section v-for="project in projects" class="row px-3 py-2 shadow darken-30 selectable my-2"
          @click="openProject(project)">
          <div class="col-5">
            <p class="mb-0 fs-5">{{ project.name }}</p>
          </div>
          <div class="col-4" v-if="showMembers">
            <img v-for="member in project.members" :src="member.picture" :alt="member.name" :title="member.name"
              class="memberImg rounded-circle" :class="member.name == project.creator.name ? 'projectOwner' : ''">
          </div>
          <div class="col-3">
            <p class="mb-0 courier">{{ project.createdAt.toLocaleDateString() }}</p>
          </div>
        </section>

        <section class="row">
          <div class="col-12 text-center pt-5 pb-3">
            <button v-if="createBtn == 'bottom'" class="btn btn-primary" type="button" data-bs-toggle="modal"
              data-bs-target="#create-project">Create Project</button>
          </div>
        </section>

      </div>
    </section>
  </div>

  <ModalComponent :modalId="'create-project'">
    <template #modalTitle> Create Project </template>
    <template #modalBody>
      <ProjectForm :edit="false" />
    </template>
  </ModalComponent>
  <ModalComponent :modalId="'edit-project'">
    <template #modalTitle> Edit Project </template>
    <template #modalBody>
      <ProjectForm :edit="true" />
    </template>
    <!-- <template #modalSubmit>
      <button type="button" class="btn btn-primary">{{ submitButton }}</button>
    </template> -->
  </ModalComponent>
</template>


<script>
import Pop from "../utils/Pop.js";
import { useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { computed, watchEffect } from 'vue';
import { projectService } from '../services/ProjectService.js'
import ModalComponent from '../components/ModalComponent.vue'
import ProjectForm from '../components/ProjectForm.vue'

export default {
  props: {
    showMembers: { type: Boolean, default: "true" },
    createBtn: { type: String, default: "top" }
  },

  setup() {

    const router = useRouter();

    watchEffect(() => {
      if (AppState.account.id) {
        _getProjectsByAccountId();
      }
    })

    async function _getProjectsByAccountId() {
      try { await projectService.getProjectsByAccountId(); }
      catch (error) { Pop.error(error); }
    }

    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),

      async openProject(projectObj) {
        try {
          router.push({ name: 'Project', params: { projectId: projectObj.id } });
          await projectService.setActiveProject(projectObj);
        }
        catch (error) { Pop.error(error); }
      }

    }
  },
  components: { ModalComponent, ProjectForm }
};
</script>


<style lang="scss" scoped>
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