import React, { useState } from 'react';
import './forecast.css';

export default function Forecast(props) {
    const [max, setmax] = useState(0);
    const [min, setmin] = useState(0);
    const [max1, setmax1] = useState(0);
    const [min1, setmin1] = useState(0);
    const [max2, setmax2] = useState(0);
    const [min2, setmin2] = useState(0);
    const [max3, setmax3] = useState(0);
    const [min3, setmin3] = useState(0);
    
    const [sky, setsky] = useState(" ");
    const [sky1, setsky1] = useState(" ");
    const [sky2, setsky2] = useState(" ");
    const [sky3, setsky3] = useState(" ");
    
    const minmax = (list,date,check) => {
        
        let Max=0;
        let Min=100;
        list.map((item)=>{
            
            if(date==item.dt_txt.substr(8,2)){
                console.log(date+"  "+item.dt_txt.substr(8,2));
                if(item.main.temp_max>Max){
                    Max=item.main.temp_max;
                }
            }
            if(date==item.dt_txt.substr(8,2)){
                if(item.main.temp_min<Min){
                    Min=item.main.temp_min;
                }
            }
          }
        );
       
        if(check===0){
            setmax(Max)
            setmin(Min)
            setsky(list[props.time+8].weather[0].main)
        }
        else if(check===1){
            setmax1(Max)
            setmin1(Min)
            setsky1(list[props.time+16].weather[0].main)
        }
        else if(check===2){
            setmax2(Max)
            setmin2(Min)
            setsky2(list[props.time+24].weather[0].main)
        }else if(check===3){
            setmax3(Max)
            setmin3(Min)
            setsky3(list[props.time+32].weather[0].main)
        }
        
     } 
  
    
    return (
        <div className="container">

            <div className="row fore">
                <div className="col-sm-3 my-1">
                    <div className="card">
                        <div onMouseEnter={()=>minmax(props.list,((new Date()).getDate()+1).toString(),0)} className="card-body">
                            <h5 className="card-title">{sky}</h5>
                            <p className="card-text">Min : {Math.round(min)}°c</p>
                            <p className="card-text">Max : {Math.round(max)}°c</p>   
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 my-1">
                    <div className="card">
                        <div onMouseEnter={()=>minmax(props.list,((new Date()).getDate()+2).toString(),1)} className="card-body">
                            <h5 className="card-title">{sky1}</h5>
                            <p className="card-text">Min : {Math.round(min1)}°c</p>
                            <p className="card-text">Max : {Math.round(max1)}°c</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 my-1">
                    <div className="card">
                        <div onMouseEnter={()=>minmax(props.list,((new Date()).getDate()+3).toString(),2)} className="card-body">
                            <h5 className="card-title">{sky2}</h5>
                            <p className="card-text">Min : {Math.round(min2)}°c</p>
                            <p className="card-text">Max : {Math.round(max2)}°c</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 my-1">
                    <div className="card">
                        <div onMouseEnter={()=>minmax(props.list,((new Date()).getDate()+4).toString(),3)} className="card-body">
                            <h5 className="card-title">{sky3}</h5>
                            <p className="card-text">Min: {Math.round(min3)}°c</p>
                            <p className="card-text">Max: {Math.round(max3)}°c</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
