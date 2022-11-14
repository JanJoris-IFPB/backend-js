import ChannelController from "../entity/channel/ChannelController";
import RouteTemplate from "../template/RouteTemplate";

export default class ChannelRoutes extends RouteTemplate {
    constructor() {
        super();
        const controller = new ChannelController();

        this.routes.post("/", controller.create);
        this.routes.get("/", controller.read);
        this.routes.delete("/:uuid", controller.delete);
        this.routes.get("/:uuid", controller.find);
        this.routes.patch("/updateName/:uuid", controller.updateName);
        this.routes.patch("/updateAbout/:uuid", controller.updateAbout);
        this.routes.patch("/addSub/:uuid", controller.incrementSubs);
        this.routes.patch("/removeSub/:uuid", controller.decrementSubs);

    }
}
