import { useSelector } from "react-redux";
import { NavBar } from "../components/NavBar";
import { auth } from "../lib/firebase";
import { selectUser } from "../app/userSlice";
import { Plans } from "../components/Plans";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const user = useSelector(selectUser);

  return (
    <div className="profilePage">
      <NavBar />

      <div className="profilePage__body">
        <h1>Edit Profile</h1>
        <div className="profilePage__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profilePage__details">
            <h2>{user.email}</h2>
            <div className="profilePage__plans">
              <h3>Plans</h3>
              <Plans />

              <button
                className="profilePage__signOut"
                onClick={() => auth.signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
