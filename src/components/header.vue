<!-- src/components/AppHeader.vue -->
<template>
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <h1>Welcome {{ getFullName(currentUser.firstName,currentUser.lastName) }}</h1>
        </div>
        <div class="header-right">
          <button @click="handleLogout" class="logout-btn">
            <span>Logout</span>
            <i class="fas fa-sign-out-alt"></i> <!-- Optional icon -->
          </button>
        </div>
      </div>
    </header>
    <div><h1>welcome</h1><h4>{{ currentUser.firstName}} {{currentUser.lastName }} </h4></div>
  </template>
  
  <script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import {getFullName} from '../Global';
const router = useRouter();
const authStore = useAuthStore();
 const {currentUser,logout}= authStore
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };
  </script>
  
  <style scoped>
  .app-header {
    width: 100%;
    background-color:#fbc2eb;
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header-left h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
  }
  
  .logout-btn {
    background-color: #a18cd1;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.3s ease;
  }
  
  .logout-btn:hover {
    background-color: #a18cd1;
  }
  
  .logout-btn i {
    font-size: 1rem;
  }
  </style>