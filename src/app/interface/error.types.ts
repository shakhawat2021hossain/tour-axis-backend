
export interface TErrorSrc {
    path: string,
    message: string
}
export interface TErrorResponse {
    statusCode: number,
    message: string,
    errorSources?: TErrorSrc[]
}

