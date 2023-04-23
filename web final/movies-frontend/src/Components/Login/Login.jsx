import React, { useState } from "react";
import axios from "axios";
// import uploader from "./../../images/uploader.png";
import swal from "sweetalert";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { currentUserData } from "../../Redux/UserReducer";
import { setSideBar } from "../../Redux/UserReducer";
import { SERVERURL } from "../../ServerUrl";
const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const cookies = new Cookies();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const loginClicked = async () => {
    try{
        const response = await axios.post(`${SERVERURL}/login`, user);
        console.log("response", response);
        cookies.set("_id", response?.data?.user?._id, { path: "/" });
        
        cookies.set("token", response?.data?.token, { path: "/" });
        if(response?.data?.status)
        {
          dispatch(currentUserData(response?.data?.user))
          dispatch(setSideBar("dashBoard"))
          navigate('/dashboard')
            swal ( "Successfully" , response?.data?.message ,  "success" )

        }
    }catch(error)
    {
        console.error("error",error);

        swal ( "Failed" , error?.response?.data?.message,  "error" )

    }

  
  };
  return (
    <>
      <div className="mainLogin">
        <div className="loginCard">
          <div className="signInTxt">SIGN IN</div>

          <input
            className="inputLogin"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
          />

          <input
            className="inputLogin"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />

          <div className="btnLogin" onClick={loginClicked}>
            LOGIN
          </div>

          <Link to="/signup" style={{ textDecoration: "none" }}>
            {" "}
            <div className="creatAccTxt">Create new Account?</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
