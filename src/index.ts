import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
    const schema = await buildSchema({
        resolvers, //TODO
        authChecker, //TODO
    });
    const app = express();
    app.use(cookieParser());
    const server = new ApolloServer({
        schema,
        context: (ctx) => {
            console.log(ctx);
            return ctx;
        },
        plugins: [
            process.env.NODE_ENV === "production"
                ? ApolloServerPluginLandingPageProductionDefault()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
}

bootstrap();
