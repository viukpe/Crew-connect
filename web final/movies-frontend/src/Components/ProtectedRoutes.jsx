import React, { useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
// import { Routes } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import CrewRoom from "./CrewRoom/CrewRoom";
import Cookies from "universal-cookie";
import TodoDetail from "./TodoDetail/TodoDetail";
import ActorSearch from "./ActorSearch/ActorSearch";
import MovieSearch from "./MovieSearch/MovieSearch";
const cookies = new Cookies();

const ProtectedRoute = ({ path }) => {

 let token = cookies.get("token");

 console.log("token",token)

  useEffect(()=>{
     token = cookies.get("token");

  },[token])

  return (
    <Routes>
      <Route
        path={path}
        element={token ? <DashBoard /> : <Navigate to="/" replace />}
      />
      <Route
        path={path}
        element={token ? <CrewRoom /> : <Navigate to="/" replace />}
      />
      <Route
        path={path}
        element={token ? <TodoDetail /> : <Navigate to="/" replace />}
      />
      <Route
        path={path}
        element={token ? <ActorSearch /> : <Navigate to="/" replace />}
      />
      <Route
        path={path}
        element={token ? <MovieSearch /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default ProtectedRoute;
