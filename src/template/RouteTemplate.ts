import { Router } from "express";

export default abstract class RouteTemplate {

    protected routes: Router = Router();

    public getRoutes(): Router {
        return this.routes;
    }

}
