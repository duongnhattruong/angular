export interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    role: string | null;
  }
  
  export const initialAuthState: AuthState = {
    isLoggedIn: !!localStorage.getItem('isLoggedIn'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
  };
  