import React, { useEffect, useState } from "react";
import styles from "./pleasures.module.css";
import { getGenre } from "../../redux/features/genres/genreGetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { setUserGenres } from "../../redux/features/users/usersGetSlice";
import { useAuth } from "../../context";
import { getUserByFirebaseId } from "../../redux/features/users/usersGetSlice";

const Pleasures = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state?.genres?.genreList).slice(1);
  const currentUser = useSelector((state) => state.users.currentUser);
  const [genresSelected, setGenresSelected] = useState({
    _id: currentUser._id,
    genres: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const genrePerPage = 10;
  const lastGenre = currentPage * genrePerPage;
  const firstGenre = lastGenre - genrePerPage;
  const currentGenres = genres.slice(firstGenre, lastGenre);
  const pageNumbers = Math.ceil(genres.length / genrePerPage);
  const { userFirebase } = useAuth();

  useEffect(() => {
    dispatch(getGenre());
    dispatch(getUserByFirebaseId(userFirebase.uid));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.genres.length > 1) {
      window.location.reload();
    }
  }, [currentUser]);

  function nextPage() {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleGenresSelected(e) {
    const currentGenresChecked = genresSelected.genres.indexOf(e.target.value);
    const newChecked = [...genresSelected.genres];
    if (currentGenresChecked === -1) {
      newChecked.push(e.target.value);
    } else {
      newChecked.splice(currentGenresChecked, 1);
    }
    setGenresSelected({
      _id: currentUser._id,
      genres: newChecked.map((el) => el),
    });
  }

  function handleSubmit() {
    dispatch(setUserGenres(genresSelected));
  }

  return (
    <div className={styles.mainDiv}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          background: "rgba(15, 25, 46, 0.71)",
          padding: "24px",
          width: "850px",
          height: "450px",
          borderRadius: "10px",
        }}
      >
        <div className={styles.containerText}>
          <h1>Tell us about you.</h1>
          <p>Click at least two genres you like.</p>
        </div>
        <Stack direction="row" justifyContent="space-between">
          {currentPage > 1 ? (
            <button className={styles.buttonPages}>
              <p onClick={previousPage}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </p>
            </button>
          ) : (
            <button className={styles.buttonPagesDisabled} disabled>
              <p onClick={previousPage}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </p>
            </button>
          )}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            sx={{ height: "180px", width: "810px", margin: "20px 0" }}
          >
            {currentGenres?.map((genre, key) => {
              return (
                <div key={key} className={styles.genresContainer}>
                  <input
                    onClick={handleGenresSelected}
                    id={genre.name}
                    type="checkbox"
                    value={genre.name}
                  ></input>
                  {!genresSelected.genres.find((el) => el === genre.name) ? (
                    <label htmlFor={genre.name}>{genre.name}</label>
                  ) : (
                    <label
                      style={{
                        backgroundColor: "rgba(0, 255, 214, 1)",
                      }}
                      htmlFor={genre.name}
                    >
                      {genre.name}
                    </label>
                  )}
                </div>
              );
            })}
          </Stack>
          {currentPage !== pageNumbers ? (
            <button className={styles.buttonPages}>
              <p onClick={nextPage}>
                <FontAwesomeIcon icon={faChevronRight} />
              </p>
            </button>
          ) : (
            <button className={styles.buttonPagesDisabled} disabled>
              <p onClick={nextPage}>
                <FontAwesomeIcon icon={faChevronRight} />
              </p>
            </button>
          )}
        </Stack>
        <div>
          {genresSelected.genres.length > 1 ? (
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                width: "200px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#00FFD6",
                color: "black",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                "&:hover": {
                  backgroundColor: "#00FFD6",
                },
              }}
            >
              Done
            </Button>
          ) : (
            <Button
              disabled
              onClick={handleSubmit}
              variant="contained"
              sx={{
                width: "200px",
                height: "40px",
                borderRadius: "10px",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Done
            </Button>
          )}
        </div>
      </Stack>
    </div>
  );
};

export default Pleasures;
