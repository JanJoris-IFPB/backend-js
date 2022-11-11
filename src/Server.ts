import DatabaseConfig from "./config/DatabaseConfig";

class Server {
    /**
     * Start the server
     */
    public start(): void {
        DatabaseConfig.connect();
    }
}

new Server().start();
