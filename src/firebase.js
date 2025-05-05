import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import {
  APIKEY,
  APPID,
  AUTHDOMAIN,
  DATABASEURL,
  MEAUSERMENTID,
  MESSANGINGSENDERID,
  PROJECTID,
  STORAGEBUCKET,
} from "./GlobalConstant";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSANGINGSENDERID,
  appId: APPID,
  measurementId: MEAUSERMENTID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, app, db };
