import axios from "axios";

export const findLikeByIdUserAndIdPost = async (idPost, idUser) => {
  if (idPost === undefined || idUser === undefined) return [];
  const { data } = await axios.get(`/likes/${idPost}/${idUser}`);
  return data;
};
