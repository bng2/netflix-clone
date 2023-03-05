import { useRef } from "react";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./SignInPage.css";

export const SignInPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Register the new user
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  // Sign in the user
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signInPage">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className="signInPage__grey">New to Netflix? </span>
          <span className="signInPage__link" onClick={register}>
            Sign up now
          </span>
          <span className="signInPage__grey">.</span>
        </h4>
      </form>
    </div>
  );
};
