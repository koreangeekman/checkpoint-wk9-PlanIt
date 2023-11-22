<template>
  <form @submit.prevent="submitProject()">
    <div class="mb-3">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" class="form-control" placeholder="Name..." maxlength="50">
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea id="description" name="description" class="form-control" placeholder="Description..."
        maxlength="500"></textarea>
    </div>
    <button class="btn btn-outline-primary" type="submit">Create</button>
  </form>
</template>


<script>
import Pop from "../utils/Pop.js";
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { projectService } from "../services/ProjectService.js";

export default {
  props: {
    edit: { type: Boolean, default: false }
  },

  setup(props) {

    const projectForm = reference({});

    watchEffect(() => {
      if (props.edit) {
        projectForm.value = { ...AppState.activeProject };
      }
    })


    return {

      async submitProject() {
        try {
          if (props.edit) { await projectService.updateProject(projectForm.value); }
          await projectService.createProject(projectForm.value);
        }
        catch (error) { Pop.error(error); }
      }

    }
  }
};
</script>


<style lang="scss" scoped></style>