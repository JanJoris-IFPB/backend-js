import UserController from "../entity/user/UserController";
import RouteTemplate from "../template/RouteTemplate";

export default class UserRoutes extends RouteTemplate {
    constructor() {
        super();
        const controller = new UserController();

        this.routes.post("/login", controller.login);
        this.routes.post("/", controller.create);
        this.routes.get("/", controller.read);
        this.routes.delete("/:uuid", controller.delete);
        this.routes.get("/:uuid", controller.find);
        this.routes.patch("/:uuid", controller.updateName);
        this.routes.patch("/addRule/:uuid", controller.addRule);
        this.routes.patch("/removeRule/:uuid", controller.removeRule);

    }
}
