import mongoose from "mongoose";

export default abstract class RepositoryTemplate {
    protected mongoModel: mongoose.Model<any>;

    public constructor(mongoModel: mongoose.Model<any>) {
        this.mongoModel = mongoModel;
    }

    public async create(entity: any): Promise<string> {
        try {
            if (!entity)
                return undefined;

            const newEntity = new this.mongoModel(entity);
            await newEntity.save();

            return newEntity._id;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public async read() {
        return this.mongoModel.find();
    }

    public async update(entity: any): Promise<string> {
        try {
            if (!entity)
                return undefined;

            const result = new this.mongoModel(entity);
            await result.save();

            return result;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public async delete(uuid: string): Promise<any> {
        try {
            return this.mongoModel.deleteOne({ _id: uuid });
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public async get(uuid: string): Promise<any> {
        return this.mongoModel.findById(uuid);
    }

}
