import { useState } from "react"
import { useForm } from "react-hook-form";
import ActorCard from "./ActorCard";
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import Navigasi from "./navigasi";
const AddDrama = (props) => {
    const [pemain,setPemain]=useState([]);
  //validasi pakai function bawaan dari react hook form 
  
  
  function back(){
    props.setRoute("homeadmin")
  }
  const schema = Joi.object({
    name: Joi.string().required().min(5).messages({
        "string.empty":"Nama harus diisi!",
        "string.min":"Nama minimal 5 karakter"
        
    }),
    year: Joi.number().required().min(2005).max(new Date().getFullYear()).messages({
        "number.min": "Tahun minimal {#limit}",
        "number.max": "Tahun maksimal {#limit}",
    }),
    on: Joi.string().required().messages({
        "string.empty":"Original Network harus diisi!"
    }),
    aired: Joi.array().min(1).messages({
        "array.min":"Aired On harus diisi!"
    }),
    episodes: Joi.number().required().messages({
        "number.empty":"Jumlah episode harus diisi!"
    }),
    rating: Joi.number().required().min(1).max(5).messages({
        "number.empty":"Rating harus diisi!",
        "number.min": "Rating minimal {#limit}",
        "number.max": "Rating maksimal {#limit}",
    }),
    genre: Joi.string().required().messages({
        "string.empty":"Genre harus diisi!"
    }),
    synopsis: Joi.optional().messages({
        // "string.empty":"Synopsis harus diisi!"
    }),
    comp: Joi.string().required().messages({
        "string.empty":"Production Companies harus diisi!"
    }),
    image: Joi.string().required().messages({
        "string.empty":"Poster Image URL harus diisi!"
    }),
    addcast: Joi.optional().messages({
        // "string.empty":"Additional Cast harus diisi!"
    }),
  })
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });
  const addDrama = data => {
    // console.log(data.aired)
    // console.log(pemain);
    // console.log(data)
    const kode = props.drama[props.drama.length-1].id + 1
    var tempCast = data.addcast.split(",")
    tempCast = tempCast.concat(pemain)
    const newData = {
      id: kode,
      name: data.name,
      year_of_release: data.year,
      original_network: data.on,
      aired_on: data.aired,
      number_of_episodes: data.episodes,
      rating: data.rating,
      synopsis: data.synopsis,
      genre: data.genre.split(","),
      cast: tempCast,
      production_companies: data.comp,
      img : data.image,
    }
    props.setDrama([...props.drama,newData])
    props.setRoute("homeadmin")
    reset() //untuk reset form kembali seperti semula
  };



  return (
    <>  
        <Navigasi route={props.route} setRoute={props.setRoute}></Navigasi>
        <div className="container-fluid px-3">
            <div className="d-flex justify-content-between my-3">
                <h1>Tambah Drama</h1>
                <button className="btn btn-danger" onClick={back}>BACK</button>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(addDrama)}>
                        <div className="form-group">

                            <label>Drama Name </label>
                            <br />
                            {errors.name && <span style={{color:"red"}}>{errors.name.message} <br /></span>}
                            <input type="text" className="form-control" {...register("name")}/> <br /> 

                            <label>Year Of Release </label>
                            <br />
                            {errors.year && <span style={{color:"red"}}>{errors.year.message} <br /></span>}
                            <input type="text" className="form-control" {...register("year")}/> <br /> 

                            <label>Original Network </label>
                            <br />
                            {errors.on && <span style={{color:"red"}}>{errors.on.message} <br /></span>}
                            <input type="text" className="form-control" {...register("on")}/> <br /> 

                            <label>Aired On </label> <br />
                            <input type="checkbox" name="aired" value="sunday" {...register("aired")} />Sunday <br />
                            <input type="checkbox" name="aired" value="monday" {...register("aired")} />Monday <br />
                            <input type="checkbox" name="aired" value="tuesday" {...register("aired")} />Tuesday <br />
                            <input type="checkbox" name="aired" value="wednesday" {...register("aired")} />Wednesday <br />
                            <input type="checkbox" name="aired" value="thursday" {...register("aired")} />Thursday <br />
                            <input type="checkbox" name="aired" value="friday" {...register("aired")} />Friday <br />
                            <input type="checkbox" name="aired" value="saturday" {...register("aired")} />Saturday <br />

                            {errors.aired && <span style={{color:"red"}}>{errors.aired.message} <br /></span>}

                            <label>Number of episodes </label>
                            <br />
                            {errors.episodes && <span style={{color:"red"}}>{errors.episodes.message} <br /></span>}
                            <input type="text" className="form-control" {...register("episodes")}/> <br /> 

                            <label>Rating </label>
                            <br />
                            {errors.rating && <span style={{color:"red"}}>{errors.rating.message} <br /></span>}
                            <input type="text" className="form-control" {...register("rating")}/> <br /> 

                            <label>Synopsis </label>
                            <br />
                            {errors.synopsis && <span style={{color:"red"}}>{errors.synopsis.message} <br /></span>}
                            <input type="text" className="form-control" {...register("synopsis")}/> <br /> 

                            <label>Genre </label>
                            <br />
                            {errors.genre && <span style={{color:"red"}}>{errors.genre.message} <br /></span>}
                            <input type="text" className="form-control" {...register("genre")}/> <br /> 

                            <label>Production Companies </label>
                            <br />
                            {errors.comp && <span style={{color:"red"}}>{errors.comp.message} <br /></span>}
                            <input type="text" className="form-control" {...register("comp")}/> <br /> 

                            <label>Poster Image URL </label>
                            <br />
                            {errors.image && <span style={{color:"red"}}>{errors.image.message} <br /></span>}
                            <input type="text" className="form-control" {...register("image")}/> <br /> 

                            <label>Additional Cast </label>
                            <br />
                            {errors.addcast && <span style={{color:"red"}}>{errors.addcast.message} <br /></span>}
                            <input type="text" className="form-control" {...register("addcast")}/> <br /> 

                            <button type="submit"className="btn btn-light">Add Drama</button>
                        </div>
                    </form>
                </div>
                <div className="col">
                    <div className="row">

                    {
                        props.actor.map((item,index)=>{
                            return(
                                <div className='col-3'>
                                    <ActorCard actor={item} drama={props.drama} pemain={pemain} setPemain={setPemain}></ActorCard>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            
        </div>
      
    </>
    
  )
}

export default AddDrama