import { User } from "./user.schema";
import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import * as uuid from "uuid";
import { IsNumber, MaxLength, Min, MinLength } from "class-validator";

@ObjectType()
@index({ productId: 1 })
export class Product {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    @prop({ required: true, ref: () => User })
    user: Ref<User>;

    @Field(() => String)
    @prop({ required: true })
    name: string;

    @Field(() => String)
    @prop({ required: true })
    description: string;

    @Field(() => Number)
    @prop({ required: true })
    price: number;

    @Field(() => String)
    @prop({ required: true, default: () => `product_${uuid.v4()}` })
    productId: string;
}

export const ProductModel = getModelForClass<typeof Product>(Product);

@InputType()
export class CreateProductInput {
    @Field()
    name: string;

    @MinLength(50, {
        message: "Description has to be at least 50 chars",
    })
    @MaxLength(1000, {
        message: "Description must not be more than 1000 chars",
    })
    @Field()
    description: string;

    @IsNumber()
    @Min(1)
    @Field()
    price: number;
}

@InputType()
export class GetProductInput {
    @Field()
    productId: string;
}
