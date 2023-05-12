import React,{useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import '../components/Add_post_page.css'
import { storage, db } from '../firebase'
import { doc,collection, setDoc,updateDoc,getDoc ,addDoc,query, getDocs,deleteDoc, orderBy,serverTimestamp} from "@firebase/firestore";
const initialState = {
   image_Description: "",
 }
const Add_post_page =({open4,setOpen4,id,collections,name,update_id,update_img})=>{
   const [description_data, set_Description_Data] = useState(initialState);
   const {image_Description}=description_data;
    const [selectImg,setSelectImg]=useState();
    const wrapper = document.querySelector(".post_img_wrapper");
    const fileName = document.querySelector(".file-name"); 
    const cancelBtn = document.querySelector("#cancel-btn i");
    var [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const commet_collections=collections+'/'+id+'/'+id+'posts';
   
    const select_img=()=>{
      const defaultBtn = document.getElementById("default-btn");
        defaultBtn.click();
        
    }
    useEffect(() => {
      update_id && getSingleuser();
      if(update_img!==false){
        setProgress(100);
      }
    }, [update_id]);
    const getSingleuser = async () => {
      
      const docRef = doc(db, commet_collections, update_id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        set_Description_Data({ ...snapshot.data() });
      }
    }
    const imagechange=(e)=>{
//        const defaultBtn = document.getElementById("default-btn");
 //       defaultBtn.click();
 if(update_img!==false){
 document.getElementById('display-upimg').style.display='none';
 }
    setSelectImg(e);
     wrapper?.classList.add("active")    
    
    cancelBtn?.addEventListener("click", ()=>{
        setSelectImg();
        setFile(null);
        
        wrapper.classList.remove("active");
      })
      fileName.textContent = e.name;

    }
    const handleChange = (e) => {//INPUT TO TAKE THE DATA
      set_Description_Data({ ...description_data, [e.target.name]: e.target.value });
    };
    useEffect(() => { 
      if(update_img===false){
        document.getElementById('display-upimg').style.display='none';
      }

      
       file && imagechange(file);
    }, [file])

    useEffect(() => {
      const uploadFile = () => {
         //imagechange(file);
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
  /*---------------------------BROGRESS-BAR-------------------------------*/
          if (progress !== null && progress < 100) {
            toast.success('File Uploading...', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              // toast('Upload is pause!',{
              //   position: "top-center",
              //   autoClose: 5000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              //   theme: "colored",
              // })
              //console.log("upload is pause");
              break;
            case 'running':
              // toast("Upload is running!",{
              //   position: "top-center",
              //   autoClose: 5000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              //   theme: "colored",
              // });
              // //console.log("upload is running");
              break;
            default:
              break;
          }
        }, (errors) => {
          toast.error('Some network error so tryagain!!!', {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log(errors);
          
        },()=> {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {//GET IMAGE URL
          set_Description_Data((prev) => ({ ...prev, img: downloadURL }))//Upload DATA TO FIRSTORE
          
          });
        })
       
      }
      file && uploadFile();
  }, [file]);
        
const monthNames=["January",'February','March','June','July','August','September','October','November','December'];
const get_date=new Date();
const Current_date=monthNames[get_date.getMonth()]+' '+String(get_date.getDate()).padStart(2,'0')+"-"+get_date.getFullYear();
const time=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
      const handleSubmit = async () => {//SUBMIT THE ALL DATA
         if (!update_id) {
            var temp_store=localStorage.getItem('current_user')
  var pass_val=JSON.parse(temp_store);
           try {
             //ADD DADA UPLOAD TO COLLECTION FIREBASE
             /// *THIS COLLECTION IN CHANGE FOR CITYS* /////////////////////
            
             await addDoc(collection(db, commet_collections), {
               ...description_data,name:pass_val.current_user_name,commend_post_date:Current_date,timstamp: serverTimestamp(),Time:time,like:0,report:0
     
             })
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
      //     alert('yes');
     setOpen4(false)
         } else {
           try {
             //*UPDATE THE DATA IN FIREBASE*//
             await updateDoc(doc(db, commet_collections, update_id), {
               
               ...description_data,
               timstamp: serverTimestamp()
             })
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
           setOpen4(false);
          }
     
       };
     
    return(

        <div className="add_post_contianer">
            <div className="add_post_input_con">
            <div class="img_post_container">
         <div class="post_img_wrapper">
            <div class="select_image">
               {selectImg && (
               <img src={URL.createObjectURL(selectImg)} alt="" id="display-img" onClick={()=>select_img()}/>)}
                <img src={update_img} alt="" id="display-upimg" onClick={()=>select_img()}/>
                
            </div>
            <div class="insite_content" >
               <div class="file-icon">
                  <i class="fas fa-cloud-upload-alt" onClick={()=>select_img()}></i>
               </div>
               <div class="show_text_below_icon">
                  No file chosen, yet!
               </div>
            </div>
            <div id="cancel-btn">
               <i class="fas fa-times"></i>
            </div>
            <div class="file-name">
               File name here
            </div>
         </div>
         <button id="custom-btn" onClick={()=>select_img()}  >Choose a file</button>
         <input id="default-btn" type="file" onChange={(e) => setFile(e.target.files[0])} hidden/>
      </div>
      
      <div className="Verification_input-field1">
        <input type='text'  placeholder="Enter Some Description!" name="image_Description" onChange={handleChange}
                    value={image_Description} title={description_data.image_Description} required/>
        <i class="uil uil-comment-alt-lines"></i>
    </div>
    <span id="post-cancle-bttn-con"><Button positive id='upload-psat-all' onClick={()=>handleSubmit()} disabled={progress < 100}>Upload</Button><span id="post-cancle-bttn-con-space"/><Button id='cancal-post-input' primary onClick={()=>setOpen4(false)}>Cancle</Button></span>
                  </div>
          </div>

    )
}
export default Add_post_page