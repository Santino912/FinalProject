import axios from "axios";
import { getGenreStart, getGenreSuccess, getGenreError } from "./genreSlice";

//obtener los generos
export const getGenres = () => {
  return async (dispatch) => {
    dispatch(getGenreStart());
    try {
      const response = await axios.get("/genres");
      dispatch(getGenreSuccess(response.data));
    } catch (error) {
      dispatch(getGenreError(error));
    }
  };
};
