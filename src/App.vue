<script setup lang="ts">
import PathNavComponent from './component/PathNavComponent.vue';
import SearchComponent from './component/SearchComponent.vue';
import UserNavComponent from './component/UserNavComponent.vue';

</script>

<template>
  <div class="nav">
    <PathNavComponent />
    <UserNavComponent />
    <SearchComponent />
  </div>
  <div class="app-view">
    <RouterView />
  </div>
</template>

<style scoped>
.nav {
  position: fixed;
  /* Makes the navbar fixed at the top of the page */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  /* Ensures the navbar stays on top of other elements */
  background-color: white;
  /* You can adjust this to match your design */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* Adds shadow for better visibility */
}

/* 
.app-view {
  position: fixed;
  top: 60px;
} */
</style>