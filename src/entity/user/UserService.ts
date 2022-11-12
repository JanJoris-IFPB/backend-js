import User from "../../types/User";
import UserRepository from "./UserRepository";

export default class UserService {
    repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public async create(user: User): Promise<User> {
        if (user.rules === undefined) {
            user.rules = ["READ", "CREATE", "UPDATE"];
        }

        const uuid = await this.repository.create(user);
        user._id = uuid;

        return uuid ? user : undefined;
    }

    public async read(): Promise<User[]> {
        return this.repository.read();
    }

    public async delete(uuid: string): Promise<any> {
        try {
            return await this.repository.delete(uuid);
        } catch (error) {
            return undefined;
        }
    }

    public async findByUuid(uuid: string): Promise<User> {
        return this.repository.findByUuid(uuid);
    }

    public async findByName(name: string): Promise<User> {
        return this.repository.findByName(name);
    }

    public async findByEmail(email: string): Promise<User> {
        return this.repository.findByEmail(email);
    }

    public async updateName(uuid: string, name: string): Promise<User> {
        const user: User = await this.repository.findByUuid(uuid);

        if (user) {
            user.name = name;
            return this.repository.update(user);
        }

        return undefined;
    }

    public async addRule(uuid: string, newRule: string): Promise<boolean> {
        const user: User = await this.findByUuid(uuid);
        if (user === undefined) {
            return false;
        }

        if (user.rules.indexOf(newRule) == -1) { // if rule doesn't already exist
            user.rules.push(newRule);
            await this.repository.update(user);
            return true;
        }
        return false;
    }

    public async deleteRule(uuid: string, rule: string): Promise<boolean> {
        const user: User = await this.findByUuid(uuid);
        if (user === undefined) {
            return false;
        }

        const index = user.rules.indexOf(rule);
        if (index > -1) { // if rule exists
            user.rules.splice(index, 1);
            await this.repository.update(user);
            return true;
        }

        return false;
    }



}