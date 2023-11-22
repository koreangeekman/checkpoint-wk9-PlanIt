<template>
  <form @submit.prevent="submitProject()">
    <div class="mb-3">
      <label for="name">Name</label>
      <input v-model="projectForm.name" type="text" id="name" name="name" class="form-control" maxlength="50"
        placeholder="Name...">
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea v-model="projectForm.description" id="description" name="description" class="form-control"
        placeholder="Description..." maxlength="500"></textarea>
    </div>
    <button class="btn btn-outline-primary" type="submit">Create</button>
  </form>
</template>


<script>
import Pop from "../utils/Pop.js";
import { AppState } from '../AppState';
import { watchEffect, ref } from 'vue';
import { projectService } from "../services/ProjectService.js";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";

export default {
  props: {
    edit: { type: Boolean, default: false }
  },

  setup(props) {
    const router = useRouter();

    const projectForm = ref({});

    watchEffect(() => {
      if (props.edit) {
        projectForm.value = { ...AppState.activeProject };
      }
    })


    return {
      projectForm,

      async submitProject(projectObj) {
        try {
          if (props.edit) { await projectService.updateProject(projectForm.value); }
          else {
            const newProj = await projectService.createProject(projectForm.value);
            router.push({ name: 'Project', params: { projectId: AppState.activeProject.id } });
            Modal.getOrCreateInstance('#createProject').hide();
            projectForm.value = {};
          }
        }
        catch (error) { Pop.error(error); }
      }

    }
  }
};
</script>


<style lang="scss" scoped></style>