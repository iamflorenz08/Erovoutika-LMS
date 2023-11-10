export interface IErrorResponse {
    statusCode: number,
    message: string,
}

export interface IError {
    success: boolean,
    status: number,
    error: string,
}
