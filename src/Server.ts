import { Express } from 'express';
import DatabaseConfig from "./config/DatabaseConfig";
import DotenvComponent from "./components/DotEnvComponents";
import AppConfig from "./config/AppConfig";
import os from "os";

class Server {

    private server: Express;

    constructor() {
        this.server = new AppConfig().getApp();
    }

    public start(): void {
        DatabaseConfig.connect();
        this.server.listen(DotenvComponent.API_PORT, Server.logSystemInfo);
    }

    private static logSystemInfo(): void {
        const arch = os.arch();
        const plataform = os.platform();
        const type = os.type();
        const mem = os.totalmem();
        const cpus = os.cpus();

        console.log(`SERVER RUNNING ON PORT: ${DotenvComponent.API_PORT}`);
        console.log(`OS: ${type} ${plataform} ${arch}`);
        console.log(`RAM: ${Math.floor(mem * (10 ** -9))} GB`);
        console.log(`CPU: ${cpus[0].model}`);
        console.log(`CORES: ${cpus.length}`);
    }
}

new Server().start();
