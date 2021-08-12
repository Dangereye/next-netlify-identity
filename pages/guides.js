import { useContext, useEffect } from "react";
import { AuthContext } from "../stores/authContext";

const Guides = () => {
  const { user, authReady } = useContext(AuthContext);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/guides",
        user && {
          headers: { Authorization: `Bearer ${user.token.access_token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [user, authReady]);
  return (
    <div className="guides">
      <h2>All Guides</h2>
    </div>
  );
};

export default Guides;
