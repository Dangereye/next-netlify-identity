import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../stores/authContext";

const Guides = () => {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/guides",
        user && {
          headers: { Authorization: `Bearer ${user.token.access_token}` },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You must be logged in to view this content.");
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);
  return (
    <div className="guides-page">
      <h2>All Guides</h2>
      {!authReady && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {guides && (
        <div className="guides-page__guides">
          {guides.map((guide, index) => (
            <div
              key={`${index}-${guide.title}`}
              className="guides-page__guides__guide"
            >
              <h3>{guide.title}</h3>
              <h4>Written by {guide.author}</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
                ea officia corrupti deleniti, cum atque ex labore aperiam
                eligendi porro veritatis maxime natus! Repellat, vitae corporis
                modi in laudantium, quia facere necessitatibus debitis earum,
                voluptatum laborum consectetur officiis cupiditate molestias.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Guides;
