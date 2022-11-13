import mongoose from "mongoose";
import DotEnvComponent from "../components/DotEnvComponents";
import LoggerComponent from "../components/LoggerComponent";

export default class DatabaseConfig {

    public static async connect() {
        const logger = new LoggerComponent(DatabaseConfig.name);

        await mongoose.connect(DotEnvComponent.DATABASE_URL)
            .then(() => {
                logger.info("DB connection established");
            })
            .catch((error: Error) => {
                logger.error("DB connection failed", error);
            });
    }

    public static async disconnect() {
        const logger = new LoggerComponent(DatabaseConfig.name);

        await mongoose.disconnect()
            .then(() => {
                logger.info("DB disconnected");
            })
            .catch((error: Error) => {
                logger.error("DB disconnection failed", error);
            });
    }

}