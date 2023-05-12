import React, { useEffect, useState } from "react"
import { db } from '../firebase'
import { collection, onSnapshot, query, getDocs, doc, deleteDoc, orderBy } from "firebase/firestore"
import Spinner from "../components/Spinner"
import { Link, useParams, useLocation, useNavigate, Await } from 'react-router-dom'
import '../components/Registration_show.css'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Delete_alert from "./Delete_alert";
const Add_data_for_reg = {
  w_name:'',
  w_Gender:'',
  w_email: '',
  w_phone: '',
  Professions:'',
  w_dob:'',
  w_address: '',
  w_location: '',
  Instagram:'',
  Facebook:'',
  Twitter:'',
  img:'',
}
const Registration_show=({setOpen1,call_dataset_fun,get_set_id})=>{
    const [users, setUsers] = useState([]);//SET DATA
    const [data, setData] = useState(Add_data_for_reg);
    const [open, setOpen] = useState(false);
    const usersCollectionRef = query(collection(db, 'New_registration'),orderBy('timstamp'));
  const [loading, setLoading] = useState(false);
  var [search, setSearch] = useState('');
  const navigate = useNavigate();
    useEffect(() => {//THIS FUNCTION LOAD DATA FOR THIS PAGE
        setLoading(true);        
        getUsers();        
      }, []);
      var getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        if (data.empty) {//CHECK COLLECTION EMPTY ARE NOT
      document.getElementById('no_reg_data').style.display='block';
        }
  
        setUsers(data.docs.map((doc) => ({ //OFTER CHECKING SET THA ALL DATA.
          ...doc.data(),id:doc.id
        })),console.log(''));
      };
      
      const handleDelet = async (id) => {
        //const store=id;
       // id=id ?? store;//defuld parameter
       if(id!==null){
        localStorage.setItem('delete_id',id);
        setOpen(true);
       }
       const get_delete_id=localStorage.getItem('delete_id');   
        <Spinner />
        if (id===null) {
          setOpen(false);
          try {
            await deleteDoc(doc(db, 'New_registration', get_delete_id));//DELETE THA DATA
            toast.success("Deletetd successfull", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            localStorage.removeItem('delete_id');
            getUsers();
            //window.location.reload();
            //setUser(users.filter((user)=>user.id!==id));
          } catch (err){
            toast.error("SOMTHING RONG TRY AGAIIN!!!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        }
      }
    
      const Search_fun = async (e, searc) => {///THIS IS A SEARCH VALUE FUNCTION
        var search1 = searc;
        e.preventDefault();
        setUsers(users.filter((bolg) => bolg.w_name.toLowerCase()?.includes(search1.toLowerCase()) || bolg.w_adderss?.toLowerCase().includes(search1.toLowerCase())));
        //if(search1.includes(use))
        //document.querySelector("section").scrollTop = 500;//CALL THA FUN PAGE SCROLLTOP
        //document.getElementById('area_page_heading').innerHTML = `The final result of the search. "${search1}"`;
        //document.getElementById('area_page_heading').style.color = 'green';
        //UASE REMOVE THA VALUE FOR SEARCH_INPUT
    
        if (search1 == '') {
          Handle_restore();
         // document.getElementById('area_page_heading').innerHTML = 'Find your nearby areas!';
          //document.getElementById('area_page_heading').style.color = 'black';
        } else {
          document.getElementById('i1').style.display = 'inline-flex';
        }
    
      }
    
      const Handle_restore = async () => {//USER CLICK CLOSE BUTTON THEN RETURN NARNAL STATE
        //document.querySelector("section").scrollTop = 500;//CALL THA FUN PAGE SCROLLTOP
    const usersCollectionRef = query(collection(db, 'New_registration'),orderBy('timstamp'));
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        document.getElementById('search_input').value = '';
        document.getElementById('i1').style.display = 'none';
        //document.getElementById('area_page_heading').innerHTML = 'Find your nearby areas!';
        //document.getElementById('area_page_heading').style.color= 'black';
        setSearch('');
      }
   const handelesetData=(item)=>{
    call_dataset_fun(true)
    get_set_id(item)
    setOpen1(false)
   }
    return(
        <>
        
        <div className="all_Registration_contianer">
            
        <div className="reg_content">
            <div className="all_reg_content" >
                <div id="reg_heading">
                    <h2>All Registration Form</h2>
                <i className="fas fa-times" onClick={()=> setOpen1(false)}></i>
                </div>
<form onSubmit={(e) => { Search_fun(e) }} >
            <input type="text" id='search_input'  className="searchTerm2" placeholder="Search..." onChange={(e) => {
              Search_fun(e, e.target.value)
            }}/>
            <button type="submit" className="searchButton">
              <i className="fa fa-search"></i>
            </button>
            <i id="i1" className="fas fa-times" onClick={() => Handle_restore()}></i>
          </form>
          {(!loading) ? <Spinner/>: console.log('')}
          <h1 id="no_reg_data">So far no one has register!!!</h1>
<div className="all_form">
{users.map((item) => {
    return (
<div class="card123">
    <div class="ds-top">
    <i className="fas fa-user-plus" id='add_work_form' onClick={()=> handelesetData(item.id)}></i>
<i className="fas fa-light fa-trash" id='delet_form' onClick={() => handleDelet(item.id)}></i>
{open && (<Delete_alert open={open} setOpen={setOpen} handleDelet={handleDelet}/>)}
    
    </div>
    
    <div class="avatar-holder">
      <img src={item.img} alt="Applicator profile"/>
    </div>
    <div class="name1">
      <h3> {item.w_name.toLocaleUpperCase()}</h3>
      <div id="reg_info">
      <div className="other_info">
    <h3>Apply Date : </h3>
    <h5> {item.apply_data}</h5>
</div>
<div className="other_info">
    <h3>Genter : </h3>
    <h5> {item.w_Gender.toUpperCase()}</h5>
</div>
<div className="other_info">
    <h3>Email Address : </h3>
    <h5> {item.w_email}</h5>
</div>
<div className="other_info">
    <h3>Phone Number : </h3>
    <h5> {item.w_phone}</h5>
</div>
<div className="other_info">
    <h3>City Name : </h3>
    <h5> {item.City_name.toUpperCase()}</h5>
</div>
<div className="other_info">
    <h3>District Name : </h3>
    <h5> {item.District_name.toUpperCase()}</h5>
</div>
<div className="other_info">
    <h3>Area Name : </h3>
    <h5> {item.Area_name.toUpperCase()}</h5>
</div>
<div className="other_info">
    <h3>Profession : </h3>
    <h5> {item.Professions.toUpperCase()}</h5>
</div>
<div className="other_info">
    <h3>Experience : </h3>
    <h5> {item.w_experience}</h5>
</div>
<div className="other_info">
    <h3>Bate Of Bearth : </h3>
    <h5> {item.w_dob}</h5>
</div>
<div className="other_info">
    <h3>Address : </h3>
    <h5> {item.w_address.toUpperCase()}</h5>
</div>
<div className="other_info">
    <h3>Location : </h3>
    <h5> {item.w_location}</h5>
</div>
<div className="other_info">
    <h3>Instagram : </h3>
    <h5> {item.Instagram}</h5>
</div>
<div className="other_info">
    <h3>Facebook : </h3>
    <h5> {item.Facebook}</h5>
</div>
<div className="other_info">
    <h3>Twitter : </h3>
    <h5> {item.Twitter}</h5>
</div>

      </div>
    </div>
      
    </div>
      
      ) })}
</div>
            </div>
            </div>
            </div>
        </>
    )
}
export default Registration_show