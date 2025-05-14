import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
