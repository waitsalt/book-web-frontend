type SearchBookPayload = {
    type: string,
    keyword: string,
};

type SignupUserPayload = {

};

type SigninUserPayload = {

};

type PublicUser = {
    user_id: number,
    user_name: String,
    user_email: String,
    avatar_url: String, // 头像 url
    level: number,         // 0
    status: number,        // 0. 正常 1. 被封禁 2. 删除
    identity: number,      // 0. 普通 1. 管理员 2. 超级管理员
    create_time: string,
    update_time: string,
}

export {
    type SearchBookPayload,
    type SigninUserPayload,
    type SignupUserPayload,
    type PublicUser,
}
