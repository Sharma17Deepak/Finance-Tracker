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
    try{
      signOut(auth)
      .then(() => {
        navigate("/");
        toast.success("User Logged Out Successfully!");
        // Sign-out successful.
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }catch(e){
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Financly.</p>
      {user && (
      <div className="nav-head">
        <img src={defaultImg } 
          alt="user-image"
        />
        <p className="logo link" onClick={logoutfnc}>
          Logout
        </p>
      </div>
      )}
    </div>
  );
};

export default Header;
