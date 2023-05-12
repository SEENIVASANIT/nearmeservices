import React,{useState ,useEffect} from "react";
import '../pages/Professions_post.css';
import Add_post_page from "../components/Add_post_page";
import { Button, Card, Grid, Container, Image, Checkbox, Loader, Item } from 'semantic-ui-react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { collection, onSnapshot, query, getDocs, doc, deleteDoc,updateDoc, orderBy, serverTimestamp } from "firebase/firestore"
import Loader1 from "../components/Loader1"
import { toast, ToastContainer } from "react-toastify"
import Delete_alert from '../components/Delete_alert'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner";
import { db } from '../firebase';
import Comments from "../components/Comments"
import FileDownload from 'js-file-download'
const Professions_post =({setOpen3,id,collections,name})=>{
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open, setOpen] = useState(false);
    const [update_id_pass, setUpdate_id_pass] = useState({});
    const [update_img_pass, setUpdate_img_pass] = useState({});
    const [posts_comment, setpost_comment] = useState({});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const post_collection=collections+'/'+id+'/'+id+'posts';
  const usersCollectionRef = query(collection(db, post_collection), orderBy('timstamp','desc'));
  const [loading, setLoading] = useState(false);
  document.getElementById('give_rading').style.display='none';
  const navigate = useNavigate();
  if(!localStorage.getItem('current_user')){
    navigate('/')

}
try{
  var temp_store=localStorage.getItem('current_user')
  var pass_val=JSON.parse(temp_store);
 }catch(e){

 }

useEffect(() => {//THIS FUNCTION LOAD DATA FOR THIS PAGE
setLoading(true);
getUsers();
}, []);
const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    if (data.empty) {//CHECK COLLECTION EMPTY ARE NOT
      document.getElementById('nopost-has-add-message').style.display='block';
    }
  
    setUsers(data.docs.map((doc) => ({//OFTER CHECKING SET THA ALL DATA.
      ...doc.data(), id: doc.id
  
    })));
  };

// if (!loading) { //LOADE DATA PROGRESS
// return <Loader1/> //THIS DESIGN IS OTHER PAGE JUST CALL HEAR
// }
const handleDelet = async (id) => {
    if(id!==null){
      localStorage.setItem('delete_id',id);
      setOpen(true);
     }
     const get_delete_id=localStorage.getItem('delete_id');   
    
    <Loader1 />
    if (id===null){
      setOpen(false);
      try {
        
        await deleteDoc(doc(db, post_collection,get_delete_id));//DELETE THA DATA
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
       // window.location.reload();
getUsers();
        //setUser(users.filter((user)=>user.id==id));
      } catch (err) {
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
const update_post=(id,img)=>{
    setUpdate_id_pass(id);
    setUpdate_img_pass(img);
    setOpen5(true);
}
const handleLikes=async(id,like)=>{
  if(localStorage.getItem(id+'heart'+pass_val.login_user_email)){
    
      try {
        
        await updateDoc(doc(db, post_collection, id), {
         like:like-1
        });
        getUsers();
      
      localStorage.removeItem(id+'heart'+pass_val.login_user_email);
      
      } catch (error) {
        toast.error('Some network error so tryagain!!!', {
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
      }else{
      
        try {
          await updateDoc(doc(db, post_collection, id), {
           like:like+1
          });
          getUsers();
        localStorage.setItem(id+'heart'+pass_val.login_user_email,id)
        
           
        } catch (error) {
          toast.error('Some network error so tryagain!!!', {
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
const handelReport= async(id,report)=>{

  if(!localStorage.getItem(id+'post_report'+pass_val.login_user_email)){
    try {
      await updateDoc(doc(db, post_collection, id), {
       report:report+1,
      });
      getUsers();
    localStorage.setItem(id+'post_report'+pass_val.login_user_email,id)
    toast.success('Add the report..', {
      position: "top-center",
      autoClose: 50,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    } catch (error) {
      toast.error('Some network error so tryagain!!!', {
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
    }else{
      try {
        await updateDoc(doc(db, post_collection, id), {
         report:report-1,
        });
        getUsers();
      localStorage.removeItem(id+'post_report'+pass_val.login_user_email)
      toast.success('Remove the report...', {
        position: "top-center",
        autoClose: 50,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      } catch (error) {
        toast.error('Some network error so tryagain!!!', {
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
const handleAutoDelete_post= (id)=>{
  if(localStorage.getItem(id+'heart'+pass_val.login_user_email)){
    localStorage.removeItem(id+'heart'+pass_val.login_user_email);
  }else if(localStorage.getItem(id+'post_report'+pass_val.login_user_email)){
    localStorage.removeItem(id+'post_report'+pass_val.login_user_email)
  }
  
  try {
    deleteDoc(doc(db,post_collection, id));//DELETE THA DATA
    //setUser(users.filter((user)=>user.id!==id));
    getUsers();
  } catch (err) {
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
const download_post_image=(img)=>{
  const date=new Date();
  FileDownload(img,date.getDate()+date.getTime()+'find_need.jpg');
}
const post_comments=(id)=>{
  setpost_comment(id)
  setOpen6(true)
}
    return(
        <>
        <div className="comment_popup">
         <div className="comment_box1">
             
             <div>
               
 <i className="fa fa-close" id="close_comment1" onClick={()=>setOpen3(false)}></i>
             
                 </div>    
                 
                 {open5 && <Add_post_page open4={open5} setOpen4={setOpen5} id={id} collections={collections} name={name} update_id={update_id_pass} update_img={update_img_pass}/>}  

         <div class="message1">
          <h1 id="nopost-has-add-message" style={{color:"red",textAlign:"center",fontFamily:"monospace",fontWeight:"900",display:"none"}}>No posts has been added, yet!</h1>
         {users.map((item) => {
            return (  
 <div className='all_comments1'>
<div id='edit-delete-poster_info'>
{(!loading) ? <Spinner/>: console.log('')}
 <div className="post_uploader_info"> <h3> <i className="fas fa-user-circle" id='comment_user_icon1'></i><span id='comment_user_name'>{item.name} . {item.commend_post_date}<span id="comment_post_time"> at {item.Time}</span></span></h3></div><span></span>
 {(localStorage.getItem("Access_id"+pass_val.login_user_email))?<i className="fas fa-edit" id="post-edit" onClick={()=>update_post(item.id,item.img)}></i>:console.log()}{(localStorage.getItem('Access_id'+pass_val.login_user_email))?<i className="fas fa-light fa-trash" id="post-delete" onClick={() => handleDelet(item.id)}></i>:console.log()}
 {open && (<Delete_alert open={open} setOpen={setOpen} handleDelet={handleDelet} />)}

    </div>
   
    <a href={item.img} target='_blank'><img src={item.img} id='post_image'></img></a>
   
    <div className="like-dislike-commet-report">
    {(localStorage.getItem(item.id+'heart'+pass_val.login_user_email)===item.id)?<i className="fas fa-regular fa-heart" id="heart1" onClick={()=> handleLikes(item.id,item.like)}></i>:<i className="fas fa-regular fa-heart" id="heart" onClick={()=> handleLikes(item.id,item.like)}></i>}<span id="post_like_count"> {'Likes:'+item.like}</span><i className="fas fa-comment-dots" id="post_comment" onClick={()=> post_comments(item.id)}></i><splan id='post_comment_count'> {'Comments'}</splan>{(localStorage.getItem(item.id+'post_report'+pass_val.login_user_email)===item.id)?<i className=" fas fa-regular fa-flag" id="post_reports1" onClick={()=> handelReport(item.id,item.report)}></i>:<i className=" fas fa-regular fa-flag" id="post_reports" onClick={()=> handelReport(item.id,item.report)}></i>}<span id="post_report_count">Report.{item.report}</span>
    {(item.report>=50)? handleAutoDelete_post(item.id):console.log()}
    {open6 && (<Comments open1={open6} setOpen1={setOpen6} id={posts_comment} collections={post_collection} name={pass_val.current_user_name} />)}
 </div>
 <div className="post_des">
<h4>{item.image_Description}</h4>
 </div>
 </div>
  )
})}
 </div>
       
  
 {(localStorage.getItem("Access_id"+pass_val.login_user_email))?<Button primary id='add_post' onClick={()=>setOpen4(true)}>Add post</Button>:console.log()}
 {open4 && (<Add_post_page open4={open4} setOpen4={setOpen4} id={id} collections={collections} name={name} update_id={false} update_img={false}/>)}   
 </div>
   </div>
         </>
    )
}
export default Professions_post;