<template>
  <header class="shadow">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer>

  <ModalComponent :modalId="'createProject'">
    <template #modalTitle> Create Project </template>
    <template #modalBody>
      <ProjectForm :edit="false" />
    </template>
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import ModalComponent from "./components/ModalComponent.vue";
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),

    }
  },
  components: { Navbar, ModalComponent }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 64px);
}
</style>
