import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  Typography,
  createTheme,
  ThemeProvider,
  Button,
  Modal,
} from "@mui/material";
import { Stack } from "@mui/system";
import styles from "./Explore.module.css";
import logoIcon from "../../images/logoicon.png";
import {
  getUser,
  getUserByFirebaseId,
  getUserNotification,
} from "../../redux/features/users/usersGetSlice";
import { getGenre } from "../../redux/features/genres/genreGetSlice";
import {
  getPost,
  getPostByGenre,
  getPostByTime,
  getPostByPopularity,
  getPostByRelevance,
} from "../../redux/features/post/postGetSlice";
import { useEffect } from "react";
import Post from "../post/Post";
import SideBar from "../SideBar/SideBar";
import { useAuth } from "../../context";
import Loading from "../loading/Loading";
import PostShared from "../postShared/PostShared";
import PlayButton from "../PlayButton/PlayButton";

const Explore = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList);
  const userDB = useSelector((state) => state.users.currentUser);
  // const user = useSelector((state) => state.users.user);
  const genres = useSelector((state) => state.genres.genreList);
  // const postsFilteredAndOrdered = useSelector((state) => state.posts.postsOrdered );

  const allPostsSelector = useSelector((state) => state.posts.postListAll);
  const postsFilteredSelector = useSelector(
    (state) => state.posts.postsFiltered
  );
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState();
  const [checked, setChecked] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [genresFiltered, setGenresFiltered] = useState([]);
  const [orderChecked, setOrderChecked] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const genrePerPage = 6;
  const lastGenre = currentPage * genrePerPage;
  const firstGenre = lastGenre - genrePerPage;
  const currentGenres = genres.slice(firstGenre, lastGenre);
  const pageNumbers = Math.ceil(genres?.length / genrePerPage);
  let [artistsPerPage, setArtistsPerPage] = useState(10);
  let currentArtists = posibleArtist().slice(0, artistsPerPage);
  let [songsPerPage, setSongsPerPage] = useState(9);
  let currentSongs;
  if (inputValue) {
    currentSongs = posibleSong().slice(0, songsPerPage);
  }
  const { userFirebase } = useAuth();

  useEffect(() => {
    dispatch(getPost());
    setPosts(postsFilteredSelector);
    setLoaded(true);
  }, [postsFilteredSelector]);

  useEffect(() => {
    dispatch(getPost());
    dispatch(getUser());
    dispatch(getGenre());
    dispatch(getUserByFirebaseId(userFirebase?.uid));
    dispatch(getUserNotification(userDB?.idGoogle));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getPostByRelevance({
        genres: userDB?.genres?.map((genre) => genre.name),
      })
    );
  }, [userDB]);

  const theme = createTheme({
    typography: {
      fontFamily: [
        "Inter",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });

  function handleArtistsPerPage() {
    setArtistsPerPage(artistsPerPage + 10);
    currentArtists = posibleArtist().slice(0, artistsPerPage);
  }

  function handleSongsPerPage() {
    setSongsPerPage(songsPerPage + 8);
    currentSongs = posibleSong().slice(0, songsPerPage);
  }

  function posibleArtist() {
    const posibles = [];
    users?.map((user) => {
      if (
        user.username.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.name.toLowerCase().includes(inputValue.toLowerCase())
      ) {
        posibles.push(user);
      }
      return null;
    });
    return posibles;
  }

  function posibleSong() {
    const posibles = [];
    posts?.map((post) => {
      if (post.title.toLowerCase().includes(inputValue.toLowerCase())) {
        posibles.push(post);
      }
      return null;
    });
    return posibles;
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
    setSongsPerPage(8);
    setArtistsPerPage(10);
    posibleArtist();
    posibleSong();
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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
    const currentGenresChecked = genresFiltered.indexOf(e.target.value);
    const newChecked = { genres: [...genresFiltered] };

    if (currentGenresChecked === -1) {
      newChecked.genres.push(e.target.value);
    } else {
      newChecked.genres.splice(currentGenresChecked, 1);
    }
    setGenresFiltered(newChecked.genres?.map((el) => el));
    if (newChecked.genres?.length === 0) {
      if (orderChecked === "relevance") {
        dispatch(
          getPostByRelevance({
            genres: userDB?.genres?.map((genre) => genre.name),
          })
        );
      } else if (orderChecked === "popu") {
        dispatch(getPostByPopularity({ posts: allPostsSelector }));
      } else if (orderChecked === "asc") {
        dispatch(getPostByTime({ order: "asc" }));
      } else {
        dispatch(getPostByTime({ order: "desc" }));
      }
    } else {
      dispatch(
        getPostByGenre({
          genres: newChecked.genres,
        })
      );
    }
  }

  function handleChecked(el) {
    console.log(el.target.value);
    setOrderChecked(el.target.value);
    if (el.target.value === "relevance") {
      dispatch(
        getPostByRelevance({
          genres: userDB.genres.map((genre) => genre.name),
        })
      );
    } else if (el.target.value === "popu") {
      dispatch(getPostByPopularity({ posts: posts }));
    } else {
      dispatch(getPostByTime({ order: el.target.value, posts: posts }));
    }
  }

  function handleCheckedAll() {
    setChecked("all");
    setPosts(postsFilteredSelector);
  }

  function handleCheckedVideo() {
    setChecked("video");
    setPosts(
      postsFilteredSelector.filter((post) => post.type.includes("video"))
    );
  }

  function handleCheckedAudio() {
    setChecked("audio");
    setPosts(
      postsFilteredSelector.filter((post) => post.type.includes("audio"))
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <div className={styles.fondo}></div>
        <div className={styles.filter}></div>
        <div style={{ minWidth: "266px" }}>
          <SideBar userDB={userDB} />
        </div>
        {loaded ? (
          <div className={styles.container}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: "700", color: "white", paddingTop: "30px" }}
            >
              Explore
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              sx={{ marginTop: "13px" }}
            >
              <div className={styles.containerSearchBar}>
                <FontAwesomeIcon
                  style={{
                    color: "rgba(129, 129, 129, 1)",
                    fontSize: "15px",
                    padding: "0 10px",
                  }}
                  icon={faMagnifyingGlass}
                />
                <input
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Search for users or songs..."
                />
              </div>
              <div>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(0, 255, 214, 1)",
                    color: "rgba(0, 10, 31, 1)",
                    fontWeight: 500,
                    height: "40px",
                    textTransform: "none",
                    width: "110px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 255, 214, 0.7)",
                    },
                  }}
                >
                  Filters
                </Button>
                <Modal open={open} onClose={handleClose}>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    sx={{
                      width: "600px",
                      position: "absolute",
                      right: "15px",
                      top: "160px",
                      backgroundColor: "rgba(4, 14, 36, 1)",
                      borderRadius: "20px",
                      padding: "10px 20px",
                    }}
                    className={styles.modalContainer}
                  >
                    <div>
                      <h2>Genres</h2>
                      <Stack direction="row" justifyContent="space-between">
                        {currentPage > 1 ? (
                          <button className={styles.buttonPages}>
                            <p onClick={previousPage}>
                              <FontAwesomeIcon icon={faChevronLeft} />
                            </p>
                          </button>
                        ) : (
                          <button
                            className={styles.buttonPagesDisabled}
                            disabled
                          >
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
                          sx={{ height: "110px", margin: "20px 0" }}
                        >
                          {currentGenres.map((genre, key) => {
                            return (
                              <div key={key} className={styles.genresContainer}>
                                <input
                                  onClick={handleGenresSelected}
                                  id={genre.name}
                                  type="checkbox"
                                  value={genre.name}
                                ></input>
                                {!genresFiltered?.find(
                                  (el) => el === genre.name
                                ) ? (
                                  <label htmlFor={genre.name}>
                                    {genre.name}
                                  </label>
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
                          <button
                            className={styles.buttonPagesDisabled}
                            disabled
                          >
                            <p onClick={nextPage}>
                              <FontAwesomeIcon icon={faChevronRight} />
                            </p>
                          </button>
                        )}
                      </Stack>
                    </div>
                    <div>
                      <h2 style={{ marginBottom: "15px" }}>Sort by</h2>
                      <div className={styles.sortContainer}>
                        {orderChecked === "desc" ? (
                          <div>
                            <input
                              name="order"
                              id="mostRecent"
                              type="radio"
                              value="desc"
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                              }}
                            >
                              <label
                                style={{ color: "rgba(0, 226, 190, 1)" }}
                                htmlFor="mostRecent"
                              >
                                Most Recent
                              </label>
                              <FontAwesomeIcon
                                style={{
                                  fontSize: "18px",
                                  marginLeft: "8px",
                                  color: "rgba(0, 226, 190, 1)",
                                }}
                                icon={faCircleCheck}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input
                              onClick={(e) => handleChecked(e)}
                              name="order"
                              id="mostRecent"
                              type="radio"
                              value="desc"
                            />
                            <label htmlFor="mostRecent">Most Recent</label>
                          </div>
                        )}

                        {orderChecked === "asc" ? (
                          <div>
                            <input
                              name="order"
                              id="oldest"
                              type="radio"
                              value="asc"
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                              }}
                            >
                              <label
                                style={{ color: "rgba(0, 226, 190, 1)" }}
                                htmlFor="oldest"
                              >
                                Oldest
                              </label>
                              <FontAwesomeIcon
                                style={{
                                  fontSize: "18px",
                                  marginLeft: "8px",
                                  color: "rgba(0, 226, 190, 1)",
                                }}
                                icon={faCircleCheck}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input
                              onClick={(e) => handleChecked(e)}
                              name="order"
                              id="oldest"
                              type="radio"
                              value="asc"
                            />
                            <label htmlFor="oldest">Oldest</label>
                          </div>
                        )}

                        {orderChecked === "popu" ? (
                          <div>
                            <input
                              name="order"
                              id="popularity"
                              type="radio"
                              value="popu"
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                              }}
                            >
                              <label
                                style={{ color: "rgba(0, 226, 190, 1)" }}
                                htmlFor="popularity"
                              >
                                Popularity
                              </label>
                              <FontAwesomeIcon
                                style={{
                                  fontSize: "18px",
                                  marginLeft: "8px",
                                  color: "rgba(0, 226, 190, 1)",
                                }}
                                icon={faCircleCheck}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input
                              onClick={(e) => handleChecked(e)}
                              name="order"
                              id="popularity"
                              type="radio"
                              value="popu"
                            />
                            <label htmlFor="popularity">Popularity</label>
                          </div>
                        )}

                        {orderChecked === "relevance" ? (
                          <div>
                            <input
                              name="order"
                              id="relevance"
                              type="radio"
                              value="relevance"
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                              }}
                            >
                              <label
                                style={{ color: "rgba(0, 226, 190, 1)" }}
                                htmlFor="relevance"
                              >
                                Relevance
                              </label>
                              <FontAwesomeIcon
                                style={{
                                  fontSize: "18px",
                                  marginLeft: "8px",
                                  color: "rgba(0, 226, 190, 1)",
                                }}
                                icon={faCircleCheck}
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <input
                              onClick={(e) => handleChecked(e)}
                              name="order"
                              id="relevance"
                              type="radio"
                              value="relevance"
                            />
                            <label htmlFor="relevance">Relevance</label>
                          </div>
                        )}
                      </div>
                    </div>
                  </Stack>
                </Modal>
              </div>
            </Stack>

            <div className={styles.containerContent}>
              {!inputValue ? (
                <Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      className={styles.forYouText}
                      variant="h4"
                      component="h3"
                    >
                      For you.
                    </Typography>
                    <div>
                      {checked === "all" ? (
                        <Button
                          sx={{
                            backgroundColor: "rgba(0, 255, 214, 1)",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "rgba(0, 255, 214, 1)",
                            },
                          }}
                        >
                          All
                        </Button>
                      ) : (
                        <Button onClick={handleCheckedAll}>All</Button>
                      )}
                      {checked === "video" ? (
                        <Button
                          sx={{
                            backgroundColor: "rgba(0, 255, 214, 1)",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "rgba(0, 255, 214, 1)",
                            },
                          }}
                        >
                          Video
                        </Button>
                      ) : (
                        <Button onClick={handleCheckedVideo}>Video</Button>
                      )}
                      {checked === "audio" ? (
                        <Button
                          sx={{
                            backgroundColor: "rgba(0, 255, 214, 1)",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "rgba(0, 255, 214, 1)",
                            },
                          }}
                        >
                          Audio
                        </Button>
                      ) : (
                        <Button onClick={handleCheckedAudio}>Audio</Button>
                      )}
                    </div>
                  </Stack>

                  {posts?.length === 0 ? (
                    <h1 className={styles.noResultsText}>No results</h1>
                  ) : (
                    <Stack spacing={0} sx={{ marginTop: "20px" }}>
                      {posts?.length > 0 &&
                        posts?.map((post, i) =>
                          post.idShared ? (
                            <PostShared postShared={post} />
                          ) : (
                            <Post key={i} post={post} comments={false} />
                          )
                        )}
                    </Stack>
                  )}
                </Stack>
              ) : (posibleArtist()?.length === 0 &&
                  posibleSong()?.length === 0) ||
                !posts ? (
                <h1 className={styles.noResultsText}>No results</h1>
              ) : (
                <div style={{ marginTop: "30px" }}>
                  <div>
                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{ color: "white", fontWeight: "600" }}
                    >
                      Results
                    </Typography>
                  </div>
                  {posibleSong()?.length > 0 ? (
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <Typography
                        variant="h5"
                        component="h4"
                        sx={{
                          color: "rgba(0, 226, 190, 1)",
                          fontWeight: "600",
                        }}
                      >
                        Songs
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Stack direction="row" flexWrap="wrap">
                          {currentSongs.map((results, index) => {
                            return (
                              <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="start"
                                alignItems="center"
                                className={styles.songsContainer}
                              >
                                <div
                                  className={styles.songContainer}
                                  style={{ position: "relative" }}
                                >
                                  <img src={logoIcon} alt="" />
                                  <div className={styles.playButton}>
                                    <PlayButton
                                      tracks={currentSongs}
                                      track={results}
                                      trackIndex={index}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <p>{results?.title}</p>
                                  <Link
                                    className={styles.artistSong}
                                    to={results?.user?._id}
                                  >
                                    <p
                                      style={{
                                        fontSize: "13px",
                                        marginTop: "20px",
                                      }}
                                    >
                                      {results.user?.username}
                                    </p>
                                  </Link>
                                </div>
                                <p className={styles.songDate}>
                                  {results.postDate.slice(0, 10)}
                                </p>
                              </Stack>
                            );
                          })}
                        </Stack>
                      </Stack>
                    </div>
                  ) : null}
                  {currentSongs?.length < posibleSong()?.length ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FontAwesomeIcon
                        className={styles.showMoreButton}
                        onClick={handleSongsPerPage}
                        icon={faChevronDown}
                      />
                    </div>
                  ) : null}

                  {posibleArtist()?.length > 0 ? (
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <Typography
                        variant="h5"
                        component="h4"
                        sx={{
                          color: "rgba(0, 226, 190, 1)",
                          fontWeight: "600",
                        }}
                      >
                        Artists
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Stack>
                          <Stack direction="row" flexWrap="wrap">
                            {currentArtists.map((results) => {
                              if (results.plan === "Premium") {
                                return (
                                  <Link
                                    to={`/home/explore/${results?.user?._id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <div className={styles.artistContainer}>
                                      <div>
                                        <img src={results.avatar} alt="" />
                                      </div>
                                      <div
                                        className={styles.containerArtistData}
                                      >
                                        <p className={styles.artistName}>
                                          {results.name}
                                        </p>
                                        <p className={styles.artistUsername}>
                                          @{results.username}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                );
                              } else {
                                return (
                                  <Link
                                    to={`/home/explore/${results?.user?._id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <div className={styles.artistContainer}>
                                      <div>
                                        <img src={results.avatar} alt="" />
                                      </div>
                                      <div
                                        className={styles.containerArtistData}
                                      >
                                        <p className={styles.artistName}>
                                          {results.name}
                                        </p>
                                        <p className={styles.artistUsername}>
                                          @{results.username}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                );
                              }
                            })}
                          </Stack>
                          {currentArtists?.length < posibleArtist()?.length ? (
                            <FontAwesomeIcon
                              className={styles.showMoreButton}
                              onClick={handleArtistsPerPage}
                              icon={faChevronDown}
                            />
                          ) : null}
                        </Stack>
                      </Stack>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default Explore;
