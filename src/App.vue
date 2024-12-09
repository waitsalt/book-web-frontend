<script setup lang="ts">
import { jwtDecode } from 'jwt-decode';
import NotifyComponent from './component/NotifyComponent.vue';
import PathNavComponent from './component/PathNavComponent.vue';
import SearchComponent from './component/SearchComponent.vue';
import UserNavComponent from './component/UserNavComponent.vue';
import type { UserClaims, UserRefreshClaims } from './model/user';
import { useUserStore } from './store/user';
import { getRefreshAccessToken } from './api/user/refreshAccessToken';
import { onMounted } from 'vue';

const userStore = useUserStore()
const userAuth = userStore.userAuth;

const checkUserAuth = async () => {
    const userRefreshClaims: UserRefreshClaims = jwtDecode(userAuth.refresh_token);
    if (userAuth.refresh_token !== '' && userRefreshClaims.exp > Date.now()) {
        const userClaims: UserClaims = jwtDecode(userAuth.access_token);
        if (userAuth.access_token === '' || userClaims.exp - 5 * 60 * 1000 < Date.now()) {
            let res = await getRefreshAccessToken();
        }
    }
}

onMounted(async () => {
    await checkUserAuth();
    setInterval(await checkUserAuth, 5 * 60 * 1000);
})

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