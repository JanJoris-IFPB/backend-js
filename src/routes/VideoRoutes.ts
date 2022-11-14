import VideoController from "../entity/video/VideoController";
import AuthTokenMiddleware from "../middleware/AuthTokenMiddleware";
import RouteTemplate from "../template/RouteTemplate";

export default class VideoRoutes extends RouteTemplate {
    constructor() {
        super();
        const auth = new AuthTokenMiddleware();
        const controller = new VideoController();

        this.routes.post("/", auth.permitUserRule(["CREATE"]), controller.create);
        this.routes.get("/",auth.permitUserRule(["ADM"]), controller.read);
        this.routes.get("/:uuid", controller.find);
        this.routes.delete("/:uuid", auth.permitUserRule(["DELETE"]), controller.delete);
        this.routes.patch("/updateName/:uuid", auth.permitUserRule(["UPDATE"]), controller.updateName);
        this.routes.patch("/updateDesc/:uuid", auth.permitUserRule(["UPDATE"]), controller.updateDescription);
        this.routes.patch("/addView/:uuid", auth.permitUserRule(["UPDATE"]), controller.incrementViews);
        this.routes.patch("/addLike/:uuid", auth.permitUserRule(["UPDATE"]), controller.incrementLikes);
        this.routes.patch("/removeLike/:uuid", auth.permitUserRule(["UPDATE"]), controller.decrementLikes);
        this.routes.patch("/addDislike/:uuid", auth.permitUserRule(["UPDATE"]), controller.incrementDislikes);
        this.routes.patch("/removeDislike/:uuid", auth.permitUserRule(["UPDATE"]), controller.decrementDislikes);

    }
}
