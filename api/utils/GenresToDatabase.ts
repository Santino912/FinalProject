import genres from "../controller/genres/Data"
import Genres from "../models/Genres"

export const putGenresInDB = async () => {
    try {
        const genresInDB = await Genres.find()
        if (genresInDB.length < 22) {
            await Genres.create(genres)
        }
        return
    } catch (err) {
        console.log(err)
    }

}