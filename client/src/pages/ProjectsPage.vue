<template>
  <div class="container-fluid">
    <section class="row p-md-5">
      <div class="col-12 p-3 px-md-5">
        <ProjectList :showMembers="true" :createBtn="'top'" />
      </div>
    </section>
  </div>
</template>


<script>
import ProjectList from "../components/ProjectList.vue";

export default {
  setup() {

    return {

    }
  },
  components: { ProjectList }
}
</script>


<style scoped lang="scss"></style>