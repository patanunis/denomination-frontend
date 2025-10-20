import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('🗂️ Loaded user from localStorage:', storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('✅ Parsed user:', parsedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('❌ Failed to parse stored user:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    console.log('💾 Saving user to localStorage:', user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
