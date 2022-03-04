import {
  doc,
  arrayUnion,
  increment,
  setDoc,
  collection,
  updateDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from ".";

export const recordScan = async (latitude, longitude, token, id) => {
  const docRef = await getDoc(doc(db, `tokens/${token}`));
  if (!docRef.exists()) return;
  const docData = docRef.data();
  if (!docData?.ignoreList?.includes(id)) {
    if (latitude) {
      const duplicates = docData?.locations?.filter((location) => {
        const latDiff = Math.abs(location.lat - latitude);
        const lngDiff = Math.abs(location.lng - longitude);
        return latDiff + lngDiff < 0.005;
      });
      if (!duplicates?.length) {
        await updateDoc(doc(db, `tokens/${token}`), {
          locations: arrayUnion({ lat: latitude, lng: longitude }),
        });
      }
    }
    const scanData = {
      id,
      createdAt: Date.now(),
      token,
      lat: latitude || null,
      lng: longitude || null,
    };
    await addDoc(collection(db, `tokens/${token}/scans`), scanData);
    await addDoc(collection(db, `tokens/${token}/recentScans`), scanData);
    return await updateDoc(doc(db, `tokens/${token}`), {
      ignoreList: arrayUnion(id),
      allTime: increment(1),
      last7: increment(1),
    });
  }
};

export const newToken = async (token, owner, openseaUrl, name, image) => {
  const docRef = await getDoc(doc(db, `tokens/${token}`));
  if (!docRef.exists()) {
    return await setDoc(doc(db, `tokens/${token}`), {
      owner,
      openseaUrl,
      name,
      image,
      token,
    });
  } else {
    return await updateDoc(doc(db, `tokens/${token}`), {
      owner,
      openseaUrl,
      name,
      image,
      token,
    });
  }
};
