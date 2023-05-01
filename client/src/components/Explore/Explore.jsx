import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import { getGenres } from "../../redux/features/genres/genreGetSlice";
import { getPost } from "../../redux/features/post/postGetSlice";
import { booleanFilter, searchBooleanFilter } from "./utils/func/filters";
import InputComponent from "./InputComponent";
import Loading from "../loading/Loading";
import FindedComponent from "./FindedComponent";
import Post from "../post/Post";
import styles from "./Explore.module.css";

const Explore = () => {
  const dispatch = useDispatch();

  const [searchBoolean, setSearchBoolean] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    genres: [],
    order: "",
  });
  const genres = useSelector((state) => state.genres.genreList);
  const users = useSelector((state) => state.users.usersList);
  const posts = useSelector((state) => state.posts.postsExplore);
  useEffect(() => {
    setLoaded(true);
    dispatch(getGenres());
    dispatch(getPost(filters, setLoaded));
  }, []);

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
    palette: {
      primary: { main: "#f5f5f5" },
    },
  });

  const handleChangeFetch = (e) => {
    e.preventDefault();
    setLoaded(true);
    dispatch(getPost(filters, setLoaded));
    if (searchBooleanFilter(filters)) {
      setSearchBoolean(false);
    } else {
      setSearchBoolean(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.fondo}></Box>
      <Box className={styles.filter}></Box>
      <Box className={styles.allContainer}>
        <Box className={styles.sideBarSpace} />
        <Box className={styles.container}>
          <Box width={"100%"} className={styles.title}>
            <Typography variant="h2" component={"h1"} fontWeight={"500"}>
              Explore
            </Typography>
          </Box>
          <Box className={styles.filters}>
            <InputComponent
              filters={filters}
              setFilters={setFilters}
              handleChangeFetch={handleChangeFetch}
            />
          </Box>
          <Box className={styles.containerUsersPosts}>
            {loaded ? (
              <Loading width={"10vw"} />
            ) : (
              <FindedComponent
                posts={posts}
                users={users}
                searchBoolean={searchBoolean}
              />
            )}
            {booleanFilter(searchBoolean, posts) &&
              posts?.map((post, i) => (
                <Post key={i} post={post} comments={false} />
              ))}
            {!loaded && posts?.length === 0 && users?.length === 0 && (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"50vh"}
              >
                <Typography component={"h4"} variant={"h4"}>
                  There are no posts or users with these characteristics
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Explore;
