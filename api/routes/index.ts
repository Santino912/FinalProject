import { Router } from "express"
import createComment from "../controller/comments/createComment";
import deleteComment from "../controller/comments/deleteComment";
import getByPostId from "../controller/comments/getByPostId";
import getByGenre from "../controller/filters/getByGenre";
import getPostsToHome from "../controller/filters/getPostsToHome";
import createFollower from "../controller/follows/createFollower";
import getGenres from "../controller/genres/getGenres";
import changeStatusLike from "../controller/likes/changeStatusLike";
import createLike from "../controller/likes/createLike";
import createNoti from "../controller/notifications/createNoti";
import getNotiByUser from "../controller/notifications/getNotiByUser";
import setNotiDisabled from "../controller/notifications/setNotiDisabled";
import setNotiWatched from "../controller/notifications/setNotiWatched";
import payment from "../controller/pay/payment";
import createPost from "../controller/posts/createPost";
import deletePost from "../controller/posts/deletePost";
import getPosts from "../controller/posts/getPosts";
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
import getUserById from "../controller/users/getUserById";
import getUsers from "../controller/users/getUsers";
import restoreUser from "../controller/users/restoreUser";
import setUserGenres from "../controller/users/setUserGenres";
import updateBanUser from "../controller/users/updateBanUser";
import updateRoleUser from "../controller/users/updateRoleUser";
import updateUser from "../controller/users/updateUser";
import upToPremium from "../controller/users/upToPremium";
import getPostByUserId from "../controller/posts/getPostByUserId";
import getPostsLiked from "../controller/posts/getPostsLiked";
import getUserByidGoogle from "../controller/users/getUserByIdGoogle";
import updateFollow from "../controller/follows/updateFollow";
import getLikedUserPost from "../controller/likes/getLikedUserPost";
//import { putGenresInDB } from "../utils/GenresToDatabase";
//putGenresInDB()

const router = Router();

//GET
router.get("/users", getUsers);
router.get("/users/:_id", getUserById);
router.get("/users/idGoogle/:idGoogle", getUserByidGoogle);
router.get("/users/data/graphs", getCountUserGraphs) //Admin

router.get("/posts/filtered", getPosts);
router.get("/posts/:_id", getPostById);
router.get("/posts/user/likes/:idUser", getPostsLiked);
router.get("/posts/genres/:genres", getByGenre);
router.get("/posts/home/all", getPostsToHome)
router.get("/posts/user/:idUser", getPostByUserId)


router.get("/genres", getGenres);

router.get("/notifications/:_id", getNotiByUser);

router.get("/likes/user/:type/:idUser", getLikedUserPost);


router.get("/comments/:idPost", getByPostId);

router.get("/reviews", getReview);

router.get("/reports", getReports); //Only for admin!

//POST

router.post("/posts", createPost);

router.post("/user", createUser);

router.post("/follow/create", createFollower);

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
router.put("/notifications/disabled/:_id/:idUser", setNotiDisabled);

router.put("/posts/:_id", updatePost);

router.put("/restore/:_id", restoreUser);

router.put("/follow/change", updateFollow)

router.put("/likes", changeStatusLike);

export default router;