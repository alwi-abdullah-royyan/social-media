import axios from "axios";
import { getPostById } from "@/services/post";

jest.mock("axios");
describe("getPostById", () => {
  it("fetch post success", async () => {
    //mock response data
    const mockPost = { id: 1, title: "post title", body: "Post Body" };
    axios.get.mockResolvedValue({ data: mockPost });
    const post = await getPostById(1);
    expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
    expect(post).toEqual(mockPost);
  });
});
