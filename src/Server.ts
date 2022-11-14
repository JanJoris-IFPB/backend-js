import { Express } from 'express';
import DatabaseConfig from "./config/DatabaseConfig";
import DotEnvComponent from "./components/DotEnvComponents";
import AppConfig from "./config/AppConfig";
import os from "os";
import LoggerComponent from './components/LoggerComponent';

class Server {

    private server: Express;

    constructor() {
        this.server = new AppConfig().getApp();
    }

    public start(): void {
        DatabaseConfig.connect();
        this.server.listen(DotEnvComponent.PORT, Server.logSystemInfo);
    }

    private static logSystemInfo(): void {
        const logger = new LoggerComponent(Server.name);

        const arch = os.arch();
        const plataform = os.platform();
        const type = os.type();
        const mem = os.totalmem();
        const cpus = os.cpus();

        logger.info(`SERVER RUNNING ON PORT: ${DotEnvComponent.PORT}`);
        logger.info(`OS: ${type} ${plataform} ${arch}`);
        logger.info(`RAM: ${Math.floor(mem * (10 ** -9))} GB`);
        logger.info(`CPU: ${cpus[0].model}`);
        logger.info(`CORES: ${cpus.length}`);
    }
}

new Server().start();
