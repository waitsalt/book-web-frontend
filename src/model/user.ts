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

type UserInfo = {
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
    user_info: UserInfo,
}

type UserRefreshClaims = {

    iat: number,
    exp: number,
    user_id: number,
}

export {
    type UserSigninPayload,
    type UserSignupPayload,
    type UserInfo,
    type UserAuth,
    type UserClaims,
    type UserRefreshClaims,
}