import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);

  // Trick to fading in NavBar
  const transitionNavBar = () => {
    if (window.scrollY > 150) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
    <div className={`navbar ${showNav && "navbar__black"}`}>
      <div className="navbar__contents">
        <img
          className="navbar__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
        <img
          className="navbar__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
          onClick={() => {
            navigate("/profile");
          }}
        />
      </div>
    </div>
  );
};
