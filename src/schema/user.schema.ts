import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@pre<User>("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
})
@ObjectType()
export class User {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    @prop({ required: true })
    name: string;

    @Field(() => String)
    @prop({ required: true })
    email: string;

    @prop({ required: true })
    password: string;
}

export const UserModel = getModelForClass(User);

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @MinLength(6, {
        message: "password must be at least 6 chars long",
    })
    @MaxLength(50, {
        message: "password must not be longer than 50 chars",
    })
    @Field(() => String)
    password: string;
}
