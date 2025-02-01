import axios from "axios";

export async function fetchPosts(page, limit = 20) {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
      params: {
        _page: page, // API pagination
        _limit: limit, // Number of posts per page
      },
    });
    return response.data; // API returns an array of posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
