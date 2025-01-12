import React from 'react'
import { Outlet } from "react-router-dom";
import { Form, useFetcher, useLoaderData, useSubmit,useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react'
import { func } from 'joi';

const Home = () => {
    // console.log(localStorage.getItem("currentUser"));
    const navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem("currentUser")==null||localStorage.getItem("currentUser")==""){
          throw new Response('',{ status: 403 })
      }
    })
    function logout(){
        localStorage.removeItem("currentUser");
        navigate("/");
    }
    function reload(){
        navigate(0);
    }
  return (
    <div>
      <div className='border d-flex justify-content-between'>
        <h3>Welcome {localStorage.getItem("currentUser")}</h3>

        <h1>Besties</h1>
        <div>
          <button className='h-100 me-3'onClick={reload}>Reload (belom jalan)</button>
          <button onClick={logout} className='h-100 me-3'>Logout</button>
        </div>
      </div>
        <Outlet></Outlet>
    </div>
    
  )
}

export default Home