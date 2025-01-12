import React from 'react'
import Navigasi from './navigasi'
import CardDrama from './CardDrama'

const HomeUser = (props) => {
  return (
    <>
        {/* {console.log(props.drama)} */}
        <Navigasi route={props.route} setRoute={props.setRoute}></Navigasi>
        <div className='container-fluid'>
            <h1>Drama List</h1>
            <div className="row">
                {
                    // console.log(props.drama)
                    props.drama.map((item,index)=>{
                        return(
                            <div className='col-3'>
                                <CardDrama paramDrama={props.paramDrama} setParamDrama={props.setParamDrama} drama={item} route={props.route} setRoute={props.setRoute}></CardDrama>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default HomeUser