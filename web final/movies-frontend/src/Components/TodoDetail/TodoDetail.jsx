import React, { useEffect, useState } from "react";
import styles from "./TodoDetail.module.css";
import TopNavbar from "../Navbar/TopNavbar";
import SideBar from "../SideBar/SideBar";
import { FaSearch } from "react-icons/fa";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

import { ImArrowRight } from "react-icons/im";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../../Redux/UserReducer";
import { updateTodo } from "../../Redux/UserReducer";
import { useLocation } from "react-router-dom";
import { createTodo, getTodos } from "../../Redux/UserReducer";
let data1 = [
  {
    textofff:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptate possimus ut porro blanditiis perspiciatis dolore, quae sequi. Blanditiis laudantium adipisci totam cupiditate consequuntur. Nulla assumenda iure provident fugiat consectetur!",
  },
  {
    textofff: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    textofff: "Lorem, ipsum ",
  },
  {
    textofff: "Lorem, ipsum ",
  },
];

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [message, setMessage] = useState();
  const todosData = useSelector((state) => state?.CustomerReducer?.todosData);

  console.log("locationmessage", location);
  const createTodoClicked = () => {
    const data = {
      message: message,
      crewId: location?.state?.crewId,
      userId: location?.state?.item?.value?._id,
    };
    dispatch(createTodo({ data, todosData }));
  };

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
      <Modal.Body>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className={styles.textTodo}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </Modal.Body>
      <Modal.Footer className={styles.footercontent}>
        {/* <Button onClick={props.onHide} style={{ backgroundColor: "black", border: "none", marginLeft: "10px" }}>Cancel</Button> */}
        <Button
          style={{
            backgroundColor: "black",
            border: "none",
            marginLeft: "10px",
          }}
          onClick={createTodoClicked}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const TodoDetail = () => {
  const location = useLocation();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [editData, setEditData] = useState();
  const todosData = useSelector((state) => state?.CustomerReducer?.todosData);
  const dispatch = useDispatch();
  //   const data1 = location.crewId;
  console.log("mgmtodosData", todosData);

  let userId = location?.state?.item?.value?._id;
  const cookies = new Cookies();
  const currentId = cookies.get("_id");
  const filteredArray = todosData.filter((obj) => obj.userId === userId);

  console.log("filteredArray", filteredArray);

  useEffect(() => {
    let id = location.state?.crewId;
    dispatch(getTodos(id));
  }, []);

  const editClicked = (item) => {
    setModalShow1(true);
    setEditData(item);
  };

  const deleteClicked = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let id = item?._id;
        dispatch(deleteTodo({ id, todosData }));
      }
    });
  };

  return (
    <>
      <TopNavbar />
      <div className={styles.lowerSection}>
        <div className={styles.navbarDiv}>
          {" "}
          <SideBar />
        </div>
        <div className={styles.projectsArea}>
          {/* <div className={styles.inputArea}>
            <input type="text" className={styles.topInput} />
            <div className={styles.iconBack}><FaSearch className={styles.searchIcon}/></div>
        </div> */}
          <div className={styles.titleOuter}>
            <div className={styles.titleArea}>
              {location?.state?.item?.label} Todo's List
            </div>
            {currentId === location?.state?.item?.value?._id && (
              <button
                className={styles.creatButton}
                onClick={() => setModalShow(true)}
              >
                + To-Do's{" "}
              </button>
            )}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div className={currentId === location?.state?.item?.value?._id ?styles.cardsOuterNew:styles.cardsOuter}>
            <div className={styles.cardsInner}>
              <MyVerticallyCenteredModalEdit
                show={modalShow1}
                editData={editData}
                onHide={() => setModalShow1(false)}
              />
              {filteredArray.length===0&&<div style={{color:"red"}}>There is no Todo yet!</div>}
              {filteredArray?.map((item) => (
                <div className={styles.card}>
                  <div className={styles.iconsArea}>
                    {currentId === location?.state?.item?.value?._id && (
                      <>
                        <FiEdit3
                          onClick={() => editClicked(item)}
                          className={styles.editIcon}
                          style={{ cursor: "pointer" }}
                        />

                        <MdDeleteForever
                          style={{ marginLeft: "8px", cursor: "pointer" }}
                          className={styles.editIcon}
                          onClick={() => deleteClicked(item)}
                        />
                      </>
                    )}
                  </div>
                  <div className={styles.textOff}>{item.message}</div>
                  <div className={styles.time}>12:45 PM</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function MyVerticallyCenteredModalEdit(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("editData", props.editData);
  const todosData = useSelector((state) => state?.CustomerReducer?.todosData);
  const [message, setMessage] = useState();

  console.log("locationmessage", props?.editData?.message);
  const createTodoClicked = () => {
    let id = props?.editData?._id;
    const data = {
      message: message,
      crewId: location?.state?.crewId,
      userId: location?.state?.item?.value?._id,
    };
    dispatch(updateTodo({ data, id, todosData }));
  };

  useEffect(() => {
    setMessage(props?.editData?.message);
  }, [props?.editData?.message]);

  console.log("message", message);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Your Todo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          name=""
          id=""
          cols="30"
          value={message}
          rows="10"
          className={styles.textTodo}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </Modal.Body>
      <Modal.Footer className={styles.footercontent}>
        {/* <Button onClick={props.onHide} style={{ backgroundColor: "black", border: "none", marginLeft: "10px" }}>Cancel</Button> */}
        <Button
          style={{
            backgroundColor: "black",
            border: "none",
            marginLeft: "10px",
          }}
          onClick={createTodoClicked}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TodoDetail;
