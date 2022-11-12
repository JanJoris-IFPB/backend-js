import RepositoryTemplate from "../../template/RepositoryTemplate";
import UserModel from "./UserModel";

export default class UserRepository extends RepositoryTemplate {
    constructor() {
        super(UserModel);
    }

    public async findByName(name: string) {
        return this.mongoModel.findOne({ name });
    }

    public async findByEmail(email: string) {
        return this.mongoModel.findOne({ email });
    }

}
