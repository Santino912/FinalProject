interface matchObject {
  type?: String;
  genres?: Object;
}
interface matchObjectWithName {
  type?: String;
  genres?: Object;
  title: Object
}
export const setMatch = (type: String, genres: String | undefined): matchObject | {} => {
  let aux: matchObject = {}

  if (genres !== undefined && genres) {
    let arrGenres = genres?.replace(/-/g, "/")?.replace(/_/g, " ")?.split(",");
    aux.genres = { $in: arrGenres }
  }
  if (type !== undefined && type !== "all") {
    aux.type = type
  }
  return aux
};

export const setMatchWithName = (type: String, genres: String | undefined, name: String): matchObjectWithName | {} => {
  let aux: matchObjectWithName = {
    title: { $regex: name, $options: "i" }
  }
  if (genres !== undefined) {
    let arrGenres = genres?.replace(/-/g, "/")?.replace(/_/g, " ")?.split(",");
    aux.genres = { $in: arrGenres }
  }
  if (type !== undefined && type !== "all") {
    aux.type = type
  }
  return aux
};