import { useEffect, useState } from 'react';
import {
  projectFirestore,
  projectStorage,
  timestamp,
} from '../config/firebase';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    //Creates a reference
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images');
    //Uploading and downloading the image
    storageRef.put(file).on(
      'state_changed',
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { url, progress, error };
};
// Deleting image from  storage then firestore
export const deleteImage = async (deleteUrl, id) => {
  //Creates reference from url
  const httpsReference = projectStorage.refFromURL(deleteUrl);
  //Creates firestore reference
  const collectionRef = projectFirestore.collection('images');
  return httpsReference
    .delete()
    .then(() => {
      collectionRef.doc(id).delete();
    })
    .catch((err) => console.log(err));
};
export default useStorage;
