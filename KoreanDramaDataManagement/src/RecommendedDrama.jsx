import React from 'react'
import CardDrama from './CardDrama'

const RecommendedDrama = (props) => {

    var dramaid=[]
    
  return (
    <>
        {
            // console.log(props.drama[props.paramDrama-1].cast)
        }
        {
            props.drama[props.paramDrama-1].cast.map((item2,index2)=>{
                // item2.map((item3,index3)=>{
                    props.drama.map((item4,index4)=>{
                        item4.cast.map((item5,index5)=>{
                            if(item2==item5){
                                dramaid.filter((x)=>x===item4.id).length==0 && dramaid.push(item4.id)
                            }
                        })
                    })
                // })
            })
        }
        {
            dramaid.map((item,index)=>{
                console.log("param drama",props.paramDrama)
                console.log(item)
                if(item==props.paramDrama){
                    dramaid.splice(index,1)
                }
            })
        }
        {
            dramaid.map((item,index)=>{
                return(
                    <div className="col-3">
                        <CardDrama paramDrama={props.paramDrama} setParamDrama={props.setParamDrama} drama={props.drama[item-1]} route={props.route} setRoute={props.setRoute}></CardDrama>
                    </div>
                )
            })
        }
        {/* <div>RecommendedDrama</div> */}
    </>
  )
}

export default RecommendedDrama