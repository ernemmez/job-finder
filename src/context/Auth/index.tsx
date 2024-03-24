import React, { createContext, useContext, useEffect, useState, FC, ReactNode } from "react";

import { getAuthTokens, getProfile } from "@/services/auth";

type AuthContextType = {
  isLoggedIn: boolean;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

const AuthContext = createContext<AuthContextType>({ isLoggedIn: false, user: null, setUser: () => {} });

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const { accessToken } = getAuthTokens();

    const isLoggedIn = !!accessToken;
    setIsLoggedIn(isLoggedIn);
  }, [user]);

  useEffect(() => {
    if (isLoggedIn && !user) {
      getProfile()
        .then(res => console.log("eren profile data -->", res))
        .catch(error => {
          console.error("Profile fetch error:", error);
        });
    }
  }, [isLoggedIn]);

  return <AuthContext.Provider value={{ isLoggedIn, user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
