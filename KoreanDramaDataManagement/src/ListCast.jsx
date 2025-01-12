import React from 'react'
import Cast from './cast'

function ListCast({listcast}) {
  return (
    <>
    <div className="d-flex flex-row">    
        {
            
            listcast.map((cast) => {
                return (
                    <>
                        {!isNaN(+cast)==true && <Cast status="ada" id={cast}>gambar</Cast>}
                        {!isNaN(+cast)==false && <Cast status="hitam" id={cast}>gambar</Cast>}
                    </>
                )
            })
        }
    </div>
    </>
  )
}

export default ListCast