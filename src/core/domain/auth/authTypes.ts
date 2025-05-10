export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  lastLogin: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export enum AuthActionTypes {
  LOGIN_REQUEST = 'auth/loginRequest',
  LOGIN_SUCCESS = 'auth/loginSuccess',
  LOGIN_FAILURE = 'auth/loginFailure',
  LOGOUT = 'auth/logout',
  REGISTER_REQUEST = 'auth/registerRequest',
  REGISTER_SUCCESS = 'auth/registerSuccess',
  REGISTER_FAILURE = 'auth/registerFailure',
  UPDATE_USER = 'auth/updateUser',
  UPDATE_PREFERENCES = 'auth/updatePreferences',
} 