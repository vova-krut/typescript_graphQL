import mongoose from "mongoose";
import config from "config";

export async function connectToMongo() {
    try {
        await mongoose.connect(config.get<string>("dbUri"));
        console.log("Connected to db");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}
