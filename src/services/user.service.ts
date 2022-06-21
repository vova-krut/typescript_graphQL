import { UserModel } from "./../schema/user.schema";

export default class UserService {
    async createUser(input: any) {
        return UserModel.create(input);
    }
}
