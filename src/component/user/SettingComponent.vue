<script lang="ts" setup>
import { postUpdateAvatarUrl } from "@/api/user/updateAvatarUrl";
import type { UserPublic, UserUpdateAvatarUrlPayload } from "@/model/user";
import { useUserStore } from "@/store/user";
import { ref } from "vue";

// 模拟用户数据
const userStore = useUserStore();
const userPublic = ref<UserPublic>(userStore.userPublic);

// 表单状态
const passwordForm = ref({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
});

const emailForm = ref({
    newEmail: "",
    emailCode: "",
});

// 方法
const updateUserInfo = async () => {
    let userUpdateAvatarUrlPayload: UserUpdateAvatarUrlPayload = {
        avatar_url: userPublic.value.avatar_url,
    };
    let res = await postUpdateAvatarUrl(userUpdateAvatarUrlPayload);
};

const updatePassword = () => {
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        alert("新密码与确认密码不一致！");
        return;
    }
    if (passwordForm.value.newPassword === passwordForm.value.oldPassword) {
        alert("新密码与原密码一致,请修改！");
        return;
    }
    console.log("密码修改请求:", passwordForm.value);
    alert("密码已修改！");
    passwordForm.value.oldPassword = "";
    passwordForm.value.newPassword = "";
    passwordForm.value.confirmPassword = "";
};

const updateEmail = () => {
    console.log("邮箱修改请求:", emailForm.value);
    alert("邮箱验证成功，邮箱已修改！");
    emailForm.value.newEmail = "";
    emailForm.value.emailCode = "";
};

const verifyEmail = () => {
    alert("邮箱验证请求已发送！");
};
</script>

<template>
    <div class="userSettingContainer">
        <!-- 用户基本信息 -->
        <section class="setting-section">
            <h2>用户基本信息</h2>
            <div class="form-group">
                <label>用户 ID:</label>
                <p>{{ userPublic.user_id }}</p>
            </div>
            <div class="form-group">
                <label>头像</label>
                <img :src="userPublic.avatar_url" alt="" class="avatar" />
                <input type="text" v-model="userPublic.avatar_url" placeholder="请输入头像 URL" />
            </div>
            <div class="form-group">
                <label>用户名</label>
                <p>{{ userPublic.user_name }}</p>
            </div>
            <div class="form-group">
                <label>用户身份</label>
                <p>
                    {{
                        userPublic.identity === 0
                            ? "普通用户"
                            : userPublic.identity === 1
                                ? "管理员"
                                : "超级管理员"
                    }}
                </p>
            </div>
            <div class="form-group">
                <label>状态</label>
                <p>
                    {{
                        userPublic.status === 0
                            ? "正常"
                            : userPublic.status === 1
                                ? "被封禁"
                                : "删除"
                    }}
                </p>
            </div>
            <div class="form-group">
                <label>创建时间</label>
                <p>{{ userPublic.create_time }}</p>
            </div>
            <div class="form-group">
                <label>更新时间</label>
                <p>{{ userPublic.update_time }}</p>
            </div>
            <button class="save-button" @click="updateUserInfo">保存基本信息</button>
        </section>

        <!-- 密码修改 -->
        <section class="setting-section">
            <h2>密码修改</h2>
            <div class="form-group">
                <label for="oldPassword">原密码</label>
                <input type="password" id="oldPassword" v-model="passwordForm.oldPassword" placeholder="请输入原密码" />
            </div>
            <div class="form-group">
                <label for="newPassword">新密码</label>
                <input type="password" id="newPassword" v-model="passwordForm.newPassword" placeholder="请输入新密码" />
            </div>
            <div class="form-group">
                <label for="confirmPassword">确认新密码</label>
                <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword"
                    placeholder="请再次输入新密码" />
            </div>
            <button class="save-button" @click="updatePassword">修改密码</button>
        </section>

        <!-- 邮箱修改 -->
        <section class="setting-section">
            <h2>邮箱修改</h2>
            <div class="form-group email-group">
                <label for="newEmail">新邮箱</label>
                <div class="email-input-container">
                    <input type="email" id="newEmail" v-model="emailForm.newEmail" placeholder="请输入新邮箱地址" />
                    <button class="verify-button" @click="verifyEmail">
                        验证邮箱
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label for="emailCode">邮箱验证码</label>
                <input type="text" id="emailCode" v-model="emailForm.emailCode" placeholder="请输入邮箱验证码" />
            </div>
            <button class="save-button" @click="updateEmail">修改邮箱</button>
        </section>
    </div>
</template>

<style scoped>
.userSettingContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.setting-section {
    flex: 1;
    min-width: 300px;
    margin-bottom: 20px;
}

h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
}

p {
    margin: 0;
}

input,
select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.avatar {
    display: block;
    background-color: #cccccc;
    margin-bottom: 10px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
}

.email-input-container {
    display: flex;
    gap: 10px;
}

.email-input-container input {
    flex: 1;
}

.verify-button {
    padding: 8px 12px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 100%;
}

.verify-button:hover {
    background-color: #218838;
}

.save-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.save-button:hover {
    background-color: #0056b3;
}
</style>
