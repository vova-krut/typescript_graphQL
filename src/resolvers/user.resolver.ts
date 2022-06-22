import { LoginInput, User, CreateUserInput } from "../schema/user.schema";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserService from "../services/user.service";
import Context from "../types/Context";

@Resolver()
export default class UserResolver {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    @Mutation(() => User)
    createUser(@Arg("input") input: CreateUserInput) {
        return this.userService.createUser(input);
    }

    @Mutation(() => String)
    login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
        return this.userService.login(input, context);
    }

    @Query(() => User)
    me(@Ctx() context: Context) {
        return context.user;
    }
}
