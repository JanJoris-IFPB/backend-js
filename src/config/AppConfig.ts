import express from 'express';
import cors from 'cors';
import UserRoutes from '../routes/UserRoutes';
import ChannelRoutes from '../routes/ChannelRoutes';
import VideoRoutes from '../routes/VideoRoutes';

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
        const userRoutes = new UserRoutes();
        const channelRoutes = new ChannelRoutes();
        const videoRoutes = new VideoRoutes();
        this.app.use("/user", userRoutes.getRoutes());
        this.app.use("/channel", channelRoutes.getRoutes());
        this.app.use("/watch", videoRoutes.getRoutes());
    }

    public getApp(): express.Express {
        return this.app;
    }
}
