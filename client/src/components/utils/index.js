import axios from "axios";

export const userExistGoogle = async (user) => {
  return axios
    .post("/user", {
      ...user,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const userExistSignUp = (user, usersDB) => {
  if (user && !usersDB?.some((u) => u.email === user.email)) {
    return axios
      .post("/user", {
        ...user,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        return "Ya existe una cuenta con este email";
      });
  }
  return "No se mando";
};
