import React from 'react'
import {actor,drama} from "../assets/drakor.json"

function Cast({status,id}) {
  return (
    <>
        {status=="ada" && <>
            <div class="card me-5" width="150px">
                <img class="card-img-top hitam" src={actor[id-1].img} alt="Card image cap" width="150px" height="150px"/>
                <div class="card-body">
                    <p class="card-text">{actor[id-1].name}</p>
                </div>
            </div>
        </>}
        {status=="hitam" && <>
            <div class="card me-5" width="150px">
                <div className="p-0 m-0 hitam"></div>
                <div class="card-body">
                    <p class="card-text">{id}</p>
                </div>
            </div>
            
            
        </>}
        
    </>
  )
}

export default Cast