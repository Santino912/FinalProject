import axios from "axios";

export const findLikeByIdUserAndIdPost = async (idPost, idUser) => {
  const { data } = await axios.get(`/likes/${idPost}/${idUser}`);
  return data;
};
