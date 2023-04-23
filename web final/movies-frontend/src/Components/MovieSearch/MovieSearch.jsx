import React, { useEffect, useState } from "react";
import styles from "../DashBoard/DashBoard.module.css";
import TopNavbar from "../Navbar/TopNavbar";
import SideBar from "../SideBar/SideBar";
import Table from "react-bootstrap/Table";
import { getMoviesData } from "../../Redux/UserReducer";
import Select from "react-select";
import Cookies from "universal-cookie";

import "./MovieSearch.css";
import { ImPlus } from "react-icons/im";
import Swal from 'sweetalert2'

import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MoviePagination from "./MoviePagination";
import { useNavigate } from "react-router-dom";
const MovieSearch = () => {
  const cookies = new Cookies();
  const movieData = useSelector((state) => state?.CustomerReducer?.moviesData?.result);
  const count = useSelector((state) => state?.CustomerReducer?.moviesData?.count);

  console.log("movieData", movieData);
 
  let token = cookies.get("token");

  const navigate=useNavigate();
  const[genre,setGenre]=useState(" ");
  const dispatch = useDispatch();
  const [search, setSearch] = useState(" ");

  console.log("search", search);
  const options = [
    { value: "Animation", label: "Animation" },
    { value: "Documentary", label: "Documentary" },
    { value: "Short", label: "Short" },
    { value: "Comedy", label: "Comedy" },
    { value: "Romance", label: "Romance" },
    { value: "Sport", label: "Sport" },
    { value: "Comedy", label: "Comedy" },
    { value: "News", label: "News" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Horror", label: "Horror" },
    { value: "Adult", label: "Adult" },
    { value: "Family", label: "Family" },
    { value: "Crime", label: "Crime" },
    { value: "History", label: "History" },
    { value: "War", label: "War" },
    { value: "Music", label: "Music" },
    { value: "Musical", label: "Musical" },
    { value: "Adventure", label: "Adventure" },
    { value: "Action", label: "Action" },

  ];


  const searchClicked =async () => {
    if(search === " " && genre=== " ") 
    {
      Swal.fire('Please enter something to Search')


    }else{
      const data = {
        type: genre,
        page: "1",
        name:search
      };
     const response=await dispatch(getMoviesData(data));
    }
    
  };
  const selectHandle = (e) => {
    setGenre(e.value)
  };

  useEffect(()=>{
    if(!token)
    {
      navigate('/')
    }

  },[token])
  console.log("genre",genre)
  return (
    <>
      <TopNavbar />

      <div className={styles.lowerSection}>
        <SideBar />

        <div className="cardSearchActor">
          <div className="pageInfoMoviTop">

     
          </div>
            <div className="cardSearchActorInner">
            <div className="pageInfoMoviTop">
            <div className="pageInfoMovi pageInfoMovi1" >Movies</div>
          </div>
            <Select
              options={options}
              className="actorDropdown"
              placeholder="Select Genre"
              onChange={selectHandle}
            />
              <div className="topSearchIconMain">
                <input
                  placeholder="Movie Name"
                  className="inputSearch"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="topSearchIcon" onClick={searchClicked}>
                  <BiSearch />
                </div>
                <div className="searchBtnActor" onClick={searchClicked}>
                {" "}
                Search
              </div>
              </div>
              {movieData?.map((item) => (
              <div className="topCardsActors">
                <div className="leftCardSearch">
                  <div className="profiDetailLeft">
                    <ul className="topUlActor">
                      <li>
                        <div className="liMainActor">
                          <div className="headingProActo">Movie Name:</div>
                          <div className="headingProActo1">
                                  {item.primaryTitle}
                                </div>
                        </div>
                      </li>
                      <li>
                        <div className="liMainActor">
                          <div className="headingProActo">Genres:</div>
                          <br />
                          {/* <br /> */}
                          <div className="headingProActo1">
                                  {item.genres?.split(",").map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </div>
                          <div>
                            <br />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="liMainActor">
                          <div className="headingProActo">RuntimeMinutes:</div>
                          <div className="headingProActo1">
                                  {item.runtimeMinutes}
                                </div>
                           
                        </div>
                      </li>
                      <li>
                        <div className="liMainActor">
                          <div className="headingProActo">TitleType:</div>
                          <div className="headingProActo1">
                                  {item.titleType}
                                </div>
                        </div>
                      </li>
                      <li>
                        <div className="liMainActor">
                          <div className="headingProActo">StartYear:</div>
                          <div className="headingProActo1">
                                  {item.startYear}
                                </div>
                        </div>
                      </li>
                      <li>
                        <div className="liMainActor">
                          <div className="headingProActo">EndYear:</div>
                          <div className="headingProActo1">
                                  {item.endYear}
                                </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rightCardSearch">
                  <div className="rightCardSearchInner">
             

                <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>

                          <th>Title</th>
                          <th>Region</th>
                          <th>Language</th>
                          <th>Types</th>
                          <th>Attributes</th>
                        </tr>
                      </thead>
                      {item?.akas?.map((item1,i)=>(
                      <tbody>
                        <tr>
                          <td>{i+1}</td>

                          <td>{item1.title}</td>
                          <td>{item1.region}</td>
                          <td>{item1.language}</td>
                          <td>{item1.types}</td>
                          <td>{item1.attributes}</td>
                        
                        </tr>

                      
                      </tbody>
                       ))}
                    </Table>
               
                
                 { item?.ratings?.map((rating)=>(
                    <div className="mainRating">
                    <div className="ratingTitle">Ratings</div>
                    <div className="topRowsRating">
                      <div className="topRatingRow">
                        <div className="averageTxt">Average Rating:</div>
                        <div>{rating.averageRating}</div>
                      </div>
                      <div className="topRatingRow">
                        <div className="averageTxt">No of Votes:</div>
                        <div>{rating.numVotes}</div>
                      </div>
                    </div>
                  </div>

                 ))  
               }
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* <h1>hi paginations</h1> */}

         
            <MoviePagination
            
            count={count}
            type={genre}
            name={search}
            />
        </div>
      </div>
    </>
  );
};

export default MovieSearch;
