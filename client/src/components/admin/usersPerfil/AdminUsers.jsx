import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Avatar, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import UsersPerfil from "./UsersPerfil";
import { axiosIsBanned, axiosPremium, axiosRole } from "../utils";
import { Arrow } from "../../componentsIcons";
import { getUser } from "../../../redux/features/users/usersGetSlice";
import style from "./admin.module.css";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arrUsers = useSelector((state) => state.users.usersListAll);

  const [loading, setLoading] = useState(true);
  const [userSelected, setUserSelected] = useState({
    name: "",
    isBanned: false,
    role: "",
    plan: "",
    _id: "",
    avatar: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [reasonBan, setReasonBan] = useState("");

  //componente con dos opciones para intercalar entre usuarios y reportes
  //buscar los post por titulo del post nombre del que lo subio y el usuario que lo reporto

  useEffect(() => {
    dispatch(getUser());
    setLoading(false);
  }, [dispatch, userSelected]);

  const formatResult = (user) => (
    <UsersPerfil user={user} setUserSelected={setUserSelected} />
  );

  const handleRole = async () => {
    setLoading(true);
    axiosRole(userSelected, setUserSelected);
  };

  const handlePremium = async () => {
    setLoading(true);
    axiosPremium(userSelected, setUserSelected);
  };

  const handleBan = async () => {
    setLoading(true);
    setShowForm(false);
    setReasonBan("");
    axiosIsBanned(userSelected, setUserSelected, reasonBan);
  };

  console.log(arrUsers);
  return (
    <Box className={style.backgroundAdmin}>
      <Box>
        <Dialog
          className={style.dialogContainer}
          open={showForm}
          onClose={() => setShowForm(false)}
        >
          <DialogTitle
            sx={{ backgroundColor: "var(--main-page-color)", width: "400px" }}
          >
            Ban for {userSelected?.name}
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "var(--main-page-color)" }}>
            <DialogContentText
              sx={{ backgroundColor: "var(--main-page-color)", color: "white" }}
            >
              Reason for the ban
            </DialogContentText>
            <TextField
              sx={{ backgroundColor: "var(--main-page-color)" }}
              autoFocus
              margin="dense"
              id="standard-multiline-static"
              label="Reason"
              multiline
              rows={4}
              value={reasonBan}
              variant="standard"
              fullWidth
              onChange={(e) => setReasonBan(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "var(--main-page-color)" }}>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={() => handleBan()}>Send</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Box className={style.containerOptions}>
        <Button
          className={style.arrow}
          sx={{
            textAlign: "center",
            backgroundColor: "var(--second-page-color)",
            borderRadius: "10px",
          }}
          onClick={() => navigate("/admin")}
        >
          <Arrow />
        </Button>
        <Box className={style.userSelectedDiv}>
          {userSelected?.avatar && <Avatar src={userSelected?.avatar} />}

          {userSelected?.name && (
            <h4 style={{ paddingTop: "10px" }}>{userSelected?.name}</h4>
          )}

          {userSelected?.name && (
            <Button
              onClick={() => handleRole()}
              sx={{ textTransform: "none" }}
              className={style.buttonUser}
              name={"role"}
              disable={`${loading}`}
            >
              Role: {userSelected?.role}
            </Button>
          )}

          {userSelected?.name && (
            <Button
              onClick={() =>
                userSelected?.isBanned ? handleBan() : setShowForm(true)
              }
              sx={{ textTransform: "none" }}
              className={style.buttonUser}
              name={"isBanned"}
              disable={`${loading}`}
            >
              Banned: {userSelected?.isBanned === true ? "Yes" : "No"}
            </Button>
          )}

          {userSelected?.name && (
            <Button
              onClick={() => handlePremium()}
              sx={{ textTransform: "none" }}
              className={style.buttonUser}
              name={"plan"}
              disable={`${loading}`}
            >
              IsPremium: {userSelected?.plan}
            </Button>
          )}
        </Box>
      </Box>
      <Box className={style.usersContainer}>
        <Box style={{ width: "99%" }}>
          <ReactSearchAutocomplete
            items={arrUsers}
            fuseOptions={{ keys: ["name"] }}
            autoFocus
            formatResult={(e) => formatResult(e)}
            styling={{
              backgroundColor: "var(--main-page-color)",
              color: "white",
              border: "1px solid var(--second-page-color)",
            }}
            className={style.reactSearchAutocomplete}
            onSelect={(e) =>
              setUserSelected({
                _id: e._id,
                isBanned: e.isBanned,
                role: e.role,
                plan: e.plan,
                name: e.name,
                avatar: e.avatar,
              })
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminUsers;
