// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: any) => {
//   const [userRole, setUserRole] = useState(null);
//   const [userName, setUserName] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [userBranch, setUserBranch] = useState('');

//   return (
//     <AuthContext.Provider
//       value={{
//         userRole,
//         setUserRole,
//         userName,
//         setUserName,
//         userEmail,
//         setUserEmail,
//         userBranch,
//         setUserBranch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {

  const [userRole, setUserRole] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userBranch, setUserBranch] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // ================= AUTO LOGIN =================
  useEffect(() => {
    const loadUser = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        const name = await AsyncStorage.getItem('userName');
        const branch = await AsyncStorage.getItem('officeLocation');
        const storedToken = await AsyncStorage.getItem('token');

        if (role !== null && role !== undefined) {
          setUserRole(Number(role));
        }

        if (name) setUserName(name);

        if (branch) {
          try {
            setUserBranch(JSON.parse(branch));
          } catch {
            setUserBranch(branch);
          }
        }

        if (storedToken) setToken(storedToken);

      } catch (e) {
        console.log('Error loading user:', e);
      } finally {
        setLoading(false);
        console.log("Auth Loaded");
      }
    };

    loadUser();
  }, []);

  // ================= LOGOUT =================
  const logout = async () => {

    await AsyncStorage.multiRemove([
      'token',
      'user',
      'userRole',
      'userName',
      'officeLocation'
    ]);

    setUserRole(null);
    setUserName(null);
    setUserEmail(null);
    setUserBranch('');
    setToken(null);
  };

  const isLoggedIn = userRole !== null;

  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userBranch,
        setUserBranch,
        token,
        setToken,
        logout,
        loading,
        isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);