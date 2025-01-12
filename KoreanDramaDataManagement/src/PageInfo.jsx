import React from 'react'

const PageInfo = () => {
  return (
    <>
        <Navigasi></Navigasi>
        <div className='container'>
            <div className="row pt-4">
                <div className="col-3">
                <Poster imglink={drama[paramDrama-1].img}></Poster>
                </div>
                <div className="col ">
                    <Informasi judul={drama[paramDrama-1].name} tahunRilis={drama[paramDrama-1].year_of_release} originalNetwork={orinet} aired={drama[paramDrama-1].aired_on} episode={drama[paramDrama-1].number_of_episodes} rating={drama[paramDrama-1].rating} synopsis={drama[paramDrama-1].synopsis} genre={drama[paramDrama-1].genre} studio={drama[paramDrama-1].production_companies}></Informasi>
                </div>
            </div>
            <div className="row pt-4 d-flex flex-row">
                <h1>Cast</h1>
                <div className="col">
                    <ListCast listcast={drama[paramDrama-1].cast}></ListCast>
                </div>
            </div>
        </div>
    </>
  )
}

export default PageInfo