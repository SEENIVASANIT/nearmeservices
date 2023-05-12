import React,{useState ,useEffect} from "react";
import { Button} from 'semantic-ui-react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase'
import { collection, onSnapshot, query, getDocs, doc, deleteDoc,updateDoc,serverTimestamp, orderBy } from "firebase/firestore"
import { ToastContainer, toast } from 'react-toastify';
import { async } from "@firebase/util";
const Access_id_initialState = {
    Access_id:"",
  }
const Verification_id =()=>{
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);//SET DATA
    const [users2, setUsers2] = useState([]);//SET DATA_FOR_LOGIN
    const [Access_id_data, setAccess_id_data] = useState(Access_id_initialState);
    const {Access_id}=Access_id_data;
    const usersCollectionRef = collection(db, 'All_Verification_id');
    const update_user_login_data_true = collection(db, 'login_user');
    useEffect(() => {//THIS FUNCTION LOAD DATA FOR THIS PAGE
        
        var getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
    
          setUsers(data.docs.map((doc) => ({//OFTER CHECKING SET THA ALL DATA.
            ...doc.data(), id: doc.id
          })));
        };
        var getUsers2 = async () => {
          const data2 = await getDocs(update_user_login_data_true);
    
          setUsers2(data2.docs.map((doc) => ({//OFTER CHECKING SET THA ALL DATA.
            ...doc.data(), id: doc.id
          })));
        };
        getUsers();
        getUsers2();
      }, []);
    
    const handleChange_Access_id=(i)=>{
        setAccess_id_data({ ...Access_id_data, [i.target.name]: i.target.value});

    }
   const Check_Access_Id=async()=>{
    var count=0;
   await users?.map(async (item) => {
        if(item.Access_id===Access_id){
            //localStorage.setItem(`Access_id`,item.Access_id);
            const getemail=item.email;

            await users2?.map(async (items)=>{
              
              if(items.user_email===getemail){
                const updatedocid=items.id;
                
                try {
                  //*UPDATE THE DATA IN FIREBASE*//
                  await updateDoc(doc(db, "login_user", updatedocid), {
                    Have_id:Access_id,
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
              }
              
            })
            
            toast.success('Now your account Activate!!!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            navigate('/');
            count++;
            
        }       
    });
    if(count===0){
        document.getElementById('below_input_message').innerHTML='Invalid Access Id 🙄';
        document.getElementById('below_input_message').style.color='red';
        
    }
   }
    return(

        <div className="delete_contianer">
        <div className="delete_content">
        <div className="Verification_input-field">
        <input type='text'  placeholder="Enter Your Access Id" name="Access_id" required onChange={handleChange_Access_id}/>
        <i class="uil uil-keyhole-square-full"></i>
    </div>
    <h1 id="below_input_message">Past Your Access Id!</h1>
         <span><Button positive className="delete_cancle" disabled={Access_id==''} onClick={()=> Check_Access_Id()}>Submit</Button><Button primary className="delete_cancle" onClick={()=>navigate('/')} >Cancle</Button></span>
            </div>
            <ToastContainer />
  </div>

    )
}
export default Verification_id;