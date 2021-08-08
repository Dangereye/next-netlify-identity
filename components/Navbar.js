import { useContext } from "react";
import { AuthContext } from "../stores/authContext";
import { ImUser } from "react-icons/im";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { user, login, logout, authReady } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="container">
      <nav className="navbar">
        <Image src="/rupee.png" width={50} height={48} />
        <h1>Gaming Vibes</h1>
        {authReady && (
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/guides">
                <a>Guides</a>
              </Link>
            </li>
            {!user && (
              <li onClick={login} className="btn">
                Login/Signup
              </li>
            )}
            {user && (
              <>
                <li className="user">{user.email}</li>
                <li onClick={logout} className="btn">
                  Logout
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} />
      </div>
    </div>
  );
};

export default Navbar;
