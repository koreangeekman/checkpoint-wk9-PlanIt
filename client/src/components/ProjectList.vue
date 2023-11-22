<template>
  <div class="container-fluid">
    <section class="row pe-3">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <span class="">
          <p class="mb-0 fw-bold fs-5 text-primary darken-20">Projects</p>
          <p class="mb-0 text-secondary">A list of all the projects for {{ account.email }}</p>
        </span>
        <button v-if="createBtn == 'top'" class="btn btn-outline-primary" type="button" data-bs-toggle="modal"
          data-bs-target="#createProject">Create Project</button>
      </div>
      <div class="col-12 mt-4 mt-md-5 p-0">

        <section class="d-flex px-3 text-primary darken-20">
          <div class="me-auto">
            <p class="mb-0">NAME</p>
          </div>
          <div class="d-none d-md-inline" v-if="showMembers">
            <p class="mb-0">MEMBERS</p>
          </div>
          <div class="ms-auto">
            <p class="mb-0">STARTED</p>
          </div>
        </section>

        <hr>

        <section v-for="project in projects" class="d-flex px-3 py-2 shadow darken-30 selectable"
          @click="openProject(project)">
          <div class="me-auto p-0 me-auto">
            <p class="mb-0 fs-5">{{ project.name }}</p>
          </div>
          <div class="d-none d-md-inline" v-if="showMembers">
            <img v-for="member in project.members" :src="member.picture" :alt="member.name" :title="member.name"
              class="memberImg rounded-circle" :class="member.name == project.creator.name ? 'projectOwner' : ''">
          </div>
          <div class="ms-auto">
            <p class="mb-0 courier text-nowrap">{{ project.createdAt.toLocaleDateString() }}</p>
          </div>
        </section>

        <section class="row">
          <div class="col-12 text-center pt-5 pb-3">
            <button v-if="createBtn == 'bottom'" class="btn btn-outline-primary" type="button" @click="showModal()">Create
              Project</button>
          </div>
        </section>

      </div>
    </section>
  </div>
</template>


<script>
import Pop from "../utils/Pop.js";
import { useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { computed, watchEffect } from 'vue';
import { projectService } from '../services/ProjectService.js'
import { Modal } from "bootstrap";
import { Offcanvas } from "bootstrap";

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

      showModal() {
        Offcanvas.getOrCreateInstance('#project-list').hide();
        Modal.getOrCreateInstance('#createProject').show();
      },

      async openProject(projectObj) {
        try {
          router.push({ name: 'Project', params: { projectId: projectObj.id } });
          await projectService.setActiveProject(projectObj);
        }
        catch (error) { Pop.error(error); }
      },

    }
  },
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