import React,{ useEffect, useState } from "react";
import '../components/Area_about_box.css'
import { db } from '../firebase'
import { collection, onSnapshot, query, getDocs, doc, deleteDoc, orderBy } from "firebase/firestore"
import Spinner from "../components/Spinner"
const Area_about_box =({setOpen_about,get_about_area,area_image,get_area_name_english,get_area_name_tamil,get_area_location} )=>{
  const area_about_CollectionRef = collection(db, get_about_area);
  const [area_about_loading, setArea_about_Loading] = useState(false);
  const [area_info, setArea_info] = useState([]);//SET DATA
  useEffect(() => {//THIS FUNCTION LOAD DATA FOR THIS PAGE
    setArea_about_Loading(true);
    var getAbout_area = async () => {
      const about_area_data = await getDocs(area_about_CollectionRef);
      
      setArea_info(about_area_data.docs.map((doc) => ({//OFTER CHECKING SET THA ALL DATA.
        ...doc.data(), id: doc.id

      })));
    };
    getAbout_area();
  }, []);
  
    return(
<>
<div className="area_about">
<div className="area_align_cen">
<div class="area_about_card">
   <div class="area_about_card_image">
    <img src={area_image} />
    <i className="fa fa-close" id="colse_about" onClick={()=> setOpen_about(false) }></i>
   </div>
   <h2 title={get_area_name_tamil}>{get_area_name_tamil}</h2>
   <div class="area_info_box">
    <h4>other details.</h4>
    {(!area_about_loading) ? <Spinner/>: console.log('')}
    {area_info?.map((info) => {
            return (
    <div class="other_deat">
      <div class="area_deat">
        <h3>Block Name : </h3>
        <h5 title={get_area_name_english}> {get_area_name_english}</h5>
      </div>
      <div class="area_deat">
        <h3>District : </h3>
        <h5 title={info.District}> {info.District}</h5>
      </div>
      <div class="area_deat">
        <h3>State : </h3>
        <h5 title={info.State}> {info.State}</h5>
      </div>
      <div class="area_deat">
        <h3>Area Address : </h3>
        <h5 title={info.Area_Address}> {info.Area_Address}</h5>
      </div>
      <div class="area_deat">
        <h3>Telephone/Std Code : </h3>
        <h5 title={info.Telephone_Std_Code}> {info.Telephone_Std_Code}</h5>
      </div>
      <div class="area_deat">
        <h3>Assembly MLA : </h3>
        <h5 title={info.Assembly_MLA}> {info.Assembly_MLA}</h5>
      </div>
      <div class="area_deat">
        <h3>Parliament MP : </h3>
        <h5 title={info.Parliament_MP}> {info.Parliament_MP}</h5>
      </div>
      <div class="area_deat">
        <h3>Post Office Name : </h3>
        <h5 title={info.Post_Office_Name}> {info.Post_Office_Name}</h5>
      </div>
      <div class="area_deat">
        <h3>Pin Code : </h3>
        <h5 title={info.Pin_Code}> {info.Pin_Code}</h5>
      </div>
      <div class="area_deat">
        <h3>Area Location : </h3>
        <a href="#" id='about_area_location'><h5 title={get_area_location}> {get_area_location}</h5></a>
      </div>
    </div>
            )})}
   </div>
        </div>
</div>
</div>
</>

    )
}
export default Area_about_box