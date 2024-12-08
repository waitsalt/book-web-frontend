<script setup lang="ts">
import { jwtDecode } from 'jwt-decode';
import NotifyComponent from './component/NotifyComponent.vue';
import PathNavComponent from './component/PathNavComponent.vue';
import SearchComponent from './component/SearchComponent.vue';
import UserNavComponent from './component/UserNavComponent.vue';
import type { UserClaims, UserRefreshClaims } from './model/user';
import { useUserStore } from './store/user';

const userStore = useUserStore()
const userAuth = userStore.userAuth;

const checkUserAuth = () => {
    if (userAuth.refresh_token !== '') {
        const userClaims: UserClaims = jwtDecode(userAuth.access_token);
        const userRefreshClaims: UserRefreshClaims = jwtDecode(userAuth.refresh_token);

    }
}

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
    background-color: #f2f2f8;
    height: 100vh;
    width: 100vw;
    padding: 0;
    margin: 0;
}

.appNav {
    height: 80px;
    opacity: 50;
}

.appView {
    margin: 0;
    padding: 0;
    width: 100vw;
}
</style>