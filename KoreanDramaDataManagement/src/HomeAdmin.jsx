import React from 'react'
import Navigasi from './navigasi'
import CardDrama from './CardDrama'

const HomeAdmin = (props) => {
    function addDrama(){
        props.setRoute("adddrama");
    }
  return (
    <>
        <Navigasi route={props.route} setRoute={props.setRoute}></Navigasi>
        <div className='container-fluid'>
            {console.log(props.drama)}
            <div className='pt-3'>
                <div className="row d-flex justify-content-between">
                    <div className="col">
                        <h1>Drama List</h1>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button onClick={addDrama} className='btn bg-primary'>add drama</button>
                    </div>
                </div>
                <div className="row mt-4">
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
        </div>
    </>
  )
}

export default HomeAdmin