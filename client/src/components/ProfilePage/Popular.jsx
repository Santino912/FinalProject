import React from "react";
import PlayButton from "../PlayButton/PlayButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByPopularity } from "../../redux/features/post/postGetSlice"
import styles from "./Popular.module.css";
import PopularPost from "./PopularPost";

const Popular = ({ id }) => {
  const dispatch = useDispatch()
  let allPosts = useSelector((state) => state.posts.postList);
  allPosts = allPosts.filter((post) => post.userId === id && post.idShared === null)
  const popularPosts = useSelector(state => state.posts.postsOrdered).slice(0, 5);

  useEffect(() => {
    dispatch(getPostByPopularity({ posts: allPosts }));
  }, [dispatch])

  return (
    <div className={styles.containerPopularSongs}>
      <h2>Popular</h2>
      <div>
        {popularPosts.map((post, index) => {
          return (
            <div className={styles.containerSong}>
              <p className={styles.songFirstHalfIndex}>{index + 1}</p>
              <PopularPost post={post} />
              <PlayButton tracks={popularPosts} track={post} trackIndex={index}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
