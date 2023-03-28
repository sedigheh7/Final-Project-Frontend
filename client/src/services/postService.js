import api from "./baseUrl";

const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createPost = async (pNewPost) => {
  try {
    const response = await api.post("/posts", pNewPost);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postService = {
  getPosts,
  createPost,
  getPostById,
};

export default postService;
