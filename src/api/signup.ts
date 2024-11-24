import request from "@/util/request";

async function signin(user_name: String, user_password: String, user_email: String, avatar_url: String, captcha_email: String, captcha_image: String, captcha_image_key: String) {
    let data = await request.post("/user/signup", {
        "user_name": user_name,
        "user_password": user_password,
        "user_email": user_email,
        "avatar_url": avatar_url,
        "captcha_email": captcha_email,
        "captcha_image": captcha_image,
        "captcha_image_key": captcha_image_key
    });
    return data;
}

export { signin };