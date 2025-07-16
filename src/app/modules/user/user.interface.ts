import { Types } from "mongoose";

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}
export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}
export interface IAuthProvider {
    provider: string; // credential, google
    providerId: string
}


export interface IUser {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    address?: string;
    picture?: string;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    role: Role;
    auths: IAuthProvider[];
    bookings?: Types.ObjectId[];
    guides?: Types.ObjectId[]
}