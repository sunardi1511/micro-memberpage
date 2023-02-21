import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route,} from "react-router-dom"
import { useDispatch } from "react-redux";



import GuestRoute from "./components/Routes/GuestRoute";
import MembarRoute from "./components/Routes/MemberRoute";

import NotFound from "./pages/404";
import UnAutenticated from "./pages/401";

import Login from "./pages/Login";
import Register from "./pages/Register";

import MyClass from "./pages/MyClass";
import Joined from "./pages/Joined";
import DetailsClass from "./pages/DetailsClass";

import { setAuthorizationHeader } from "../src/configs/axios";
import users from "../src/constants/api/users";


import { populateProfile } from "../src/store/actions/users";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    let session = null
    if (localStorage.getItem("BWAMICRO:token")) {
      session =JSON.parse(localStorage.getItem("BWAMICRO:token"))
      setAuthorizationHeader(session.token)

      users.details().then(details => {
        dispatch(populateProfile(details.data))
      })
    }
  }, [dispatch])
  
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/login" element={<GuestRoute><Login/></GuestRoute>}/>
        <Route path="/register" element={<GuestRoute><Register/></GuestRoute>}/>
        <Route path="/private" element={<GuestRoute> <UnAutenticated/></GuestRoute>}/>

        
        <Route  path="/" element={<MembarRoute path="/"><MyClass/></MembarRoute>}/>
        <Route  path="/joined/:class" element={<MembarRoute><Joined/></MembarRoute>}/>
        <Route  path="/courses/:class" element={<MembarRoute><DetailsClass/></MembarRoute>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
