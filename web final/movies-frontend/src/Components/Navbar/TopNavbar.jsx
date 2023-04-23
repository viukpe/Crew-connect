import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { GoBell } from "react-icons/go";
import { useEffect } from "react";
import { MdEmail } from "react-icons/md";
import styles from "./TopNavbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSideBar } from "../../Redux/UserReducer";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { FaPeopleCarry } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineLocalMovies } from "react-icons/md";
import { IMAGEURL } from "../../ServerUrl";

function TopNavbar() {
  const currentUser = useSelector(
    (state) => state?.CustomerReducer?.currentUser
  );
  const cookies = new Cookies();
  const sideActive = useSelector((state) => state?.CustomerReducer?.active);
  const dispatch = useDispatch();
  let token = cookies.get("token");
  const [active, setActive] = useState(sideActive);
  const navigate=useNavigate();
  console.log("currentUser", currentUser);
  const handleActive = (click) => {
    dispatch(setSideBar(click));
    setActive(click);
    console.log(click);
  };
  useEffect(()=>{
    if(!token)
    {
      navigate('/')
    }

  },[token])
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className={styles.navMain}>
          <Container fluid className={styles.mainInner}>
            <Navbar.Brand href="#">
              <div className={styles.cliImag}>
                <img
                  src={IMAGEURL + currentUser?.image}
                  className={styles.navImg}
                  alt=""
                />
              </div>
            </Navbar.Brand>
            
            <div className={styles.blueSec}>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                className={styles.togleCss}
              >
                <div className={styles.line11}></div>
                <div className={styles.line22}></div>
                <div className={styles.line33}></div>
              </Navbar.Toggle>
              <Nav.Link href="#action1" className={styles.crewText}>
                Crew connect
              </Nav.Link>
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-${expand}`}
                  ></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={styles.canvusBody}>
                  <div className={styles.IconArea}>
                    <GoBell className={styles.bellIco} />
                    <MdEmail className={styles.bellIco} />
                  </div>
                  <div className={styles.recomdArea}>
                  <Link
                      to="/dashboard"
                      style={
                        active == "dashBoard" ? { background: "#f6dfa4",borderRadius:"5px" } : {}
                      }
                      className={styles.dashBoardIcon}
                      onClick={() => handleActive("dashBoard")}
                    >
                    <div className={styles.deshBoard}>
                      <div className={styles.dashBoardIcon}>
                        <div style={{ width: "40px" }}>
                          <div className={styles.line1}></div>
                          <div className={styles.line2}></div>
                          <div className={styles.line1}></div>
                          <div className={styles.line2}></div>
                        </div>
                      </div>
                      <div className={styles.dashHeading}>DashBoard</div>
                    </div>
                    </Link>
                    <Link
                      to="/actors"
                      style={active == "Actor" ? { background: "#f6dfa4" ,borderRadius:"5px"} : {}}
                      className={styles.movieIcon}
                      onClick={() => handleActive("Actor")}
                    >
                    <div
                      className={styles.deshBoard}
          
                    >
                      <div className={styles.movieIcon}>
                        <FaPeopleCarry className={styles.carryIconsInner} />
                      </div>
                      <div className={styles.dashHeading}>Actor Page</div>
                    </div>
                    </Link>
                    <Link
                      to="/movies"
                      style={active == "Movie" ? { background: "#f6dfa4" ,borderRadius:"5px"} : {}}
                      className={styles.movieIcon}
                      onClick={() => handleActive("Movie")}
                    >
                    <div
                      className={styles.deshBoard}
                    
                    >
                      <div className={styles.movieIcon}>
                        <MdOutlineLocalMovies
                          className={styles.carryIconsInner}
                        />
                      </div>
                      <div className={styles.dashHeading}>Movie Page</div>
                    </div>
                    </Link>
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default TopNavbar;
