import { useState } from "react";
import "./LoginPage.css";
import { SignInPage } from "./SignInPage";

export const LoginPage = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginPage">
      <div className="loginPage__background">
        <img
          className="loginPage__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />

        <button onClick={() => setSignIn(true)} className="loginPage__button">
          Sign In
        </button>

        <div className="loginPage__gradient" />
      </div>

      <div className="loginPage__body">
        {signIn ? (
          <SignInPage />
        ) : (
          <>
            <h1>Unlimited movies, TV shoes, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="loginPage__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginPage__getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
