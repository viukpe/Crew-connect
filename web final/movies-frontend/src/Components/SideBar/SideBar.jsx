import React, { useState } from "react";
import styles from "./SideBar.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaPeopleCarry } from "react-icons/fa";
import Cookies from "universal-cookie";
import { MdOutlineLocalMovies } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSideBar } from "../../Redux/UserReducer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SideBar = () => {

  const cookies = new Cookies();
  const sideActive=useSelector((state)=>state?.CustomerReducer?.active)
const navigate=useNavigate();
  const dispatch=useDispatch();

  const [active, setActive] = useState(sideActive);

  const handleActive = (click) => {
    dispatch(setSideBar(click))
    setActive(click);
    console.log(click);
  };

  const logoutClicked=()=>{
    cookies.remove('token', { path: '/' })
    cookies.remove('_id', { path: '/' })
navigate('/')

  }

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className={styles.sideMian}>
          <Container fluid className={styles.barInner}>
            {/* <Navbar.Brand href="#"></Navbar.Brand> */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              className={styles.offCan}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {/* Offcanvas */}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className={styles.bodyOffCan}>
                <Nav className="justify-content-center flex-grow-1 ">
                  {/* <Nav.Link href="#action1">Home</Nav.Link> */}
                  <div className={styles.topLogSid}>
                    <div className={styles.iconsArea}>

                    <Link
                      to="/dashboard"
                      style={
                        active == "dashBoard" ? { background: "#f6dfa4" } : {}
                      }
                      className={styles.dashBoardIcon}
                      onClick={() => handleActive("dashBoard")}
                    >
                      <div>
                        <div className={styles.line1}></div>
                        <div className={styles.line2}></div>
                        <div className={styles.line1}></div>
                        <div className={styles.line2}></div>
                      </div>
                    </Link>
                    <Link
                      to="/actors"
                      style={active == "Actor" ? { background: "#f6dfa4" } : {}}
                      className={styles.movieIcon}
                      onClick={() => handleActive("Actor")}
                    >
                      <FaPeopleCarry className={styles.carryIconsInner} />
                    </Link>
                    <Link
                      to="/movies"
                      style={active == "Movie" ? { background: "#f6dfa4" } : {}}
                      className={styles.movieIcon}
                      onClick={() => handleActive("Movie")}
                    >
                      <MdOutlineLocalMovies
                        className={styles.carryIconsInner}
                      />
                    </Link>
                    </div>
                    <AiOutlineLogout
                        className={styles.carryIconsInnerLog}
                        onClick={logoutClicked}
                      />
                    

                  </div>
                  
                </Nav>
                
              </Offcanvas.Body>
              
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default SideBar;
