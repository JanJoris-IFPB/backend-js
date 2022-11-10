import mongoose from "mongoose";
import DotEnvComponent from "../components/DotEnvComponents";

export default class DatabaseConfig {

    constructor() {
        mongoose.connect(DotEnvComponent.DATABASE_URL)
            .then(() => {
                console.log("DB connection established");
            })
            .catch((error: Error) => {
                console.log("DB connection failed; Reason: " + error.message);
            });
    }

}