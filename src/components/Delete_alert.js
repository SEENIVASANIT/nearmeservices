import React,{useState } from "react";
import '../components/Delete_alert.css'
const Delete_alert =({open,setOpen,handleDelet})=>{

   const close_delete_popup=()=>{
    setOpen(false)
    localStorage.removeItem('delete_id');
   }
    return(

        <div className="delete_contianer">
            
        <div className="delete_content">
            <i className="fas fa-exclamation-triangle"></i>
            <h1>Are you sure?</h1>
            <h3>Do you want delete these record?This<br/>process cannot be undone.</h3>
         <span><button className="delete_cancle" onClick={()=>close_delete_popup()}>Cancle</button><span id="midle_space"/><button id='delete_confom' onClick={()=> handleDelet(null)}>Delete</button></span>
            </div>
  </div>

    )
}
export default Delete_alert