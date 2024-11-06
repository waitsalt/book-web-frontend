import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 5000
})

export async function search_book(book_name: string, book_author: string) {
    let res = await AxiosInstance.post("/book/search", {
        name: book_name,
        author: book_author
    })
    return res.data;
}

export async function get_book(book_id: string) {
    let res = await AxiosInstance.get(`/book/${book_id}`)
    return res.data;
}

export async function get_chapter(book_id: string, chapter_id: string) {
    let res = await AxiosInstance.get(`/book/${book_id}/${chapter_id}`)
    return res.data;
}