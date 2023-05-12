import React ,{ useEffect, useState } from "react";
import { Button,Loader } from "semantic-ui-react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { storage, db } from '../firebase'
import '../components/Comments.css'
import { ToastContainer, toast } from 'react-toastify';
import { doc,collection, setDoc,updateDoc,getDoc ,addDoc,query, getDocs,deleteDoc, orderBy,serverTimestamp} from "@firebase/firestore";
import Spinner from "./Spinner";
import Delete_alert from '../components/Delete_alert';
const initialState = {
    comment:"",
  }
  
const Comments=({open1,setOpen1,id,collections,name})=>{
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const [progress, setProgress] = useState(null);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);//SET DATA
  const [comment_Update_id, setUpdate_id] = useState(null);//SET comment_update_id
  const [errors, setErrors] = useState({});
  const [user, setUser] =useState({});
  const [isSubmit, setIsSuBmit] = useState(false);
  const { comment} = data;
  const commet_collection=collections+'/'+id+'/'+id;
  const usersCollectionRef = query(collection(db, commet_collection),orderBy('timstamp','desc'));
  const [loading, setLoading] = useState(false);
  
 try{
  var temp_store=localStorage.getItem('current_user')
  var pass_val=JSON.parse(temp_store);
 }catch(e){

 }
  const close_popup=()=>{
    document.getElementById('give_rading').style.display='block'
    setOpen1(false)
}
  useEffect(() => {
    id && getSingleuser();
  }, [id]);
  const getSingleuser = async () => {
    const docRef = doc(db, commet_collection, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  }
  useEffect(()=>{
    if(!localStorage.getItem('current_user')){
       navigate('/') 
    }
})
  useEffect(() => {//THIS FUNCTION LOAD DATA FOR THIS PAGE
    
    setLoading(true);
    
  
    getUsers();
  }, []);

  var getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    if (data.empty) {//CHECK COLLECTION EMPTY ARE NOT
     document.getElementById('no_comment').style.display = 'block';
    }

    setUsers(data.docs.map((doc) => ({ //OFTER CHECKING SET THA ALL DATA.
      ...doc.data(),id:doc.id
    })),console.log(''));
  };
    
const monthNames=["January",'February','March','June','July','August','September','October','November','December'];
const get_date=new Date();
const Current_date=monthNames[get_date.getMonth()]+' '+String(get_date.getDate()).padStart(2,'0')+"-"+get_date.getFullYear();


   const handleChange = (e) => {//INPUT TO TAKE THE DATA
    setData({ ...data, [e.target.name]: e.target.value});

  };
  const time=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
  async function handleSubmit(e) {
    e.preventDefault();
    document.getElementById('comment_input').value=null;
    
   // const docRef = doc(db,commet_collection,);
if(comment_Update_id===null){
  var temp_store=localStorage.getItem('current_user')
  var pass_val=JSON.parse(temp_store);
   try{
   await addDoc(collection(db, commet_collection), {
    ...data,name:pass_val.current_user_name,commend_post_date:Current_date,timstamp: serverTimestamp(),Time:time,like:0,dislike:0,report:0

  });toast.success("Your Comment Posted...", {
    position: "top-center",
    autoClose: 100,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }); getUsers();}catch(e){
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
  };}else{
    try {
      var temp_store=localStorage.getItem('current_user')
  var pass_val=JSON.parse(temp_store);
      //*UPDATE THE DATA IN FIREBASE*//
     // alert(update_comment_id)
      await updateDoc(doc(db, commet_collection, comment_Update_id), {
        ...data,name:pass_val.current_user_name,commend_post_date:Current_date,timstamp: serverTimestamp(),Time:time,
      });
    
      toast.success("Comment Updated...", {
        position: "top-center",
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }); getUsers();
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
  
  
  //e.target.reset();
  }
  
  // const handleModal = (item) => {//ITS IS VIEW THA USER DATA
  //   setOpen(true);
  //   setUser(item);
    
  // }
  const handleDelet = async (id) => {
    if(id!==null){
      localStorage.setItem('delete_id',id);
      setOpen(true);
     }
     const get_delete_id=localStorage.getItem('delete_id');   
    <Spinner />
    if (id===null) {
      setOpen(false);
      if(localStorage.getItem(get_delete_id+'like'+pass_val.login_user_email)){
        localStorage.removeItem(get_delete_id+'like'+pass_val.login_user_email);
      }else if(localStorage.getItem(get_delete_id+'dislike'+pass_val.login_user_email)){
        localStorage.removeItem(get_delete_id+'dislike'+pass_val.login_user_email);
      }else if(localStorage.getItem(get_delete_id+'report'+pass_val.login_user_email)){
        localStorage.removeItem(get_delete_id+'report'+pass_val.login_user_email)
      }
      
      try {
        await deleteDoc(doc(db,commet_collection, get_delete_id));//DELETE THA DATA
        toast.success("Deletetd successfull", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getUsers();
        localStorage.removeItem('delete_id');
        //setUser(users.filter((user)=>user.id!==id));
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
   
  const handleUpdate=(id,comment)=>{
    //update_comment_id=id;
    setUpdate_id(id)
    document.getElementById('send').disabled=false;
    document.getElementById('comment_input').value=comment;
  }

  const handleLike=async(id,like,dislike)=>{
    if(localStorage.getItem(id+'dislike'+pass_val.login_user_email)){
      if(!localStorage.getItem(id+'like'+pass_val.login_user_email)){
        //document.getElementById('like').style.color='blue';
        //document.getElementById('dislike').style.color='grey';
        try {
          //*UPDATE THE DATA IN FIREBASE*//
         // alert(update_comment_id)
          await updateDoc(doc(db, commet_collection, id), {
           like:like+1,dislike:dislike-1
          });
          getUsers();
        localStorage.setItem(id+'like'+pass_val.login_user_email,id)
        localStorage.removeItem(id+'dislike'+pass_val.login_user_email)
        
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
            await updateDoc(doc(db, commet_collection, id), {
             like:like-1,
            });
            getUsers();
          localStorage.removeItem(id+'like'+pass_val.login_user_email)
          
             
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
      
    }else{
      if(!localStorage.getItem(id+'like'+pass_val.login_user_email)){
        //document.getElementById('like').style.color='blue';
        //document.getElementById('dislike').style.color='grey';
        try {
          //*UPDATE THE DATA IN FIREBASE*//
         // alert(update_comment_id)
          await updateDoc(doc(db, commet_collection, id), {
           like:like+1,
          });
          getUsers();
        localStorage.setItem(id+'like'+pass_val.login_user_email,id)
           
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
            await updateDoc(doc(db, commet_collection, id), {
             like:like-1,
            });
            getUsers();
          localStorage.removeItem(id+'like'+pass_val.login_user_email)
          
             
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

  }
  const handleDisLike=async(id,dislike,like)=>{
    if(localStorage.getItem(id+'like'+pass_val.login_user_email)){
      if(!localStorage.getItem(id+'dislike'+pass_val.login_user_email)){
        try {
          await updateDoc(doc(db, commet_collection, id), {
           dislike:dislike+1,like:like-1,
          });
          getUsers();
        localStorage.setItem(id+'dislike'+pass_val.login_user_email,id)
        localStorage.removeItem(id+'like'+pass_val.login_user_email)
           
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
          //document.getElementById('like').style.color='grey';
        //document.getElementById('dislike').style.color='grey';
        
          try {
            //*UPDATE THE DATA IN FIREBASE*//
           // alert(update_comment_id)
            await updateDoc(doc(db, commet_collection, id), {
             dislike:dislike-1,
            });
            getUsers();
          localStorage.removeItem(id+'dislike'+pass_val.login_user_email)
             
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
    }else{
      if(!localStorage.getItem(id+'dislike'+pass_val.login_user_email)){
        try {
          await updateDoc(doc(db, commet_collection, id), {
           dislike:dislike+1,
          });
          getUsers();
        localStorage.setItem(id+'dislike'+pass_val.login_user_email,id)
           
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
          //document.getElementById('like').style.color='grey';
        //document.getElementById('dislike').style.color='grey';
        
          try {
            //*UPDATE THE DATA IN FIREBASE*//
           // alert(update_comment_id)
            await updateDoc(doc(db, commet_collection, id), {
             dislike:dislike-1,
            });
            getUsers();
          localStorage.removeItem(id+'dislike'+pass_val.login_user_email)
             
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
    
      }
      const handelReport= async(id,report)=>{

        if(!localStorage.getItem(id+'report'+pass_val.login_user_email)){
          try {
            await updateDoc(doc(db, commet_collection, id), {
             report:report+1,
            });
            getUsers();
          localStorage.setItem(id+'report'+pass_val.login_user_email,id)
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
              await updateDoc(doc(db, commet_collection, id), {
               report:report-1,
              });
              getUsers();
            localStorage.removeItem(id+'report'+pass_val.login_user_email)
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
      const handleAutoDelete= (id)=>{
        if(localStorage.getItem(id+'like'+pass_val.login_user_email)){
          localStorage.removeItem(id+'like'+pass_val.login_user_email);
        }else if(localStorage.getItem(id+'dislike'+pass_val.login_user_email)){
          localStorage.removeItem(id+'dislike'+pass_val.login_user_email);
        }else if(localStorage.getItem(id+'report'+pass_val.login_user_email)){
          localStorage.removeItem(id+'report'+pass_val.login_user_email)
        }
        
        try {
          deleteDoc(doc(db,commet_collection, id));//DELETE THA DATA
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
    return(
        <>
       <div className="comment_popup">
        <div className="comment_box">
            <div id="comment_head">
            <h5>All Comments</h5>
            <div>
<i className="fa fa-close" id="close_comment" onClick={()=>close_popup()}></i>
            </div>
            {document.getElementById('give_rading').style.display='none'} 
                </div>            
        <div class="message">
            <h2 id="no_comment">No comment has been post yet.</h2> 
            {(!loading) ? <Spinner/>: console.log('')}

            {users.map((item) => {
                return (
<div id="all_comments">

  <div> <h3> <i className="fas fa-user-circle" id='comment_user_icon'></i><span id='comment_user_name'>{item.name} . {item.commend_post_date}<span id="comment_post_time"> at {item.Time}</span></span></h3></div><span>{((item.name==pass_val.current_user_name || (pass_val.login_user_email==='20110090@hicet.ac.in' && pass_val.login_user_passw==='26@#seeni')))? <i className="fas fa-edit " id='edit_icon_for_comment' onClick={()=> handleUpdate(item.id,item.comment)} ></i>: console.log()}
  {(item.name==pass_val.current_user_name || (pass_val.login_user_email==='20110090@hicet.ac.in' && pass_val.login_user_passw==='26@#seeni'))? <i className="fas fa-light fa-trash" id='delete_icon_for_comment' onClick={() => handleDelet(item.id)}></i>: console.log()}</span>
  
  {open && (<Delete_alert open={open} setOpen={setOpen} handleDelet={handleDelet}/>)}
  
    <h4> -{item.comment}</h4>
    <div id="lik-dis"><span>{(localStorage.getItem(item.id+'like'+pass_val.login_user_email)===item.id)?<i className="fas fa-thin fa-thumbs-up" id="like1" onClick={()=> handleLike(item.id,item.like,item.dislike)}></i>:<i className="fas fa-thin fa-thumbs-up" id="like" onClick={()=> handleLike(item.id,item.like,item.dislike)}></i>}<span id="total_likes"> {item.like}</span>{(localStorage.getItem(item.id+'dislike'+pass_val.login_user_email)===item.id) ? <i className="fas fa-thin fa-thumbs-down" id="dislike1" onClick={()=> handleDisLike(item.id,item.dislike,item.like) } ></i>:<i className="fas fa-thin fa-thumbs-down" id="dislike" onClick={()=> handleDisLike(item.id,item.dislike,item.like) } ></i>}<span id="total_dislikes"> {item.dislike}</span>{(localStorage.getItem(item.id+'report'+pass_val.login_user_email)===item.id)?<i className=" fas fa-regular fa-flag" id="report1" onClick={()=> handelReport(item.id,item.report)}></i>:<i className=" fas fa-regular fa-flag" id="report" onClick={()=> handelReport(item.id,item.report)}></i>}<span id="reports">  {'Report'} .{item.report}</span></span></div>
    {(item.report>=50)? handleAutoDelete(item.id):console.log()}
</div>
            ) })}
</div>


{isSubmit ?
         <Loader active inline='centered' size="huge"/> :(
  
    <form onSubmit={handleSubmit}>
        <div class="input-comment_container">
    <textarea id="comment_input" class="input-comment_field" name='comment' rows={2} cols={40} type="text" required placeholder="Add a comment..." onChange={handleChange} />
    <Button primary id='send' disabled={comment==''}><i class="fa fa-send-o send_icon" id="send_icon1" ></i></Button>
</div>
</form>
        )}
        
  </div>
        </div>
        
      
       
        </>
    )
}
export default Comments