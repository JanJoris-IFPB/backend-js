import express from 'express';
import cors from 'cors';

export default class AppConfig {
    private app: express.Express;

    constructor() {
        this.app = express();
        this.configApp();
        this.configRoutes();
    }

    private configApp(): void {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private configRoutes(): void {
        //TODO: Config routes
    }

    public getApp(): express.Express {
        return this.app;
    }
}