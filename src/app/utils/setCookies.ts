import { Response } from "express";

interface IAuthToken {
    accessToken?: string;
    refreshToken?: string;
}

export const setCookies = (res: Response, tokens: IAuthToken) => {

    if(tokens.accessToken) {
        res.cookie("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: false
        })
    }
    if(tokens.refreshToken) {
        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: false
        })
    }
}