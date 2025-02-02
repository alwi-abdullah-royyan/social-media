import axios from "axios";
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.data;
  } catch (err) {
    throw new Error("failed to fetch data: ", err);
  }
};
