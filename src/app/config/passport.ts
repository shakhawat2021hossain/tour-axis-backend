import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import passport, { Profile } from "passport";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs"

passport.use(new GoogleStrategy(
    {
        clientID: envVars.GOOGLE_CLIENT_ID,
        clientSecret: envVars.GOOGLE_CLIENT_SECRET,
        callbackURL: envVars.GOOGLE_CALLBACK_URL
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        try {
            const email = profile.emails?.[0].value
            if (!email) {
                return done(null, false, { message: "email could not captured" })
            }
            // 1. check if user exist
            let user = await User.findOne({ email })
            if (!user) {
                user = await User.create({
                    name: profile.displayName,
                    email,
                    role: Role.USER,
                    isVerified: true,
                    auths: [{ provider: "google", providerId: profile.id }]
                })
            }
            else {
                return done(null, user)
            }
        }
        catch (error) {
            console.log("google strategy error", error);
            return done(error)
        }


    }
))

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (email: string, password: string, done) => {
        try {
            const user = await User.findOne({ email })
            console.log(user);
            if (!user) {
                return done(null, false, { message: "user not found - from local passport" })
            }

            const isGoogleAuthenticated = await user.auths.some(auth => auth.provider === "google")
            if (isGoogleAuthenticated && !user.password) {
                return done(null, false, { message: "You are google authenticated. So, log in using google, then set a password." })
            }

            const passMatched = await bcrypt.compare(password, user.password as string);
            if (!passMatched) {
                return done(null, false, { message: "password did not match" })
            }

            return done(null, user)
        }
        catch (error) {
            done(error)
        }

    }
))


// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (error: any, id?: unknown) => void) => {
    done(null, user._id)
})


passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
})