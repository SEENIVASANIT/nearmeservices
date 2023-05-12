import React,{useState } from "react";
import { Modal,Header,Image,Button } from "semantic-ui-react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import '../pages/Star_rading.css';

import img1 from '../asset/All_workers.jpeg'
const Star_rading =({open,setOpen, img,name,handleUpdate_star})=>{
    
    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);
  
    const handleText =()=> {
      switch (number || hoverStar) {
        case 0:
          return "Evaluate";
        case 1:
          return "Dissatifation";
        case 2:
          return "Unsatisfied";
        case 3:
          return "Normal";
        case 4:
          return "Satisfied";
        case 5:
          return "Very Satisfied";
        default:
          return "Evaluate";
      }
    };
   
    return(
 
   <div className="star_popup">
        <div className="star_content">
          <div className="img_contain">
            <img
              style={{ width: 150, height: 100 ,boxShadow: '5px 7px  10px black'}}
              src={img}
              alt="name"
            />
            <i className="fa fa-close" onClick={()=>setOpen(false)}></i>
          </div>
          <h1 id='satar_name'>{name}</h1>
          <div>
            <h1>{handleText()}</h1>
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar id="hole_stars"
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar id="hole_stars"
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                )
              )}
          </div>
          <button id='star_sub' className={` ${!number && "disabled"} `} onClick={()=>handleUpdate_star(number)}>Submit</button>
         
        </div>
      </div>
  

    )
}
export default Star_rading