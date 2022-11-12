import DatabaseConfig from "../src/config/DatabaseConfig";
import UserService from "../src/entity/user/UserService";
import User from "../src/types/User";

describe("Tests the UserService methods", () => {
    const userService = new UserService();

    const user: User = {
        email: "b.logandi@mail.com",
        name: "Brandon Logandi",
        password: "123456"
    }

    beforeAll(async () => {
        await DatabaseConfig.connect();
    })

    afterAll(async () => {
        await DatabaseConfig.disconnect();
    });


    test("Creating a user", async () => {
        const result = await userService.create(user);

        user._id = result._id;
        expect(result).not.toBe(undefined);
    });

    test("Find user by uuid", async () => {
        const result = await userService.findByUuid(user._id);

        expect(result._id).toBe(user._id);
    })

    test("Find user by name", async () => {
        const result = await userService.findByName(user.name);

        expect(result._id).toBe(user._id);
        expect(result.name).toBe(user.name);
    })

    test("Find user by email", async () => {
        const result = await userService.findByEmail(user.email);

        expect(result._id).toBe(user._id);
        expect(result.name).toBe(user.name);
    })

    test("Create a rule", async () => {
        const result = await userService.addRule(user._id, "ADM");

        expect(result).toBe(true);
    })

    test("Delete a rule", async () => {
        const result = await userService.deleteRule(user._id, "ADM");

        expect(result).toBe(true);
    })

    test("Get all users", async () => {
        const result = await userService.read();

        expect(result.length).not.toBe(0);
    })

    test("Update user name", async () => {
        const result = await userService.updateName(user._id, "New name");

        expect(result.name).toBe("New name");
    })

    test("Delete a user", async () => {
        const result = await userService.delete(user._id);

        expect(result).not.toBe(undefined);
    })
})