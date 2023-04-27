import api from "./baseUrl";

const getCommentByPostId = async () => {
  try {
    const response = await api.get("/comments");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const commentService = {
getCommentByPostId
};

export default commentService;
