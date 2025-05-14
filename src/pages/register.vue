<template>
  <div class="full-width-container">
    <h1 class="form-title">Register</h1>
    <form @submit.prevent="signUp" class="register-form">
      <!-- Left Column -->
      <div class="form-column left-column">
        <label>First name</label>
        <input
          type="text"
          id="firstName"
          v-model="user.firstName"
          placeholder="Enter your firstName"
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          id="lastName"
          v-model="user.lastName"
          placeholder="Enter your lastName"
          required
        />

        <label>Age</label>
        <input
          type="number"
          id="age"
          v-model="user.age"
          placeholder="Enter your age"
          required
        />
      </div>

      <!-- Right Column -->
      <div class="form-column right-column">
        <label>Image</label>
        <input
          type="file"
          id="image"
          @change="handleImageUpload"
          accept="image/*"
          required
        />

        <label>Email</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          placeholder="Enter your password"
          required
        />

        <button type="submit" class="login-btn">Sign In</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { clearForm, user } from "@/interfaces/user";
import { useAuthStore } from "@/store/auth";
const handleImageUpload = (e) => {
 user.value.image = e.target.files[0];
};
const authStore = useAuthStore();
const signUp = async () => {
  try {
    let imageData = null;
    if (user.value.image) {
      const reader = new FileReader();
      imageData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(user.value.image);
      });
      
    }
  const  newUser= {
    firstName:  user.value.firstName,
    lastName:  user.value.lastName,
    age:  user.value.age,
    email:  user.value.email,
    password:  user.value.password,
    image:  imageData,
  };
    await authStore.register(newUser);
  } catch (error) {
  console.log("🚀 ~ signIn ~ error:", error)
  }
};
// const registerUser = async () => {
//   try {
//     // 1. Create user with email/password
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       user.value.email,
//       user.value.password
//     );
//     const firebaseUser = userCredential.user;
//     // 2. Upload image if exists
//     let imageData = null;
//     if (user.value.image) {
//       const reader = new FileReader();
//       imageData = await new Promise((resolve) => {
//         reader.onload = () => resolve(reader.result);
//         reader.readAsDataURL(user.value.image);
//       });
      
//     }
//     const userDocRef = doc(db, "users", firebaseUser.uid);
//     await setDoc(userDocRef, {
//       uid: firebaseUser.uid,
//       firstName: user.value.firstName,
//       lastName: user.value.lastName,
//       age: user.value.age,
//       email: user.value.email,
//       image:imageData
//     });
//     showAlert({
//       title: "Success!",
//       icon: "success", // Now properly typed
//       text: "Operation completed successfully",
//       confirmButtonText: "ok",
//     }).then((result) => {
//       clearForm();
//       if (result.isConfirmed) {
//         router.push("/");
//       }
//     });

//     return firebaseUser;
//     // Redirect or show success message
//   } catch (error) {
//     console.error("Registration error:", error.code, error.message);

//     if (error.code === "permission-denied") {
//       showAlert({
//         title: "Oops...",
//         icon: "error",
//         text: "Database permissions error. Contact support.",
//       });
//     } else if (error.code === "auth/email-already-in-use") {
//       showAlert({
//         title: "Oops...",
//         icon: "error",
//         text: "Email already in use.",
//       });
//     }
//     // Handle errors (show to user)
//   }
// };
</script>
<style scoped>
.full-width-container {
  width: 100%;
  padding: 20px 0;
  margin: 0;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
}

.register-form {
  display: flex;
  width: 150vh;
  margin: 0;
  padding: 0;
  gap: 40px;
}

.form-column {
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.left-column {
  padding-left: 0; /* Remove left padding to start from edge */
}

.right-column {
  padding-right: 0; /* Remove right padding to extend to edge */
}

label {
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.login-btn {
  padding: 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto; /* Pushes button to bottom */
}
</style>
