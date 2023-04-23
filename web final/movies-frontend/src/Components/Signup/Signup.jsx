import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import uploader from "./../../images/uploader.png";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { SERVERURL } from "../../ServerUrl";

const Signup = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [imgPreview, setImgPreview] = useState(null);
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    // console.log("AHSAM2",selected)

    setUser({ ...user, image: selected });


    setUser({ ...user, image: selected });
    setImage(selected);

    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      //   setError(true);
    }
  };

  const handleSignUp = async () => {
   
    if(user.confirmPassword&&user.email&&user.image&&user.name&&user.password)
    { 

    
    //   Object.entries(user).forEach(([key, value]) => {


    //   formData.append(key, value);
    // });
    try {
      const formData = new FormData();
      formData.append("name",user.name);
      formData.append("email",user.email);
      formData.append("password",user.password);
      formData.append("photo",image);
      const response = await axios.post(
        `${SERVERURL}/register`,
        formData
      );
      if(response?.data?.success)
      {

        console.log("response",response.data.message);
        swal ( "Successfully" , response.data.message ,  "success" )

        navigate('/')

      }

    } catch (error) {
      console.error("error",error?.response?.data?.message);
      swal ( "Failed" , error?.response?.data?.message,  "error" )

    }

    }

   
  };

  const handleImage = (e) => {
    const selected = e.target.files[0];

    setUser({ ...user, image: selected });
  };

  console.log("user", user);

  return (
    <>
      <div className="mainLogin">
        <div className="registerCard">
          <div className="signInTxt">SIGNUP</div>

          {/* <input type='file' onChange={handleImage}/> */}
<div className="topProfInLablTop">

<div className="topProfInLabl">
            <div>PROFILE PICTURE</div>
            <div className="topProfilePic">
              <div
                className="profileImg"
                style={{
                  background: imgPreview
                    ? `url("${imgPreview}")  no-repeat center/cover`
                    : "",
                }}
              >
                {imgPreview ? "" : <img src={uploader} />}
              </div>

              <input
                type="file"
                id="file"
                accept="image/png , image/jpeg, image/webp"
                class="inputfile"
                onChange={handleImageChange}
              />
              <label for="file" className="chooseImageTxt">
                Upload Image
              </label>
            </div>
          </div>
</div>
        
          <input
            className="inputLogin"
            placeholder="Name"
            name="name"
            type="text"
            onChange={handleChange}
          />
          <input
            className="inputLogin"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <input
            className="inputLogin"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <input
            className="inputLogin"
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />

          {/* <input className='inputLogin'/> */}

          <div className="btnLogin" onClick={handleSignUp}>
            SIGNUP
          </div>

          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <div className="creatAccTxt">Already registered?</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
