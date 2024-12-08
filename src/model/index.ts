type AppResponse<T> = {
    code: number,
    message: string,
    data: T,
};

export type { AppResponse };