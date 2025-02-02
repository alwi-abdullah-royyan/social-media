import axios from "axios";
import { getCommentById } from "@/services/comment";

jest.mock("axios"); // Mock axios

describe("getCommentById", () => {
  it("fetches comments successfully", async () => {
    // Mock response data
    const mockComments = [
      { postId: 1, id: 1, name: "John Doe", body: "This is a comment" },
      { postId: 1, id: 2, name: "Jane Doe", body: "Another comment" },
    ];

    // Mock axios.get to resolve with mock data
    axios.get.mockResolvedValue({ data: mockComments });

    const comments = await getCommentById(1); // Fetch comments for postId 1

    // Assertions
    expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/comments/?postId=1");
    expect(comments).toEqual(mockComments);
  });

  it("throws an error when the request fails", async () => {
    // Mock axios.get to reject
    axios.get.mockRejectedValue(new Error("Network Error"));

    await expect(getCommentById(1)).rejects.toThrow("failed to fetch data:");
  });
});
