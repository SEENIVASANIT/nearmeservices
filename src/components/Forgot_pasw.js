import React,{useState } from "react";
import { Button,Loader } from "semantic-ui-react";
import '../components/Forgot_pasw.css'

import { ToastContainer, toast } from 'react-toastify';
const forgot_initialState = {
    forgot_email:"",
  }
const Forgot_pasw =({setOpen_forgot})=>{
    const [forgot_data, setForgot_data] = useState(forgot_initialState);
    const { forgot_email} = forgot_data;


    const handleChange_forgot = (i) => {//INPUT TO TAKE THE DATA
        setForgot_data({ ...forgot_data, [i.target.name]: i.target.value});
      };
      const handleSubmit_forgot=(e)=> {//SUBMIT THE ALL DATA
        if(localStorage.getItem(forgot_email)){
            var store_pasw=localStorage.getItem(forgot_email)
            var pass_vall=JSON.parse(store_pasw);
            document.getElementById('replace_passw').innerHTML=pass_vall.user_passw;
            //document.getElementById('login_pasw').value=pass_vall.user_passw;
            

            //alert(pass_val.user_passw)
    
        }else{
            toast.error(`Sorry this mail no registration!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              document.getElementById('replace_passw').innerHTML='';
        }
      }
    return(
<>
<div id="forgot_con">

<div id="forgot_align_cen">
<div class="forgot_container">
      <h1 id="forgot_heading">Enter your login mail id</h1>
      <form>
      <div class="forgot_input-field">
        <input type='email'  placeholder="Enter your email" name="forgot_email" required onChange={handleChange_forgot}/>
        <i class="uil uil-envelope"></i>
    </div>
    </form>
    <h3 id="see_pasw">See your password here <i className="fa fa-hand-o-down" style={{color:'blue'}}></i></h3>
    <div id="show_pasw">
<h3 id="replace_passw"></h3>
    </div>
    <div id="capy_can_butt">
    <span ><Button type="submit" positive disabled={forgot_email=='' } onClick={()=>handleSubmit_forgot()}>Sumbit</Button><span id="butt_space"></span><Button primary onClick={()=> setOpen_forgot(false)}>Cancle</Button></span>
    </div>
    </div>

</div>
<ToastContainer />
</div>
        </>
    )
}
export default Forgot_pasw