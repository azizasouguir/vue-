<template>
  <div class="split left">
    <div class="centered">
      <h1>Login</h1>
      <form @submit.prevent="signIn">
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
      </form>

      <div class="register-section">
        <p>
          Don't have an account?
          <a href="#" @click.prevent="goToRegister">Register here</a>
        </p>
      </div>
    </div>
  </div>

  <div class="split right">
    <div class="welcome-gradient">
      <h2 class="welcome-text">Welcome</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { user } from "@/interfaces/user";
import router from "@/router";
import { useAuthStore } from "@/store/auth";
import { showAlert } from "@/utilis/alert";
const authStore = useAuthStore();
const signIn = async () => {
  try {
    await authStore.login(user.value.email,user.value.password);
  } catch (error) {
    switch (error.code) {
        case "auth/invalid-email":
          showAlert({
            title: "Oops...",
            icon: "error",
            text: "'Invalid email'.",
            confirmButtonText: "ok",
          });

          break;
        case "auth/user-not-found":
          showAlert({
            title: "Oops...",
            icon: "error",
            text: "No account with that email was found",
            confirmButtonText: "ok",
          });

          break;
        case "auth/wrong-password":
          showAlert({
            title: "Oops...",
            icon: "error",
            text: "Incorrect password",
            confirmButtonText: "ok",
          });

          break;
        default:
          showAlert({
            title: "Oops...",
            icon: "error",
            text: "Email or password was incorrect",
            confirmButtonText: "ok",
          });

          break;
      }
    
  }
};

const goToRegister = () => {
  router.push("/register");
};
</script>
<style scoped>
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.left {
  left: 0;
  /* background-color: #111; */
}

.right {
  right: 0;
  /* background-color: red; */
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.welcome-gradient {
  height: 100%;
  width: 100%;
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-text {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
