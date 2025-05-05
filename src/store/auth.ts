import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "@/firebase"; // Your Firebase auth instance
import router from "@/router";
import { doc, getDoc } from "firebase/firestore";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(null);
  const accessToken = ref(null);
  const refreshToken = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const currentUser = computed(() => user.value);
  const getAccessToken = computed(() => accessToken.value);
  const getRefreshToken = computed(() => refreshToken.value);

  // Actions
  // const init = () => {
  //   loading.value = true;
  //   onAuthStateChanged(auth, (firebaseUser) => {
  //     console.log("🚀 ~ onAuthStateChanged ~ firebaseUser:", firebaseUser)
  //     if (firebaseUser) {
  //       user.value = firebaseUser;
  //     } else {
  //       user.value = null;
  //     }
  //     loading.value = false;
  //   });
  // };

  // const register = async (email, password) => {
  //   try {
  //     loading.value = true;
  //     error.value = null;
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     user.value = {
  //       uid: userCredential.user.uid,
  //       email: userCredential.user.email
  //     };
  //     router.push('/dashboard');
  //   } catch (err) {
  //     error.value = err.message;
  //     throw err;
  //   } finally {
  //     loading.value = false;
  //   }
  // };
  const clearAuthData = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };
  const login = async (email:string, password:string) => {
    try {
      loading.value = true;
      error.value = null;

      // 1. Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 2. Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (!userDoc.exists()) {
        throw new Error("User data not found");
      }

      const userData = userDoc.data();
  

      // 3. Get and store tokens
      const token = await userCredential.user.getIdToken();
      accessToken.value = token;
      refreshToken.value = userCredential.user.refreshToken;
    

      // 4. Set user data in store
      user.value = {
        uid: userCredential.user.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        email:userData.email,
        image: userData.image,
      };
      console.log("🚀 ~ login ~ userData:",user.value)
      console.log("🚀 ~ login ~ userData:", user.value)
      // 5. Persist to localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", userCredential.user.refreshToken);
     

      // 6. Redirect to home
      router.push("/home");
    } catch (err) {
      error.value = err.message;
      // clearAuthData();
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  const logout = async () => {
    try {
      loading.value = true;
      await signOut(auth);
      user.value = null;
      router.push("/");
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // // Initialize auth state when store is created
  // init();

  return {
    user,
    loading,
    error,
    isAuthenticated,
    currentUser,
    // register,
    login,
    logout,
    // init,
  };
});
