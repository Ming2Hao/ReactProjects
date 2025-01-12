import React from 'react'
import Navigasi from './navigasi'
import Poster from './Poster'
import './index.css'
import Informasi from './Informasi'
import ListCast from './ListCast'
import {actor,drama} from "../assets/drakor.json"
import { useState } from 'react'
import Login from './Login'
import HomeAdmin from './homeadmin'
import AddDrama from './AddDrama'
import HomeUser from './HomeUser'
import DetailDrama from './DetailDrama'




function App() {
  const [actor2,setActor2]=useState(actor);
  const [drama2,setDrama2]=useState(drama);
  const [paramDrama,setParamDrama]=useState(0);
  // const paramDrama=10;
  // const orinet=(drama[paramDrama-1].original_network).split(", ");
  const [route,setRoute]=useState("login");

  return (
    <>
      {route=="login"&&<Login paramDrama={paramDrama} setParamDrama={setParamDrama} route={route} setRoute={setRoute} drama={drama2} actor={actor2} setDrama={setDrama2} setActor={setActor2}></Login>}
      {route=="homeadmin"&&<HomeAdmin paramDrama={paramDrama} setParamDrama={setParamDrama} route={route} setRoute={setRoute} drama={drama2} actor={actor2} setDrama={setDrama2} setActor={setActor2}></HomeAdmin>}
      {route=="adddrama"&&<AddDrama paramDrama={paramDrama} setParamDrama={setParamDrama} route={route} setRoute={setRoute} drama={drama2} actor={actor2} setDrama={setDrama2} setActor={setActor2}></AddDrama>}
      {route=="homeuser"&&<HomeUser paramDrama={paramDrama} setParamDrama={setParamDrama} route={route} setRoute={setRoute} drama={drama2} actor={actor2} setDrama={setDrama2} setActor={setActor2}></HomeUser>}
      {route=="detaildrama"&&<DetailDrama paramDrama={paramDrama} setParamDrama={setParamDrama} route={route} setRoute={setRoute} drama={drama2} actor={actor2} setDrama={setDrama2} setActor={setActor2}></DetailDrama>}
    </>
  )
}

export default App
