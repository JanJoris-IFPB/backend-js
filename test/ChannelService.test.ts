import DatabaseConfig from "../src/config/DatabaseConfig";
import ChannelService from "../src/entity/channel/ChannelService";
import UserService from "../src/entity/user/UserService";
import Channel from "../src/types/Channel";
import User from "../src/types/User";

describe("Tests the ChannelService methods", () => {

    const userService = new UserService();
    const channelService = new ChannelService();

    const user: User = {
        email: "canal1@mail.com",
        name: "Dono Canal Um",
        password: "123456"
    }

    const channel: Channel = {
        userUuid: undefined,
        name: "Canal Um",
        about: "Bem vindo ao Canal Um!"
    }

    beforeAll(async () => {
        await DatabaseConfig.connect();

        const result = await userService.create(user);
        user._id = result._id;
        channel.userUuid = user._id;
    })

    afterAll(async () => {
        await userService.delete(user._id);
        await DatabaseConfig.disconnect();
    })



    test("Create a new channel", async () => {
        const result = await channelService.create(channel);

        channel._id = result._id;
        expect(result).not.toBe(undefined);
    });

    test("Find channel by uuid", async () => {
        const result = await channelService.findByUuid(channel._id);

        expect(result._id).toBe(channel._id);
    });

    test("Find channel by name", async () => {
        const result = await channelService.findByName(channel.name);
        
        expect(result._id).toBe(channel._id);
        expect(result.name).toBe(channel.name);
    });

    test("Find channel by owner uuid", async () => {
        const result = await channelService.findByName(channel.name);
        
        expect(result._id).toBe(channel._id);
        expect(result.userUuid).toBe(channel.userUuid);
        expect(result.userUuid).toBe(user._id);
    });

    test("Subscribe to channel", async () => {
        const result = await channelService.incrementSubs(channel._id);

        expect(result.subscribers).toBe(1);
    });

    test("Unsubscribe to channel", async () => {
        const result = await channelService.decrementSubs(channel._id);

        expect(result.subscribers).toBe(0);
    });

    test("Update channel name", async () => {
        const result = await channelService.updateName(channel._id, "New name");

        expect(result.name).toBe("New name");
    });

    test("Update about", async () => {
        const result = await channelService.updateAbout(channel._id, "New about");

        expect(result.about).toBe("New about");
    });

    test("Delete channel", async () => {
        const result = await channelService.delete(channel._id);

        expect(result).not.toBe(undefined);
    });

})