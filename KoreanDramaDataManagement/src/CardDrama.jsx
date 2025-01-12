import React from 'react'

function CardDrama(props) {
  function klik(){
    console.log(props.route)
    if(props.route=="homeuser"){
        props.setRoute("detaildrama");
        props.setParamDrama(props.drama.id);
    }
  }
  return (
    <div  className="border mx-3 my-3" onClick={klik}>
        <div className="row">
            <img src={props.drama.img} alt="" width="250px" height="250px"/>
        </div>
        <div className="d-flex justify-content-between row px-2 pt-2">
          <div className="col-10">
            <h5>{props.drama.name}</h5>
          </div>
          <div className="col-2">
            <h5>{props.drama.rating}⭐</h5>
          </div>
        </div>
        <div className="row px-2 pt-2">
            <h5>{props.drama.year_of_release}</h5>
        </div>
    </div>
  )
}

export default CardDrama