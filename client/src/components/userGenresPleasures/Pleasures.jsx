import React, { useEffect, useState } from "react";
import { getGenres } from "../../redux/features/genres/genreGetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { setUserGenres } from "../../redux/features/users/usersGetSlice";
import styles from "./pleasures.module.css";

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
  const pageNumbers = Math.ceil(genres?.length / genrePerPage);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.pleasures?.length > 1) {
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
      <Box className={styles.genresStackContainer}>
        <div className={styles.containerText}>
          <h1>Tell us about you.</h1>
          <p>Click at least two genres you like.</p>
        </div>
        <Box
          className={styles.arrowsContainer}
          direction="row"
          justifyContent="space-between"
        >
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
          <Box className={styles.pleasuresContainer}>
            {currentGenres?.map((genre, key) => {
              return (
                <div key={key} className={styles.genresContainer}>
                  <input
                    onClick={handleGenresSelected}
                    id={genre.name}
                    type="checkbox"
                    value={genre.name}
                  ></input>
                  {!genresSelected.genres?.find((el) => el === genre.name) ? (
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
          </Box>
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
        </Box>
        <div>
          {genresSelected.genres?.length > 1 ? (
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
      </Box>
    </div>
  );
};

export default Pleasures;
