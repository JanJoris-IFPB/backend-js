import RepositoryTemplate from "../../template/RepositoryTemplate";
import VideoModel from "./VideoModel";

export default class VideoRepository extends RepositoryTemplate {
    constructor() {
        super(VideoModel);
    }
}
