import { User } from "../schema/user.schema";
import {
    CreateProductInput,
    GetProductInput,
    ProductModel,
} from "../schema/product.schema";

export default class ProductService {
    async createProduct(input: CreateProductInput & { user: User["_id"] }) {
        return ProductModel.create(input);
    }

    async findProducts() {
        // Pagination in here
        return ProductModel.find().lean();
    }

    async findSingleProduct(input: GetProductInput) {
        return ProductModel.findOne(input).lean();
    }
}
