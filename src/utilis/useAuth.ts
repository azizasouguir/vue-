import { auth } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref } from 'vue';

export const useAuth = () => {
  // Reactive references to store user state
  const currentUser = ref<User | null>(null); // Firebase user object
  const isAuthenticated = ref(false); // Authentication status

  /**
   * Initializes authentication state listener
   * @returns Promise that resolves with the current user
   */
  const initAuth = () => {
    return new Promise((resolve) => {
      // Firebase auth state observer
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user; // Update current user
        isAuthenticated.value = !!user; // Update auth status
        resolve(user); // Resolve promise with user
      });
    });
  };

  /**
   * Gets the current user's ID token
   * @param forceRefresh - Whether to force token refresh
   * @returns Promise resolving with the token or null
   */
  const getIdToken = async (forceRefresh = false) => {
    if (!auth.currentUser) return null;
    return await auth.currentUser.getIdToken(forceRefresh);
  };

  /**
   * Refreshes the authentication token
   * @returns Promise resolving with new token or null
   */
  const refreshToken = async () => {
    try {
      // Force refresh the token
      const token = await getIdToken(true);
      // Store new token in localStorage
      localStorage.setItem('idToken', token || '');
      return token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout(); // Logout if refresh fails
      return null;
    }
  };

  /**
   * Handles user logout
   */
  const logout = async () => {
    await auth.signOut(); // Firebase sign out
    // Clear stored tokens
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
  };

  // Expose the auth methods and state
  // return {
  //   currentUser,       // Current Firebase user object
  //   isAuthenticated,  // Boolean auth status
  //   initAuth,         // Initialize auth state
  //   getIdToken,       // Get current ID token
  //   refreshToken,     // Refresh ID token
  //   logout            // Logout method
  // };
};
