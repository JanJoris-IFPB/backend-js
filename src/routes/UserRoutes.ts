import UserController from "../entity/user/UserController";
import AuthTokenMiddleware from "../middleware/AuthTokenMiddleware";
import RouteTemplate from "../template/RouteTemplate";

export default class UserRoutes extends RouteTemplate {
    constructor() {
        super();
        const auth = new AuthTokenMiddleware();
        const controller = new UserController();

        this.routes.post("/login", controller.login);
        this.routes.post("/", controller.create);
        this.routes.get("/", auth.permitUserRule(["ADM"]), controller.read);
        this.routes.get("/:uuid", auth.permitUserRule(["ADM"]), controller.find);
        this.routes.delete("/:uuid", auth.permitUserRule(["ADM", "DELETE"]), controller.delete);
        this.routes.patch("/:uuid", auth.permitUserRule(["UPDATE"]), controller.updateName);
        this.routes.patch("/addRule/:uuid", auth.permitUserRule(["ADM", "UPDATE"]), controller.addRule);
        this.routes.patch("/removeRule/:uuid", auth.permitUserRule(["ADM", "UPDATE"]), controller.removeRule);

    }
}
