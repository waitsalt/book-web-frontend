<script setup lang="ts">
import NotifyComponent from './component/NotifyComponent.vue';
import PathNavComponent from './component/PathNavComponent.vue';
import SearchComponent from './component/SearchComponent.vue';
import UserNavComponent from './component/UserNavComponent.vue';

</script>

<template>
    <div class="appContainer">
        <div class="appNav">
            <PathNavComponent />
            <SearchComponent />
            <UserNavComponent />
        </div>
        <div class="appView">
            <RouterView />
        </div>
        <NotifyComponent />
    </div>
</template>

<style scoped>
.appContainer {
    background-color: #B4B8AB;
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0;
}

.appNav {
    height: 80px;
}

.appView {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: calc(100vh - 80px);
}
</style>