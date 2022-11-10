import DatabaseConfig from "./config/DatabaseConfig";

class Server {
    /**
     * Start the server
     */
    public start(): void {
        new DatabaseConfig();
    }
}

new Server().start();
