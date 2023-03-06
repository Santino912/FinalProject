export function getFollowOfThisUser(followers, _id) {
  let check;
  check = followers?.some((id) => id.following === _id);
  return check;
}
