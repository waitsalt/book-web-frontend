<script lang="ts" setup>
import { get_user_info } from '@/api/user_info';
import request from '@/util/request';
import router from '@/util/router';
import type { PublicUser } from '@/util/types';
import { onMounted, ref } from 'vue';

const user_info = ref<PublicUser>()

const check_user_login = async () => {
    let token = localStorage.getItem("book-web-auth-token");
    if (token === null || token === '') {
        router.push("/signin");
        return;
    }
    console.log(token);
    request.defaults.headers.common['Authorization'] = token;

    let res = await get_user_info();
    user_info.value = res.data;
    console.log(user_info.value?.user_email);

}

onMounted(async () => {
    await check_user_login();
})

</script>

<template>
    <h1>User</h1>
</template>