const { Router } = require("express");
const createUser = require("../Controller/Users/createUser.js");
const getByGenre = require("../Controller/Filters/getByGenre.js");
const createPost = require("../Controller/Posts/createPost.js");
const deleteUser = require("../Controller/Users/deleteUser.js");
const deletePost = require("../Controller/Posts/deletePost.js");
const deleteComment = require("../Controller/Comments/deleteComment.js");
const getUsers = require("../Controller/Users/getUsers.js");
const getPosts = require("../Controller/Posts/getPosts.js");
const createComment = require("../Controller/Comments/createComment.js");
const createLike = require("../Controller/Likes/createLike.js");
const getByTime = require("../Controller/Filters/getByTime.js");
const getUserById = require("../Controller/Users/getUserById.js");
const getGenres = require("../Controller/Genres/getGenres.js");
const updateUser = require("../Controller/Users/updateUser.js");
const updatePost = require("../Controller/Posts/updatePost.js");
const getUserByIdGoogle = require("../Controller/Users/getUserByIdGoogle.js");
const createNoti = require("../Controller/Notifications/createNoti.js");
const getNotiByUser = require("../Controller/Notifications/getNotiByUser");
const restoreUser = require("../Controller/Users/restoreUser.js");
const payment = require("../Controller/payment.js");
const upToPremium = require("../Controller/Users/upToPremium.js");
const downToRegular = require("../Controller/Users/downToRegular.js");
const setNotiWatched = require("../Controller/Notifications/setNotiWatched");
const getUsersAdmin = require("../Controller/Users/getUserAdmin.js");
const getUserByIdGoogleAdmin = require("../Controller/Users/getUserByIdGoogleAdmin.js");
const getLikesByPostId = require("../Controller/Likes/getLikesByPostId.js");
const getPostById = require("../Controller/Posts/getPostById.js");
const getLikesByPostandUserId = require("../Controller/Likes/getLikesByPostandUserId.js");
const changeStatusLike = require("../Controller/Likes/changeStatusLike.js");
const getByPostId = require("../Controller/Comments/getByPostId.js");
const getUserByIdAdmin = require('../Controller/Users/getUserByIdAdmin');
const createReview = require('../Controller/Reviews/createReview.js');
const getReview = require('../Controller/Reviews/getReview.js');
const getLikesByUserId = require('../Controller/Likes/getLikesByUserId.js');
const addFollower = require('../Controller/Follows/addFollower.js');
const setNotiDisabled = require("../Controller/Notifications/setNotiDisabled.js");
const changePlanUser = require("../Controller/Users/changePlanUser.js");
const setUserGenres = require("../Controller/Users/setUserGenres.js");
const updateBanUser = require("../Controller/Users/updateBanUser.js");
const updateRoleUser = require("../Controller/Users/updateRoleUser.js");
const getReports = require("../Controller/Reports/getReports.js");
const createReport = require("../Controller/Reports/createReport.js");
const getPopular = require("../Controller/Filters/getPopular.js");
const getByGenreWithAll = require("../Controller/Filters/getByGenreWithAll.js");
const getCountUserGraphs = require("../Controller/Users/getCountUserGraphs.js");
const removeFollower = require("../Controller/Follows/removeFollower.js");


const router = Router();

router.get("/users", getUsers); //user
router.get("/usersAdmi", getUsersAdmin); //admin
router.get("/users/:userId", getUserById); //user
router.get("/usersAdmi/:userId", getUserByIdAdmin); //admin
router.get("/users/idgoogle/:idgoogle", getUserByIdGoogle); //user
router.get("/usersAdmi/idgoogle/:idgoogle", getUserByIdGoogleAdmin); //admin
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.get("/genres", getGenres);
router.get("/notifications/:userId", getNotiByUser);
router.get("/likes/users/:userId", getLikesByUserId);
router.get("/likes/posts/:postId", getLikesByPostId);
router.get("/likes/:postId/:userId", getLikesByPostandUserId);
router.get("/comments/:postId", getByPostId);
router.get("/reviews", getReview);
router.get("/reports", getReports); //Only for admin!
router.get("/posts/order/popular", getPopular);
router.get("/users/data/graphs", getCountUserGraphs)

router.post("/posts/order", getByTime);
router.post("/posts/genres", getByGenre);
router.post("/users", createUser);
router.post("/posts", createPost);
router.post("/likes", createLike);
router.post("/comments", createComment);
router.post("/users/follow", addFollower);
router.post("/users/unfollow", removeFollower);
router.post('/notifications/create', createNoti);
router.post('/create-checkout-session', payment);
router.post("/reviews", createReview);
router.post("/reports", createReport);
router.post("/posts/genres", getByGenre);
router.post("/posts/genres/with-all", getByGenreWithAll);
router.post("/posts/order/popular", getPopular);

router.post("/notifications/create", createNoti);
router.post("/create-checkout-session", payment);
router.post("/reviews", createReview);

router.delete("/users/:id", deleteUser);
router.delete("/posts/:id", deletePost);
router.delete("/comments/:id", deleteComment);

router.put("/users/:id", updateUser);
router.put("/posts/:id", updatePost);
router.put("/restore/:id", restoreUser);
router.put("/users/premium/:id", upToPremium);
router.put("/users/regular/:id", downToRegular);
router.put("/notifications/watched/:id", setNotiWatched);
router.put("/notifications/disabled/:id", setNotiDisabled);
router.put("/likes", changeStatusLike);
router.put("/users/set/plan", changePlanUser);
router.put("/users/set/genres", setUserGenres);
router.put("/users/set/update-ban", updateBanUser);
router.put("/users/set/role", updateRoleUser);

module.exports = router;
