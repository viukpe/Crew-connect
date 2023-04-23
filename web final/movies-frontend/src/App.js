import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import DashBoard from './Components/DashBoard/DashBoard';
import ActorSearch from './Components/ActorSearch/ActorSearch';
import MovieSearch from './Components/MovieSearch/MovieSearch';
import CrewRoom from './Components/CrewRoom/CrewRoom';
import TodoDetail from './Components/TodoDetail/TodoDetail';

// A REMINDER - Everything that says actor is actually for crew members page

function App() {
  const options = [
    { value: 1, label: "Option 1", imageSrc: "https://picsum.photos/200/300" },
    { value: 2, label: "Option 2", imageSrc: "https://picsum.photos/200/300" },
    { value: 3, label: "Option 3", imageSrc: "https://picsum.photos/200/300" }
  ];

  return (
  <>
    

    {/* <CrewRoom/> */}
    {/* <TodoDetail/> */}

<BrowserRouter >
    <Routes>
     
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        
        <Route path="/dashboard" element={ <DashBoard/>} />
        <Route path="/crewroom" element={ <CrewRoom/> } />
        <Route path="/tododetail" element={<TodoDetail/>} />
   
    

    {/* </BrowserRouter> */}
        <Route path="/actors" element={ <ActorSearch/>} />
        <Route path="/movies" element={ <MovieSearch/>  } />
        <Route path="/dashboard" element={ <DashBoard/>  } />
        <Route path="/todo/detail" element={ <TodoDetail/>  } />

      
    
   
    </Routes>

    </BrowserRouter>
  </>
  );
}

export default App;
