type SearchBookPayload = {
    type: string,
    keyword: string,
};

type SignupUserPayload = {
    user_name: string,
    user_password: string,
    user_email: string,
    avatar_url: string,
    captcha_email: string,
    captcha_image_key: string,
    captcha_image: string,
};

type SigninUserPayload = {
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

type Book = {
    book_id: number,
    book_name: string,
    author_id: number,
    author_name: string,
    platform: string,
    user_id: number,
    user_name: string,
    cover_url: string,
    source_url: string,
    book_tags: string,
    book_desc: string,
    book_class: string,
    book_status: string,
    latest_chapter_id: number,
    latest_chapter_name: string,
    create_time: string,
    update_time: string,
}

type AppResponse<T> = {
    code: number,
    message: string,
    data: T,
}

export {
    type SearchBookPayload,
    type SigninUserPayload,
    type SignupUserPayload,
    type UserInfo,
    type UserAuth,
    type AppResponse,
    type Book,
};