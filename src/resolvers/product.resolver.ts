import { GetProductInput } from "../schema/product.schema";
import { CreateProductInput } from "../schema/product.schema";
import { Product } from "../schema/product.schema";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import ProductService from "../services/product.service";
import Context from "../types/Context";

@Resolver()
export default class ProductResolver {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    @Authorized()
    @Mutation(() => Product)
    createProduct(
        @Arg("input") input: CreateProductInput,
        @Ctx() context: Context
    ) {
        const user = context.user!;
        return this.productService.createProduct({ ...input, user: user?._id });
    }

    @Query(() => [Product])
    getProducts() {
        return this.productService.findProducts();
    }

    @Query(() => Product)
    getProduct(@Arg("input") input: GetProductInput) {
        return this.productService.findSingleProduct(input);
    }
}
