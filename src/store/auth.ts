import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  
} from "firebase/auth";
import { auth, db } from "@/firebase"; // Your Firebase auth instance
import router from "@/router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { clearForm, User } from "@/interfaces/user";
import { showAlert } from "@/utilis/alert";

export const useAuthStore = defineStore("auth", () => {
  // State initialization with localStorage check
  const user = ref<User>(JSON.parse(localStorage.getItem('user')));
  console.log("🚀 ~ useAuthStore ~ user:", user);
  const accessToken = ref(localStorage.getItem("accessToken") || null);
  const refreshToken = ref(localStorage.getItem("refreshToken") || null);
  const loading = ref(false);
  const error = ref(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const currentUser = computed(() => user.value);
  const getAccessToken = computed(() => accessToken.value);
  const getRefreshToken = computed(() => refreshToken.value);
  // Actions
  const register = async (newUser) => {
    console.log("🚀 ~ register ~ newUser:", newUser);
    try {
      loading.value = true;
      error.value = null;
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      const firebaseUser = userCredential.user;
      const userDocRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userDocRef, {
        uid: firebaseUser.uid,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        age: newUser.age,
        email: newUser.email,
        image:newUser.image
      });
      showAlert({
              title: "Success!",
              icon: "success", // Now properly typed
              text: "Operation completed successfully",
              confirmButtonText: "ok",
            }).then((result) => {
              clearForm();
              if (result.isConfirmed) {
                router.push("/");
              }
            })
    } catch (error) {
      if (error.code === "permission-denied") {
              showAlert({
                title: "Oops...",
                icon: "error",
                text: "Database permissions error. Contact support.",
              });
            } else if (error.code === "auth/email-already-in-use") {
              showAlert({
                title: "Oops...",
                icon: "error",
                text: "Email already in use.",
              });
            }
            // Handle errors (show to user)
          }
     finally {
      loading.value = false;
    }
  };
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
      // 5. Persist to localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", userCredential.user.refreshToken);
      localStorage.setItem("user", JSON.stringify(user.value)); // Store user object

      // 6. Redirect to home
      router.push("/home");
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  const logout = async () => {
    try {
      loading.value = true;
      await signOut(auth);
      clearAuthData();
      router.push("/");
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  return {
    user,
    loading,
    error,
    isAuthenticated,
    currentUser,
    register,
    login,
    logout,
  };
});
