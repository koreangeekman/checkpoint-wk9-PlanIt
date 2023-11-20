<template>
  <div class="container-fluid">
    <section class="row p-md-5">
      <div class="col-12 p-3 px-md-5">
        <section class="row card bg-light shadow p-3 px-md-5 py-md-4">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <span class="">
              <p class="mb-0 fw-bold fs-5 text-primary darken-20">Projects</p>
              <p class="mb-0 text-secondary">A list of all the projects for {{ account.email }}</p>
            </span>
            <button class="btn btn-primary">Create Project</button>
          </div>
          <div class="col-12 mt-4 mt-md-5 p-0">
            <section class="row px-3 text-primary darken-20">
              <div class="col-4">
                <p class="mb-0">NAME</p>
              </div>
              <div class="col-4">
                <p class="mb-0">MEMBERS</p>
              </div>
              <div class="col-4">
                <p class="mb-0">STARTED</p>
              </div>
            </section>
            <hr>
            <section v-for="project in projects" class="row px-3">
              <div class="col-4">
                <p class="mb-0 fs-5">{{ project.name }}</p>
              </div>
              <div class="col-4">
                <img v-for="member in project.members" :src="member.picture" :alt="member.name" :title="member.name"
                  class="memberImg rounded-circle" :class="member.name == project.creator.name ? 'projectOwner' : ''">
              </div>
              <div class="col-4">
                <p class="mb-0 courier">{{ project.createdAt.toLocaleDateString() }}</p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),

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