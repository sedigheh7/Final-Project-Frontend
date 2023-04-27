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

const getPostsByUserId = async (userId) => {
  try {
    const response = await api.get(`/posts?userId=${userId}`);
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

// pdf
const createPdfById = async (pId) => {
  const response = await api.get(`/posts/pdf/${pId}`);
  const data = await response.json();
  return data
}


const postService = {
  getPosts,
  createPost,
  getPostById,
  getPostsByUserId,
  createPdfById
};

export default postService;
