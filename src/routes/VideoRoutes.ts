import VideoController from "../entity/video/VideoController";
import RouteTemplate from "../template/RouteTemplate";

export default class VideoRoutes extends RouteTemplate {
    constructor() {
        super();
        const controller = new VideoController();

        this.routes.post("/", controller.create);
        this.routes.get("/", controller.read);
        this.routes.delete("/:uuid", controller.delete);
        this.routes.get("/:uuid", controller.find);
        this.routes.patch("/updateName/:uuid", controller.updateName);
        this.routes.patch("/updateDesc/:uuid", controller.updateDescription);
        this.routes.patch("/addView/:uuid", controller.incrementViews);
        this.routes.patch("/addLike/:uuid", controller.incrementLikes);
        this.routes.patch("/removeLike/:uuid", controller.decrementLikes);
        this.routes.patch("/addDislike/:uuid", controller.incrementDislikes);
        this.routes.patch("/removeDislike/:uuid", controller.decrementDislikes);

    }
}
