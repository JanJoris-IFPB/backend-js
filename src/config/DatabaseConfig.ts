import mongoose from "mongoose";
import DotEnvComponent from "../components/DotEnvComponents";

export default class DatabaseConfig {

    public static async connect() {
        await mongoose.connect(DotEnvComponent.DATABASE_URL)
            .then(() => {
                console.log("DB connection established");
            })
            .catch((error: Error) => {
                console.log("DB connection failed; Reason: " + error.message);
            });
    }

    public static async disconnect() {
        await mongoose.disconnect()
            .then(() => {
                console.log("DB disconnected");
            })
            .catch((error: Error) => {
                console.log("DB disconnection failed; Reason: " + error.message);
            });
    }

}