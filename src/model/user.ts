type UserSignupPayload = {
    user_name: string,
    user_password: string,
    user_email: string,
    avatar_url: string,
    captcha_email: string,
    captcha_image_key: string,
    captcha_image: string,
};

type UserSigninPayload = {
    user_name: string,
    user_password: string,
    captcha_image: string,
    captcha_image_key: string,
};

type UserPublic = {
    user_id: number,
    user_name: string,
    user_email: string,
    avatar_url: string, // 头像 url
    level: number,         // 0
    status: number,        // 0. 正常 1. 被封禁 2. 删除
    identity: number,      // 0. 普通 1. 管理员 2. 超级管理员
    create_time: string,
    update_time: string,
};

type UserAuth = {
    access_token: string,
    refresh_token: string,
}

type UserClaims = {
    iat: number,
    exp: number,
    user_public: UserPublic,
}

type UserRefreshClaims = {
    iat: number,
    exp: number,
    user_id: number,
}

type UserUpdateAvatarUrlPayload = {
    avatar_url: string,
}

type UserUpdateEmailPayload = {
    user_email: string,
    captcha_email: string,
}

type UserVerifyEmailPayload = {
    user_email: string,
}

type UserBaseInfoPayload = {
    avatar_url: string,
    user_name: string,
}

type UserUpdatePasswordPayload = {
    old_password: string,
    new_password: string,
}

export type {
    UserSigninPayload,
    UserSignupPayload,
    UserPublic,
    UserAuth,
    UserClaims,
    UserRefreshClaims,
    UserUpdateEmailPayload,
    UserUpdateAvatarUrlPayload,
    UserBaseInfoPayload,
    UserVerifyEmailPayload,
    UserUpdatePasswordPayload,
}