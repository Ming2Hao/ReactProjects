import React from 'react'
import Navigasi from './navigasi'
import Poster from './Poster'
import Informasi from './Informasi'
import ListCast from './ListCast'
import RecommendedDrama from './RecommendedDrama'

const DetailDrama = (props) => {
  // const [recommended,setRecommended]=useState([]);
  function back(){
    props.setRoute("homeuser");
    props.setParamDrama(0);
  }
  return (
    <>
    {console.log(props.drama[props.paramDrama-1].id)}
    <Navigasi route={props.route} setRoute={props.setRoute}></Navigasi>
    <div className='container-fluid px-4'>
      <div className="row mt-3">
        <div className="col">
          <button className='btn btn-light w-auto' onClick={back}>Back</button>
        </div>
      </div>
      <div className="row pt-4">
        <div className="col-3">
          <Poster imglink={props.drama[props.paramDrama-1].img}></Poster>
        </div>
        <div className="col ">
            <Informasi judul={props.drama[props.paramDrama-1].name} tahunRilis={props.drama[props.paramDrama-1].year_of_release} aired={props.drama[props.paramDrama-1].aired_on} originalNetwork={props.drama[props.paramDrama-1].original_network} episode={props.drama[props.paramDrama-1].number_of_episodes} rating={props.drama[props.paramDrama-1].rating} synopsis={props.drama[props.paramDrama-1].synopsis} genre={props.drama[props.paramDrama-1].genre} studio={props.drama[props.paramDrama-1].production_companies}></Informasi>
        </div>
      </div>
      <div className="row pt-4 d-flex flex-row">
        <h1>Cast</h1>
        <div className="col">
            <ListCast listcast={props.drama[props.paramDrama-1].cast}></ListCast>
        </div>
      </div>
      <div className="row pt-4 d-flex flex-row">
        <h1>Recommended Drama</h1>
          <RecommendedDrama paramDrama={props.paramDrama} setParamDrama={props.setParamDrama} route={props.route} setRoute={props.setRoute} drama={props.drama} actor={props.actor} setDrama={props.setDrama} setActor={props.setActor}></RecommendedDrama>
      </div>
    </div>
    </>
  )
}

export default DetailDrama