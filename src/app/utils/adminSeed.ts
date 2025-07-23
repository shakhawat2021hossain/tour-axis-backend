import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import bcrypt from "bcryptjs"
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";

export const adminSeed = async() =>{
    try{
        const isExist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL});
        if(isExist){
            console.log("Super Admin already exist");
            return
        }

        console.log("creating super admin...");


        const hashedPass = await bcrypt.hash(envVars.SUPER_ADMIN_PASS, 10);
        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload: IUser = {
            name: "Super Admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPass,
            role: Role.SUPER_ADMIN,
            isVerified: true,
            auths: [authProvider]
        }
        const result = await User.create(payload);
        console.log("Super Admin Created Successfuly! \n");
        console.log(result);


    }
    catch(error){
        console.log(error);
    }

}