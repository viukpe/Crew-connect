import React, { useState } from "react";
import styles from './CrewRoom.module.css'
import TopNavbar from '../Navbar/TopNavbar'
import SideBar from '../SideBar/SideBar'
import { ImArrowRight } from 'react-icons/im';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IMAGEURL, SERVERURL } from "../../ServerUrl";
import { useNavigate } from "react-router-dom";


function MyVerticallyCenteredModal(props) {
  
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            CREATE NEW TO-DO
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body >
          <div className={styles.modalMian}>
        </div>
        </Modal.Body> */}
        <Modal.Footer className={styles.footercontent}>
          <Button  style={{backgroundColor:"black", border:"none"}}>Are you sure?</Button>
          <Button onClick={props.onHide} style={{backgroundColor:"black", border:"none", marginLeft:"10px"}}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  


const CrewRoom = () => {

  const location = useLocation();
  const data1 = location?.state;
  const navigate=useNavigate();

  console.log("recevieddata",data1?._id)

    const [modalShow, setModalShow] = React.useState(false);


const userClicked=(item)=>{
  let crewId=data1?._id
  navigate('/tododetail',{
    state:{item,crewId}
   
  })

}
  return (
    <>
    <TopNavbar />
    <div className={styles.lowerSection}>
      <div className={styles.navbarDiv}> <SideBar /></div>
      <div className={styles.projectsArea}>
        
        <div className={styles.titleOuter}>
        <div className={styles.titleArea}>{data1?.name}</div>
        <button className={styles.creatButton} onClick={() => setModalShow(true)}>+ To-Do's </button>
        <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
        </div>
        <div className={styles.cardsOuter}>
            <div className={styles.cardsInner}>
            {data1?.members?.map((item) => (
            // <Link to="/tododetail">   
             <div className={styles.card} onClick={()=>userClicked(item)}>
                    <div className={styles.cardinn}>
                    <img src={IMAGEURL+item?.value?.image} alt="" className={styles.cardIMAGE} />
                    <div className={styles.cardDetail}>{item.label}</div>
                    </div>
                    <div className={styles.gotoIconAREA}><ImArrowRight className={styles.arrowri}/></div>
                </div>
                // </Link>
                   ))}
            </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default CrewRoom
