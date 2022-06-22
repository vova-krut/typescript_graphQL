import { User } from "./schema/user.schema";
import { resolvers } from "./resolvers/index";
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
import { connectToMongo } from "./utils/mongo";
import { verifyJwt } from "./utils/jwt";
import Context from "./types/Context";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
    const schema = await buildSchema({
        resolvers,
        //authChecker, //TODO
    });
    const app = express();
    app.use(cookieParser());
    const server = new ApolloServer({
        schema,
        context: (ctx: Context) => {
            if (ctx.req.cookies.accessToken) {
                console.log(1);
                const user = verifyJwt<User>(ctx.req.cookies.accessToken);
                ctx.user = user;
            }
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
    connectToMongo();
}

bootstrap();
