import React, { useState } from "react";
import "./style.css";
import Input from "./../Input/index";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUpComp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmPass !== "") {
      if (password === confirmPass) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User >>>", user);
            toast.success("User created");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
            setLoading(false);
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
          });
      } else {
        toast.error("Password's does not Match!");
        setLoading(false);
        setPassword("");
        setConfirmPass("");
      }
    } else {
      toast.error("All field's are Mandatory!");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    setLoading(true);
    console.log("Email:" + email + " Password: " + password);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User logged in", user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
          setEmail("");
          setPassword("");
        });
    } else {
      toast.error("All field's are Mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    if (!user) return;
    setLoading(true);
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false);
        toast.success("Doc created");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      //toast.error("Doc already exist!");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user >>>",user);
          createDoc(user);
          navigate("/dashboard");
          setLoading(false);
          toast.success("User Authenticated!");
        })
        .catch((error) => {
          setLoading(false);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              label={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example123@"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email & Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Login Using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              or Dont Have An Account? Click here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              label={"Email"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              label={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example123@"}
            />
            <Input
              label={"Confirm Password"}
              type="password"
              state={confirmPass}
              setState={setConfirmPass}
              placeholder={"Example123@"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "SignUp Using Email & Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "SignUp Using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              or Have An Account Already? Click here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpComp;
