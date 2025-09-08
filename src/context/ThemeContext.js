import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      if (typeof window === 'undefined') return false;
      
      // Check if localStorage is available
      if (!window.localStorage) return false;
      
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : false;
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
      return false;
    }
  });

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      
      // Check if localStorage is available
      if (!window.localStorage) return;
      
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      
      // Safely update document class
      if (document?.documentElement) {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (error) {
      console.warn('Error setting theme:', error);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
