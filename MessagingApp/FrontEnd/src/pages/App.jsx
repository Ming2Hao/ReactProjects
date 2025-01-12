import { useState,useEffect } from 'react'
import { Outlet } from "react-router-dom";
import { Form, useFetcher, useLoaderData, useSubmit,useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("currentUser")!=null&&localStorage.getItem("currentUser")!=""){
      navigate("/home");
    }
  },[]);
  function login(){
    navigate("/");
  }
  function register(){
    navigate("/register");
  }
  return (
    <>
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
      <Outlet></Outlet>
    </>
  )
}

export default App
