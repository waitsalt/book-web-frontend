import request from "@/util/request";

async function captcha_email(user_email: String) {
    let data = await request.get(`/util/captcha_email/${user_email}`);
    return data;
}

export { captcha_email };