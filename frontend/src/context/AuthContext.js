import React, { createContext, useContext, useReducer, useEffect } from 'react';

// API configuration (fallback to localhost if env not set)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Add auth token if it exists
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
};

const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        error: null
      };
    case 'AUTH_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    try {
      const res = await apiCall('/auth/me', { method: 'GET' });
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          token: localStorage.token,
          user: res.data.user
        }
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAIL',
        payload: error.message || 'Failed to load user'
      });
    }
  };

  // Register user
  const register = async (formData) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const res = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          token: res.token,
          user: res.data.user
        }
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch({
        type: 'AUTH_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const res = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          token: res.token,
          user: res.data.user
        }
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({
        type: 'AUTH_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await apiCall('/auth/logout', { method: 'GET' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    dispatch({ type: 'LOGOUT' });
  };

  // Update user details
  const updateUser = async (userData) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const res = await apiCall('/auth/updatedetails', {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      dispatch({
        type: 'UPDATE_USER',
        payload: res.data.user
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Update failed';
      dispatch({
        type: 'AUTH_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Update password
  const updatePassword = async (currentPassword, newPassword) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const res = await apiCall('/auth/updatepassword', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          token: res.token,
          user: res.data.user
        }
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Password update failed';
      dispatch({
        type: 'AUTH_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        updateUser,
        updatePassword,
        clearErrors,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
