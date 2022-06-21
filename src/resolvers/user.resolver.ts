import { User } from "../schema/user.schema";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UserService from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";

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

    @Query(() => User)
    me() {
        return {
            _id: 123,
            name: "Jane Doe",
            email: "jane doe",
        };
    }
}
