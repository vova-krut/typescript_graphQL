import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/Context";
import { signJwt } from "../utils/jwt";
import { omit } from "lodash";

export default class UserService {
    async createUser(input: CreateUserInput) {
        const candidate = await UserModel.find().findByEmail(input.email);
        if (candidate) {
            throw new ApolloError("User with this email already exists");
        }
        return await UserModel.create(input);
    }

    async login(input: LoginInput, context: Context) {
        const e = "Invalid email or password";
        const user = await UserModel.find().findByEmail(input.email).lean();
        if (!user) {
            throw new ApolloError(e);
        }
        const passwordIsValid = await bcrypt.compare(
            input.password,
            user.password
        );
        if (!passwordIsValid) {
            throw new ApolloError(e);
        }
        const token = signJwt(omit(user, "password"));
        context.res.cookie("accessToken", token, {
            maxAge: 3.154e10, //1 year
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
        });
        console.log(context.req.cookies.accessToken);
        return token;
    }
}
