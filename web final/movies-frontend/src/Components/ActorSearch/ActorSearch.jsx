import React, { useState } from "react";
import styles from "../DashBoard/DashBoard.module.css";
import TopNavbar from "../Navbar/TopNavbar";
import SideBar from "../SideBar/SideBar";
import Swal from "sweetalert2";
import "./ActorSearch.css";
import { ImPlus } from "react-icons/im";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useDispatch } from "react-redux";

import { getNameBaseData } from "../../Redux/UserReducer";
import styless from "../SideBar/SideBar.module.css";
import { Pagination } from "@mui/material";
import PaginationCus from "../Pagination/Pagination";
const ActorSearch = () => {
  const professionData = useSelector(
    (state) => state?.CustomerReducer?.nameData?.result
  );
  const count = useSelector((state) => state?.CustomerReducer?.nameData?.count);
  const dispatch = useDispatch();

  console.log("professionData", professionData);
  const [data, setData] = useState({
    name: " ",
    profession: "search",
  });

  const options = [
    { value: "actress", label: "actress" },
    { value: "soundtrack", label: "soundtrack" },
    { value: "music_department", label: "music_department" },
    { value: "writer", label: "writer" },
    { value: "director", label: "director" },
    { value: "actor", label: "actor" },
    { value: "producer", label: "producer" },
    { value: "stunts", label: "stunts" },
    { value: "make_up_department", label: "make_up_department" },
    { value: "miscellaneous", label: "miscellaneous" },
    { value: "camera_departmen", label: "camera_departmen" },
    { value: "assistant_director", label: "assistant_director" },
    { value: "music_artist", label: "music_artist" },
    { value: "cinematographer", label: "cinematographer" },
  ];

  const selectHandle = (e) => {
    setData({ ...data, profession: e.value });
  };

  const handleChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const searchClicked = () => {
    if (data.name !== " " || data.profession !== "search") {
      const tempDate = {
        name: data.name,
        profession: data.profession,
        page: "1",
      };
      dispatch(getNameBaseData(tempDate));
    } else {
      Swal.fire("Please Enter at least one field");
    }
  };
  console.log("data", data);
  return (
    <>
      <TopNavbar />

      {/* <div className="mainActorSearch"> */}
      <div className={styles.lowerSection}>
        {" "}
        <SideBar />
        <div className="cardSearchActor">
         
          <div className="cardSearchActorInner">
          <div className="pageInfoMoviTop">
            <div className="pageInfoMovi pageInfoMovi1" >Crew members</div>
          </div>
            <Select
              options={options}
              className="actorDropdown"
              placeholder="Select Profession"
              onChange={selectHandle}
            />

            <div className="topSearchIconMain">
              <input
                placeholder="Actor Name"
                className="inputSearch"
                onChange={handleChange}
              />
              <div className="topSearchIcon" onClick={searchClicked}>
                <BiSearch />
              </div>
              <div className="searchBtnActor" onClick={searchClicked}>
                {" "}
                Search
              </div>
            </div>
            <div className="topCardsActors">
              <div className="topLeftCardSearch">
                {professionData?.map((item) => (
                  <div className="d-flex innerMapMainCard">
                    <div className="leftCardSearch">
                      <div className="profiDetailLeft">
                        <ul className="topUlActor">
                          <li>
                            <div className="liMainActor">
                              <div className="headingProActo">Artist Name:</div>
                              <div>{item.primaryName}</div>
                            </div>
                          </li>
                          <li>
                            <div className="liMainActor">
                              <div className="headingProActo">Proffesion:</div>
                              <div>
                                <br />
                                {item.primaryProfession
                                  .split(",")
                                  .map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="liMainActor">
                              <div className="headingProActo">Birth Year:</div>
                              <div>{item.birthYear}</div>
                            </div>
                          </li>
                          <li>
                            <div className="liMainActor">
                              <div className="headingProActo">Death Year:</div>
                              <div>{item.deathYear}</div>
                            </div>
                          </li>
                        </ul>

                        {/* {professionData?.map((item) => (
                      <>
                        <div className="profileNameTxt">{item.primaryName}</div>
                        <div className="topBirthDeath">
                          <div className="profileNameTxt">
                            {item.birthYear} To
                          </div>
                          <div className="profileNameTxt">{item.deathYear}</div>
                        </div>
                      </>
                    ))} */}
                      </div>
                    </div>
                    <div className="d-flex flex-column innerMapMainCardInner">
                      {item?.movies?.map((item) => (
                        <div className="rightCardSearch">
                          <div className="rightCardSearchInner">
                            <div className="topRowActorMov">
                              <div className="topMovieDesc">
                                <div className="headingProActo">Movie Name</div>
                                <div className="headingProActo1">
                                  {item.primaryTitle}
                                </div>
                              </div>
                              <div className="topMovieDesc">
                                <div className="headingProActo">Genres</div>
                                <div className="headingProActo1">
                                  {item.genres?.split(",").map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </div>
                              </div>
                              <div className="topMovieDesc">
                                <div className="headingProActo">
                                  RunTimeMinutes
                                </div>
                                <div className="headingProActo1">
                                  {item.runtimeMinutes} min
                                </div>
                              </div>
                              <div className="topMovieDesc">
                                <div className="headingProActo">TitleType</div>
                                <div className="headingProActo1">
                                  {item.titleType}
                                </div>
                              </div>
                              <div className="topMovieDesc">
                                <div className="headingProActo">StartYear</div>
                                <div className="headingProActo1">
                                  {item.startYear}
                                </div>
                              </div>
                            </div>

                            {/* <div className="topRowActorMov">
                          <div className="headingProActo1">{"movie"}</div>
                          <div className="headingProActo1">Genres</div>
                          <div className="headingProActo1">RunTimeMinutes</div>
                          <div className="headingProActo1">TitleType</div>
                          <div className="headingProActo1">StartYear</div>
                        </div> */}
                          </div>
                        </div>
                      ))}

                      {item.movies.length === 0 && (
                        <div className="rightCardSearch">
                          <div className="rightCardSearchInner rightCardSearchInner1">
                            <div className="topRowActorMov ">
                              <div className="txtNoMovie">
                                {" "}
                                This artist has no movie.
                              </div>
                            </div>

                            {/* <div className="topRowActorMov">
                          <div className="headingProActo1">{"movie"}</div>
                          <div className="headingProActo1">Genres</div>
                          <div className="headingProActo1">RunTimeMinutes</div>
                          <div className="headingProActo1">TitleType</div>
                          <div className="headingProActo1">StartYear</div>
                        </div> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="rightCardSearch1">
                {professionData?.map((item) =>
                  item?.movies?.map((item) => (
                    <div className="rightCardSearch">
                      <div className="rightCardSearchInner">
                        <div className="topRowActorMov">
                          <div className="topMovieDesc">
                            <div className="headingProActo">Movie Name</div>
                            <div className="headingProActo1">
                              {item.primaryTitle}
                            </div>
                          </div>
                          <div className="topMovieDesc">
                            <div className="headingProActo">Genres</div>
                            <div className="headingProActo1">
                              {item.genres.split(",").map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </div>
                          </div>
                          <div className="topMovieDesc">
                            <div className="headingProActo">RunTimeMinutes</div>
                            <div className="headingProActo1">
                              {item.runtimeMinutes} min
                            </div>
                          </div>
                          <div className="topMovieDesc">
                            <div className="headingProActo">TitleType</div>
                            <div className="headingProActo1">
                              {item.titleType}
                            </div>
                          </div>
                          <div className="topMovieDesc">
                            <div className="headingProActo">StartYear</div>
                            <div className="headingProActo1">
                              {item.startYear}
                            </div>
                          </div>
                        </div>

                      
                      </div>
                    </div>
                  ))
                )}
              </div> */}
            </div>
            <PaginationCus
              count={count}
              name={data.name}
              profession={data.profession}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActorSearch;
