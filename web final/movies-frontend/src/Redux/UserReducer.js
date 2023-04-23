import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { SERVERURL } from "../ServerUrl";
import Cookies from "universal-cookie";
import Swal from "sweetalert";
// import Swal
import axios from "axios";
import swal from "sweetalert";

// const cookies = new Cookies();
const cookies = new Cookies();

const initialStateFunction = () => ({
  usersData: [],
  currentUser:null,
  crewData:[],
  todosData:[],
  active:"dashBoard",
  nameData:null,
  moviesData:null,
});

// get users
export const getUsers = createAsyncThunk("getUsers", async () => {
  const token = cookies.get("token");
  const id = cookies.get("_id");
  try {
    const data1 = await axios.get(`${SERVERURL}/getUsers/${id}`);
    console.log("data1", data1);

    return data1?.data?.users;
  } catch (err) {
    console.log("errorCon", err);
    console.log(err);
  }
});



// Create Crew
export const createCrew = createAsyncThunk("createCrew", async ({data,crewData}) => {
  let Array=[...crewData];

 
  try {
    const data1 = await axios.post(`${SERVERURL}/add/crew`,
    data
    );
    console.log("AddCrewdata1",data1)
    Array.push(data1?.data?.crew);
    console.log("data1AddBlog",data1)
    // swal.fire(
    //   data1?.data?.success?'Successfully':'Failed',
    //   data1?.data?.message,
    //   data1?.data?.success?'success':'error'
    // )
    swal ( "Successfully" ,  data1?.data?.message ,  "success" )


    return Array;
  } catch (err) {
    console.log("errorCon", err);
    console.log(err);
  }
});


// get crews
export const getCrews = createAsyncThunk("getCrews", async () => {
  const token = cookies.get("token");
  const id = cookies.get("_id");
  try {
    const data1 = await axios.get(`${SERVERURL}/get/crews/${id}`);
    console.log("LLLLLLLLdata1", data1);

    return data1?.data?.crews;
  } catch (err) {
    console.log("errorCon", err);
    console.log(err);
  }
});

// Create todo
export const createTodo = createAsyncThunk("createTodo", async ({data,todosData}) => {
  let Array=[...todosData];

 
  try {
    const data1 = await axios.post(`${SERVERURL}/add/message`,
    data
    );
    console.log("AddCrewdata1",data1)
    Array.push(data1?.data?.newMessage1);
    console.log("data1AddBlog",data1)
    // swal.fire(
    //   data1?.data?.success?'Successfully':'Failed',
    //   data1?.data?.message,
    //   data1?.data?.success?'success':'error'
    // )
    swal ( "Successfully" ,  data1?.data?.message ,  "success" )


    return Array;
  } catch (err) {
    console.log("errorCon", err);
    console.log(err);
  }
});

// get todos
export const getTodos = createAsyncThunk("getTodos", async (id) => {
 
  try {
    const data1 = await axios.get(`${SERVERURL}/get/messages/${id}`);
    console.log("LLLLLLLLdata1", data1);

    return data1?.data?.messages;
  } catch (err) {
    console.log("errorCon", err);
    console.log(err);
  }
});

//update todo
export const updateTodo = createAsyncThunk("updateTodo", async ({data,id,todosData}) => {
  // console.log("check", detail);
  let Array=[...todosData];
  try {
    // console.log("ArrayUpdateBefore",Array);
    const data1 = await axios.put(
      `${SERVERURL}/update/message/${id}`,
      data
    );

    console.log("data1Update",data1);
    console.log("data1Update",data1?.data?.data);
    console.log("ArrayUpdate",Array);

    let index = 0;
    todosData?.map((item, i) => {
      if (item?._id === data1?.data?.data?._id) {
        index = i;
        console.log("indexResult", index);
      }
    });
    console.log("DataResDataRes",data1?.data?.data?._id);
    console.log("DataResDataRes",data1?.data?.message);

    

        Array.splice(index, 1,data1?.data?.data);
        swal ( "Successfully" ,  data1?.data?.message,  "success" )

      
    return Array;
  } catch (err) {
    console.log("NoLoginError", err?.response?.data?.message);
  }
});

//delete Todo
export const deleteTodo = createAsyncThunk("deleteTodo", async ({id,todosData}) => {
  let Array=[...todosData];
    console.log("checkId", id);
    try {
      const data = await axios.delete(
        `${SERVERURL}/delete/messages/${id}`
      );
      let index = 0;
      todosData.map((item, i) => {
        if (item._id === id) {
          index = i;
          console.log("indexResult", index);
        }
  
      });
  
    
      Array.splice(index, 1);

      console.log("DataRes", data.data);
      swal ( "Successfully" ,  data?.data?.message,  "success" )

      return Array;
    } catch (err) {
      console.log("NoLoginError", err?.response?.data?.message);
    }

});


// get todos
export const getNameBaseData = createAsyncThunk("getNameBaseData", async (data) => {
 
  try {
    const data1 = await axios.get(`${SERVERURL}/getData/${data.name}/${data.profession}/${data.page}`);
    console.log("dataActors",data1)
    return data1.data;
  } catch (err) {
    console.log("errorCon", err);
    console.log(err);
  }
});


// get todos
export const getMoviesData = createAsyncThunk("getMoviesData", async (data) => {
 
  try {
    const data1 = await axios.get(`${SERVERURL}/getMovieData/${data.type}/${data.name}/${data.page}`);
    console.log("dataActors",data1)
    return data1.data;
  } catch (err) {
    console.log("errorCon", err);
    console.log(err);
  }
});




export const CustomerReducer = createSlice({
  name: "CustomerReducer",
  initialState: initialStateFunction(),
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setSideBar(state, action) {
      state.active = action.payload;
    },
    currentUserData(state, action) {
      state.currentUser = action.payload;
    },
    resetState: (state) => initialStateFunction(),
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
    
      state.usersData = action.payload;
    },
    [getCrews.fulfilled]: (state, action) => {
    
      state.crewData = action.payload;
    },
    [createCrew.fulfilled]: (state, action) => {
    
      if(action.payload !== undefined)
      {

        state.crewData = action.payload;
      }
    },
    [getTodos.fulfilled]: (state, action) => {
    
      if(action.payload !== undefined)
      {

        state.todosData = action.payload;
      }
    },
    [createTodo.fulfilled]: (state, action) => {
    
      if(action.payload !== undefined)
      {

        state.todosData = action.payload;
      }
    },
    [updateTodo.fulfilled]: (state, action) => {
    
      if(action.payload !== undefined)
      {

        state.todosData = action.payload;
      }
    },
    [deleteTodo.fulfilled]: (state, action) => {
    
      if(action.payload !== undefined)
      {

        state.todosData = action.payload;
      }
    },
    [getNameBaseData.fulfilled]: (state, action) => {
    
      if(action.payload !== undefined)
      {

        state.nameData = action.payload;
      }
    },
    [getMoviesData.fulfilled]: (state, action) => {
    
      if(action.payload !== undefined)
      {

        state.moviesData = action.payload;
      }
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["CustomerReducer"],
};

const user = CustomerReducer.reducer;

// Action creators are generated for each case reducer function
export const { setCurrentUser,setSideBar,currentUserData } = CustomerReducer.actions;
export default persistReducer(persistConfig, user);
