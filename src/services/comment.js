import axios from "axios";
export const getCommentById = async (id) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/?postId=${id}`);
    return response.data;
  } catch (err) {
    throw new Error("failed to fetch data: ", err);
  }
};
