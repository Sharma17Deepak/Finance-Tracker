import React, { useEffect } from "react";
import "./style.css";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../assets/user.svg";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutfnc() {
    try {
      signOut(auth)
        .then(() => {
          navigate("/");
          toast.success("User Logged Out Successfully!");
          // Sign-out successful.
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Financly.</p>
      {user ? (
        <p className="navbar-link" onClick={logoutfnc}>
          <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : defaultImg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          <pre className="logo link" onClick={logoutfnc}>
            Logout
          </pre>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
