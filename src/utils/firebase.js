import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDvG0c2EVfSzzBM-nUgAVwrLAytjq-ipK0",
  authDomain: "video-list-91d77.firebaseapp.com",
  projectId: "video-list-91d77",
  storageBucket: "video-list-91d77.appspot.com",
  messagingSenderId: "726583994129",
  appId: "1:726583994129:web:75d5235ddd9523b910ceb0"
};

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveVideo = (videoData) => addDoc(collection(db, 'videos'), videoData)

export const onGetVideos = (cb) => onSnapshot(collection(db, 'videos'), cb)

export const deleteVideo = (id) => deleteDoc(doc(db, 'videos', id))

