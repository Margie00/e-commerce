import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

export async function initMongoose(){

    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }
    return await mongoose.connect(process.env.MONGODB_URL)
}