import React from 'react'

function Navigasi(props) {
  function logout(){
    props.setRoute("login");
  }
  return (
    <>
        <nav class="navbar navbar-dark radagelap px-3">
            <span class="navbar-brand mb-0 h1 ps-3">Drakorku</span>
            <button className="btn btn-light" onClick={logout}>Logout</button>
        </nav>
    </>
  )
}

export default Navigasi