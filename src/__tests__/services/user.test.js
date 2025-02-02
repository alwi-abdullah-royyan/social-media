import axios from "axios";
import { getUserById, getUsers } from "@/services/user"; // Adjust path if needed

jest.mock("axios"); // Mock axios

describe("getUserById", () => {
  it("fetches a user by ID successfully and adds avatar", async () => {
    const userId = 1;
    const mockUser = {
      id: userId,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    };

    const mockAvatar = `https://picsum.photos/id/${userId}/100`;

    // Mock axios.get to resolve with mock data
    axios.get.mockResolvedValue({ data: mockUser });

    const user = await getUserById(userId);

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/users/${userId}`);
    expect(user[userId].avatar).toBe(mockAvatar); // Check if avatar is added correctly
    expect(user[userId].name).toBe(mockUser.name);
  });
});
