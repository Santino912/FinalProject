import { Router } from "express"
import createComment from "../controller/comments/createComment";
import deleteComment from "../controller/comments/deleteComment";
import getByPostId from "../controller/comments/getByPostId";
import getByGenre from "../controller/filters/getByGenre";
import getByGenreWithAll from "../controller/filters/getByGenreWithAll";
import getByTime from "../controller/filters/getByTime";
import getPopular from "../controller/filters/getPopular";
import addFollower from "../controller/follows/addFollower";
import removeFollower from "../controller/follows/removeFollower";
import getGenres from "../controller/genres/getGenres";
import changeStatusLike from "../controller/likes/changeStatusLike";
import createLike from "../controller/likes/createLike";
import getLikesByPostAndUserId from "../controller/likes/getLikesByPostAndUserId";
import getLikesByPostId from "../controller/likes/getLikesByPostId";
import getLikesByUserId from "../controller/likes/getLikesByUserId";
import createNoti from "../controller/notifications/createNoti";
import getNotiByUser from "../controller/notifications/getNotiByUser";
import setNotiDisabled from "../controller/notifications/setNotiDisabled";
import setNotiWatched from "../controller/notifications/setNotiWatched";
import payment from "../controller/pay/payment";
import createPost from "../controller/posts/createPost";
import deletePost from "../controller/posts/deletePost";
import getPosts from "../controller/posts/getPost";
import getPostById from "../controller/posts/getPostById";
import updatePost from "../controller/posts/updatePost";
import createReport from "../controller/reports/createReport";
import getReports from "../controller/reports/getReports";
import createReview from "../controller/reviews/createReview";
import getReview from "../controller/reviews/getReview";
import changePlanUser from "../controller/users/changePlanUser";
import createUser from "../controller/users/createUser";
import deleteUser from "../controller/users/deleteUser";
import downToRegular from "../controller/users/downToRegular";
import getCountUserGraphs from "../controller/users/getCountUserGraphs";
import getUserById from "../controller/users/getUserByIdAdmin";
import getUserByidGoogle from "../controller/users/getUserByIdGoogle";
import getUsers from "../controller/users/getUsers";
import restoreUser from "../controller/users/restoreUser";
import setUserGenres from "../controller/users/setUserGenres";
import updateBanUser from "../controller/users/updateBanUser";
import updateRoleUser from "../controller/users/updateRoleUser";
import updateUser from "../controller/users/updateUser";
import upToPremium from "../controller/users/upToPremium";
import getByUserPleasures from "../controller/posts/getByUserPleasures";
import getPostByUserId from "../controller/posts/getPostByUserId";
import getFollowsByIdUser from "../controller/follows/getFollowsByIdUser";
import getPostsLiked from "../controller/posts/getPostsLiked";
//import { putGenresInDB } from "../utils/GenresToDatabase";
//putGenresInDB()

const router = Router();

//GET
router.get("/users", getUsers);
router.get("/users/:_id", getUserById);
router.get("/users/idGoogle/:idGoogle", getUserByidGoogle);
router.get("/users/data/graphs", getCountUserGraphs) //Admin

router.get("/posts", getPosts);
router.get("/posts/:_id", getPostById);
router.get("/posts/user/likes/:idUser", getPostsLiked);
router.get("/posts/genres/:genres", getByGenre);
router.get("/posts/orderTime/:order", getByTime);
router.get("/posts/order/popularity", getPopular);
router.get("/posts/user/:idUser", getPostByUserId)
router.get("/posts/genres/with-all", getByGenreWithAll);
router.get("/posts/user/pleasures/:idGoogle", getByUserPleasures);

router.get("/follows/:idUser", getFollowsByIdUser)

router.get("/genres", getGenres);

router.get("/notifications/:_id", getNotiByUser);

router.get("/likes/users/:idUser", getLikesByUserId);
router.get("/likes/posts/:idPost", getLikesByPostId);
router.get("/likes/:idPost/:idUser", getLikesByPostAndUserId);

router.get("/comments/:idPost", getByPostId);

router.get("/reviews", getReview);

router.get("/reports", getReports); //Only for admin!

//POST

router.post("/posts", createPost);

router.post("/user", createUser);

router.post("/users/follow", addFollower);
router.post("/users/unfollow", removeFollower);

router.post("/likes", createLike);

router.post("/comments", createComment);

router.post("/notifications/create", createNoti);

router.post("/reviews", createReview);

router.post("/reports", createReport);

router.post("/create-checkout-session", payment);

//DELETE

router.delete("/users/:_id", deleteUser);

router.delete("/posts/:_id", deletePost);

router.delete("/comments/:_id", deleteComment);

//PUT

router.put("/users/:_id", updateUser);
router.put("/users/premium/:_id", upToPremium);
router.put("/users/regular/:_id", downToRegular);
router.put("/users/set/plan", changePlanUser);
router.put("/users/set/genres", setUserGenres);
router.put("/users/set/update-ban", updateBanUser);
router.put("/users/set/role", updateRoleUser);

router.put("/notifications/watched/:_id", setNotiWatched);
router.put("/notifications/disabled/:_id", setNotiDisabled);

router.put("/posts/:_id", updatePost);

router.put("/restore/:_id", restoreUser);

router.put("/likes", changeStatusLike);

export default router;