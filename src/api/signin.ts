import request from "@/util/request";

async function signin(user_name: String, user_password: String, captcha_image: String, captcha_image_key: String) {
    let data = await request.post("/user/signin", {
        "user_name": user_name,
        "user_password": user_password,
        "captcha_image": captcha_image,
        "captcha_image_key": captcha_image_key
    });
    request.defaults.headers.common['Authorization'] = `Bearer ${data.data}`;
    localStorage.setItem("book-web-auth-token", `Bearer ${data.data}`);
    return data;
}

export { signin };