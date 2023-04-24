import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";

export const uploadContent = async (file, setLoading, loading) => {
  const fileRef = ref(storage, `content/${file.name + Math.random()}`);
  return uploadBytes(fileRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((url) => {
      setLoading({ ...loading, content: false });
      return url;
    });
};

export const uploadCover = async (file, setLoading, loading) => {
  const fileRef = ref(storage, `cover/${file.name + Math.random()}`);
  return uploadBytes(fileRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((url) => {
      setLoading({ ...loading, cover: false });
      return url;
    })
    .catch((err) => console.log(err));
};
