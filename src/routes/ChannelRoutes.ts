import ChannelController from "../entity/channel/ChannelController";
import AuthTokenMiddleware from "../middleware/AuthTokenMiddleware";
import RouteTemplate from "../template/RouteTemplate";

export default class ChannelRoutes extends RouteTemplate {
    constructor() {
        super();
        const auth = new AuthTokenMiddleware();
        const controller = new ChannelController();

        this.routes.post("/", auth.permitUserRule(["CREATE"]), controller.create);
        this.routes.get("/", auth.permitUserRule(["ADM"]), controller.read);
        this.routes.get("/:uuid", controller.find);
        this.routes.delete("/:uuid", auth.permitUserRule(["DELETE"]), controller.delete);
        this.routes.patch("/updateName/:uuid", auth.permitUserRule(["UPDATE"]), controller.updateName);
        this.routes.patch("/updateAbout/:uuid", auth.permitUserRule(["UPDATE"]), controller.updateAbout);
        this.routes.patch("/addSub/:uuid", auth.permitUserRule(["UPDATE"]), controller.incrementSubs);
        this.routes.patch("/removeSub/:uuid", auth.permitUserRule(["UPDATE"]), controller.decrementSubs);

    }
}
