import { useState, useEffect, createContext } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // on login
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("Login event");
    });

    // init Netlify Identity connection.
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };
  const context = { user, login };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
