import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import styles from "./DashBoard.module.css";
import TopNavbar from "../Navbar/TopNavbar";
import SideBar from "../SideBar/SideBar";
import { ImPlus } from "react-icons/im";
import { ImArrowUp } from "react-icons/im";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getUsers } from "../../Redux/UserReducer";
import { useSelector } from "react-redux";

import { createCrew } from "../../Redux/UserReducer";
import { getCrews } from "../../Redux/UserReducer";
import { useDispatch } from "react-redux";
import { IMAGEURL, SERVERURL } from "../../ServerUrl";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


let data = [
  {
    title: "TOP GUN : MAVERICK",
  },
  {
    title: "Black Panther 2",
  },
  {
    title: "Avengers : EndGame",
  },
];

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.CustomerReducer?.usersData);
  const crewData = useSelector((state) => state?.CustomerReducer?.crewData);
  const currentUser = useSelector((state) => state?.CustomerReducer?.currentUser);
  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  console.log("userData", userData);
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
  ];

  // options for test

  const[message,setMessage]=useState();
  const [convertedOptions,setConvrted]=useState([])
  useEffect(()=>{
   let temp= userData?.map((item) => ({
    label: (
      <div>
        {item?.name}
        <img
          style={{
            borderRadius: "50%",
            marginLeft: "10px",
            objectFit: "contain",
          }}
          width="50px"
          height="50px"
          src={IMAGEURL + item?.image}
        />{" "}
      </div>
    ), // Use the 'name' property as the label
    value: item, // Use the '_id' property as the value
  }));
  setConvrted(temp)
  },[])
  
  const handleSle = (e) => {
    console.log(e,"eee");
    let sel = e?.map((item) => ({
      label: item?.value?.name,
      value: item?.value, // Use the '_id' property as the value
    }));
    if (sel?.length == 0) {
      setSelected([]);
    } else {
      console.log("in else");
      setSelected(sel);
    }
  };
  console.log("convertedOptions", convertedOptions);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const createClicked=()=>{

    const tempData={
      label:currentUser?.name,
      value:currentUser
    }
    let newSelected=selected.push(tempData)
    console.log("newSelected",tempData,selected,newSelected)
    const data={
      name:message,
      members:selected
    }

    dispatch(createCrew({data,crewData}))
    setShow(false)


  }

  console.log("currentUser", currentUser);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
   
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter" >
          CREATE CREW
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalMian}>
          <input type="text" className={styles.nameInput} placeholder="name" 
          
          onChange={(e)=>setMessage(e.target.value)}
          />
          {/* <pre>{JSON.stringify(selected)}</pre> */}
          <MultiSelect
            options={convertedOptions}
            value={selected}
            onChange={(e) => {
              handleSle(e);
            }}
            labelledBy="Select"
            className={styles.multiSlect}
         

          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ backgroundColor: "black", border: "none" }}
        onClick={createClicked}
        
        >
          Create
        </Button>
        {/* <Button
          onClick={props.onHide}
          style={{ backgroundColor: "black", border: "none" }}
        >
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

const DashBoard = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const crewsData=useSelector((state)=>state?.CustomerReducer?.crewData)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  console.log("dassssssssssssssss",crewsData)

  useEffect(()=>{
    dispatch(getCrews())

  },[])

  const crewClicked=(item)=>{

    navigate('/crewroom',
    {
      state:item
    }
    )

  }

  return (
    <>
      <TopNavbar />


      <div className={styles.lowerSection}>
        <div className={styles.navbarDiv}>
          {" "}
          <SideBar />
        </div>
        <div className={styles.projectsArea}>
        <div className="pageInfoMovi">Dashboard</div>
          <div className={styles.newCrew}>
            <div className={styles.crewCard} onClick={() => setModalShow(true)}>
              <div className={styles.ardHeading}>CREATE NEW CREW</div>
              <div className={styles.iconplus}>
                <ImPlus className={styles.plusIcon} />
              </div>
            </div>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div className={styles.recentsArea}>
            <div className={styles.recentsHead}>RECENT PROJECTS</div>
            <div className={styles.recentsCards}>
              {crewsData?.map((item) => (
            //  <Link to="/crewroom">  
              <div className={styles.recentCard} onClick={()=>crewClicked(item)}>
                  <div className={styles.ardHeading}>{item.name}</div>
                  <div className={styles.iconplus}>
                    <ImArrowUp className={styles.plusIcon1} />
                  </div>
                </div>
                // </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
