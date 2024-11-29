<script setup lang="ts">
import PathNavComponent from './component/PathNavComponent.vue';
import SearchComponent from './component/SearchComponent.vue';
import UserNavComponent from './component/UserNavComponent.vue';

</script>

<template>
    <div class="appContainer">
        <div class="nav">
            <PathNavComponent />
            <SearchComponent />
            <UserNavComponent />
        </div>
        <div class="appView">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
/* 容器设置为列布局，最小高度100vh */
.appContainer {
    background-color: #B4B8AB;
}
</style>