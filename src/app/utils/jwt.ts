import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, secret: string, expires: string) => {
    const token = jwt.sign(payload, secret, { expiresIn: expires } as SignOptions)
    return token
}

export const verifyToken = (token: string, secret: string) => {
    const isVerified = jwt.verify(token, secret) as JwtPayload
    return isVerified

}