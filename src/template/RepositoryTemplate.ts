import mongoose from "mongoose";
import LoggerComponent from "../components/LoggerComponent";
import { v4 } from "uuid";

export default abstract class RepositoryTemplate {
    protected mongoModel: mongoose.Model<any>;
    protected logger = new LoggerComponent(RepositoryTemplate.name);

    public constructor(mongoModel: mongoose.Model<any>) {
        this.mongoModel = mongoModel;
    }

    public async create(entity: any): Promise<string> {
        try {
            if (!entity)
                return undefined;
             
            entity._id = v4();
            const newEntity = new this.mongoModel(entity);
            await newEntity.save();

            return newEntity._id;
        } catch (error) {
            this.logger.error("ERROR while saving entity", error);
            return undefined;
        }
    }

    public async read(): Promise<any[]> {
        return this.mongoModel.find();
    }

    public async update(entity: any): Promise<any> {
        try {
            if (!entity)
                return undefined;

            const result = new this.mongoModel(entity);
            await result.save();

            return result;
        } catch (error) {
            this.logger.error("ERROR while saving entity", error);
            return undefined;
        }
    }

    public async delete(uuid: string): Promise<any> {
        try {
            return this.mongoModel.deleteOne({ _id: uuid });
        } catch (error) {
            this.logger.error("ERROR while deleting entity", error);
            return undefined;
        }
    }

    public async findByUuid(uuid: string): Promise<any> {
        return this.mongoModel.findById(uuid);
    }

}
