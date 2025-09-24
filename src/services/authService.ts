import { User, AuthState } from '../types';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null
};



const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      // add more user info if needed
      getIdToken: () => userCredential.user.getIdToken(),
    };
  } catch (error) {
    return null;
  }
};


/**
 * Login user
 */

export const login = async (email: string, password: string): Promise<AuthState> => {
  try {
    const user = await loginUser(email, password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = await user.getIdToken(); // get fresh token
    
    localStorage.setItem('token', token);
    
    return {
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
      error: null
    };
  } catch (error) {
    localStorage.removeItem('token'); // remove bad token if any
    return {
      ...initialAuthState,
      error: error instanceof Error ? error.message : 'An error occurred during login'
    };
  }
};


/**
 * Register user
 */
export const register = async (
  name: string, 
  email: string, 
  password: string
): Promise<AuthState> => {
  try {
    // Register with Firebase
    const user = await registerUser(email, password, name);
    
    if (!user) {
      throw new Error('Registration failed');
    }
    
    // Get token from localStorage (Firebase handles this internally)
    const token = localStorage.getItem('token') || 'firebase-token';
    
    // Store token in localStorage
    localStorage.setItem('token', token);
    
    // Return updated auth state
    return {
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
      error: null
    };
  } catch (error) {
    return {
      ...initialAuthState,
      error: error instanceof Error ? error.message : 'An error occurred during registration'
    };
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<AuthState> => {
  // Logout from Firebase
  await logoutUser();
  
  // Remove token from localStorage
  localStorage.removeItem('token');
  
  // Return initial auth state
  return initialAuthState;
};

/**
 * Get current user
 */
export const getCurrentUserAuth = async (): Promise<AuthState> => {
  try {
    // Get current user from Firebase
    const user = await getCurrentUser();
    
    if (!user) {
      return initialAuthState;
    }
    
    // Get token from localStorage (Firebase handles this internally)
    const token = localStorage.getItem('token') || 'firebase-token';
    
    return {
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
      error: null
    };
  } catch (error) {
    // If there's an error, clear the token and return to initial state
    localStorage.removeItem('token');
    return initialAuthState;
  }
};