import api from "./baseUrl";
// const getCommentsList = async () => {
//     const response = await fetch("http://localhost:8000/api/v1/comments");
//     const data = await response.json();
//     setCommentList(data);
//   };

//   useEffect(() => {
//     getCommentsList();
//   }, []);

//   const getCommentByPostId = async (pId) => {
//     const response = await fetch(
//       `http://localhost:8000/api/v1/comments?PostId=${pId}`
//     );
//     const data = await response.json();
//     return data;
//   };

const getComments = async () => {
  try {
    const response = await api.get("/comments");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const createComment = async (pNewComment) => {
//   try {
//     const response = await api.post("/comments", pNewComment);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

const getCommentByPostId = async (pId) => {
  try {
    const response = await api.get(`/comments/${pId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const commentService = {
  getComments,
//   createComment,
getCommentByPostId,
};

export default commentService;
