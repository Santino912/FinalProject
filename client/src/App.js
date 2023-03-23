import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Explore from "./components/Explore/Explore";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import ProtectedRoute from "./context/ProtectedRoute";
import SupportForm from "./components/supportForm/SupportForm";
import Chat from "./components/Chat/Chat";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import AdminUsers from "./components/admin/usersPerfil/AdminUsers";
import PostContainer from "./components/postContainer/PostContainer";
import Notification from "./components/notification/Notification";
import Admin from "./components/admin/adminHome/Admin";
import AdminPosts from "./components/admin/posts/AdminPosts";
import Banned from "./components/banned/Banned";
import LikedVideos from "./components/likedVideos/LikedVideos";
import LikedSongs from "./components/likedSongs/LikedSongs";
import Success from "./components/success/Success";
import AdminGraphs from "./components/admin/graphs/AdminGraphs";
import Player from "./components/Player/Player.jsx";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Chat />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Chat />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/home/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/post/:idPost"
            element={
              <ProtectedRoute>
                <PostContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <ProtectedRoute>
                <AdminPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/graphs"
            element={
              <ProtectedRoute>
                <AdminGraphs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/youAreBanned"
            element={
              <ProtectedRoute>
                <Banned />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Navigate to="/login" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/explore"
            element={
              <ProtectedRoute>
                <SideBar />
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <SideBar />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/explore/:_id"
            element={
              <ProtectedRoute>
                <SideBar />
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/likedSongs"
            element={
              <ProtectedRoute>
                <SideBar />
                <LikedSongs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/likedVideos"
            element={
              <ProtectedRoute>
                <SideBar />
                <LikedVideos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/notification"
            element={
              <ProtectedRoute>
                <SideBar />
                <Notification />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Player />
      </AuthProvider>
    </React.StrictMode>
  );
}
export default App;
