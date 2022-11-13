import DatabaseConfig from "../src/config/DatabaseConfig";
import VideoService from "../src/entity/video/VideoService";
import ChannelService from "../src/entity/channel/ChannelService";
import UserService from "../src/entity/user/UserService";
import Video from "../src/types/Video";
import Channel from "../src/types/Channel";
import User from "../src/types/User";

describe("Tests the VideoService methods", () => {

    const userService = new UserService();
    const channelService = new ChannelService();
    const videoService = new VideoService();

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

    const video: Video = {
        channelUuid: undefined,
        name: "Video Um",
        description: "Bem vindo ao Video Um!"
    }

    const video2: Video = {
        channelUuid: undefined,
        name: "Video Dois",
        description: "Bem vindo ao Video Dois!"
    }

    const video3: Video = {
        channelUuid: undefined,
        name: "Video Tres",
        description: "Bem vindo ao Video Tres!"
    }

    beforeAll(async () => {
        await DatabaseConfig.connect();

        const userResult = await userService.create(user);
        user._id = userResult._id;
        channel.userUuid = user._id;

        const channelResult = await channelService.create(channel);
        channel._id = channelResult._id;

        video.channelUuid = channel._id;
        video2.channelUuid = channel._id;
        video3.channelUuid = channel._id;
    })

    afterAll(async () => {
        await channelService.delete(channel._id);
        await userService.delete(user._id);
        await DatabaseConfig.disconnect();
    })

    test("Create videos for a channel", async () => {
        const result = await videoService.create(video);
        video._id = result._id;
        
        const result2 = await videoService.create(video2);
        video2._id = result2._id;
        
        const result3 = await videoService.create(video3);
        video3._id = result3._id;
        
        expect(result).not.toBe(undefined);
        expect(result2).not.toBe(undefined);
        expect(result3).not.toBe(undefined);
    })

    test("Find video by uuid", async () => {
        const result = await videoService.findByUuid(video._id);
        expect(result._id).toBe(video._id);
    });

    test("Find videos by name", async () => {
        const result = await videoService.findAllByName(video.name);

        result.forEach(found => async () => {
            expect(found.name).toBe(video.name);
        })
    });

    test("Find videos by channelUuid", async () => {
        const result = await videoService.findAllByChannelUuid(channel._id);

        result.forEach(found => async () => {
            expect(found.channelUuid).toBe(channel._id);
        })
    });

    test("Add view to video", async () => {
        const result = await videoService.incrementViews(video._id);

        expect(result.views).toBe(1);
    });

    test("Add likes to video", async () => {
        const result = await videoService.incrementLikes(video2._id);

        expect(result.likes).toBe(1);
    });

    test("Remove likes from video", async () => {
        const result = await videoService.decrementLikes(video2._id);

        expect(result.likes).toBe(0);
    });

    test("Add dislikes to video", async () => {
        const result = await videoService.incrementDislikes(video3._id);

        expect(result.dislikes).toBe(1);
    });

    test("Remove dislikes from video", async () => {
        const result = await videoService.decrementDislikes(video3._id);

        expect(result.dislikes).toBe(0);
    });

    test("Update video name", async () => {
        const result = await videoService.updateName(video._id, "New name");

        expect(result.name).toBe("New name");
    });

    test("Update video description", async () => {
        const result = await videoService.updateDescription(video2._id, "New desc");

        expect(result.description).toBe("New desc");
    });

    test("Delete videos", async () => {
        const result = await videoService.delete(video._id);

        expect(result).not.toBe(undefined);
    })

})