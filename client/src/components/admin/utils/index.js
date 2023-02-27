import axios from "axios";

export const axiosRole = (userSelected, setUserSelected) => {
  const newUser = userSelected;
  if (userSelected?.role === "Admin") {
    newUser.role = "User";
    setUserSelected({ ...userSelected, role: "User" });
  } else if (userSelected?.role === "User") {
    newUser.role = "Admin";
    setUserSelected({ ...userSelected, role: "Admin" });
  }
  axios.put(`/users/set/role`, {
    ...newUser,
  });
};

export const axiosIsBanned = (userSelected, setUserSelected, reasonBan) => {
  const newUser = userSelected;
  if (userSelected?.isBanned) {
    newUser.isBanned = false;
    setUserSelected({ ...userSelected, isBanned: false });
    axios.put(`/users/set/update-ban`, {
      ...newUser,
      reasonBan: "",
    });
  } else if (!userSelected?.isBanned) {
    newUser.isBanned = true;
    setUserSelected({ ...userSelected, isBanned: true });
    axios.put(`/users/set/update-ban`, {
      ...newUser,
      reasonBan,
    });
  }
};

export const axiosPremium = (userSelected, setUserSelected) => {
  const newUser = userSelected;
  if (userSelected?.plan === "Premium") {
    newUser.plan = "Regular";
    setUserSelected({ ...userSelected, plan: "Regular" });
  } else if (userSelected?.plan === "Regular") {
    newUser.plan = "Premium";
    setUserSelected({ ...userSelected, plan: "Premium" });
  }
  axios.put(`/users/set/plan`, {
    ...newUser,
  });
};

export const arrayToDataGraphsUser = (array) => {
  let bannedUser = 0;
  let premiumUser = 0;
  let regularUser = 0;
  array.map((user) =>
    user.isBanned
      ? bannedUser++
      : user.plan === "Premium"
      ? premiumUser++
      : regularUser++
  );
  return { bannedUser, premiumUser, regularUser };
};

export const arrayToDataGraphsPosts = (array) => {
  if (array.length < 1) return "No Post Data";
  //let months = {Jan: 0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0}
  let datesArr = array.map((post) => {
    let date = new Date(post.postDate);
    date = date.toDateString().split(" ").splice(1);
    return date;
  });
  let postedIn = [];
  let indexFinded;

  datesArr.map((date) => {
    indexFinded = postedIn.findIndex((act) => act[date[2]]);
    if (indexFinded < 0) {
      postedIn.push({
        [`${date[2]}`]: {
          Jan: 0,
          Feb: 0,
          Mar: 0,
          Apr: 0,
          May: 0,
          Jun: 0,
          Jul: 0,
          Aug: 0,
          Sep: 0,
          Oct: 0,
          Nov: 0,
          Dec: 0,
        },
      });
      postedIn[postedIn.length - 1][date[2]][date[0]]++;
    } else {
      postedIn[indexFinded][date[2]][date[0]]++;
    }
    return;
  });
  return postedIn;
};
