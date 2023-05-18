import React, { useEffect, useState } from "react";
import { Button, Loader } from "semantic-ui-react";
import "../components/login_reg_form.css";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Forgot_pasw from "./Forgot_pasw";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
  limitToLast,
} from "firebase/firestore";
const initialState = {
  user_name: "",
  user_email: "",
  user_passw: "",
  user_conform_passw: "",
};
var login_initialState = {
  login_user_passw: "",
  login_user_email: "",
};
var count = 1;

const Login_reg_form = ({ setOpen }) => {
  const [Open_forgot, setOpen_forgot] = useState(false);
  const [users, setUsers] = useState([]); //SET DATA
  const [data, setData] = useState(initialState);
  const { user_name, user_email, user_passw, user_conform_passw } = data;
  var [login_data, setLoginData] = useState(login_initialState);
  var { login_user_passw, login_user_email } = login_data;
  const [isSubmit, setIsSuBmit] = useState(false);
  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "login_user");
  useEffect(() => {
    var getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          //OFTER CHECKING SET THA ALL DATA.
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  const handleChange = (e) => {
    //INPUT TO TAKE THE DATA
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChange_login = (e) => {
    //INPUT TO TAKE THE DATA
    setLoginData({ ...login_data, [e.target.name]: e.target.value });
  };

  const handleChange_login2 = () => {
    //INPUT TO TAKE THE DATA
    setLoginData({ ...login_data });
  };

  const handleSubmit = async (e) => {
    //SUBMIT THE ALL DATA
    e.preventDefault();
    var check_sigunup = users.map(async (item) => {
      if (
        item.user_email == document.getElementById("user_input_email").value
      ) {
        toast.error(`Already register this mail id`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        try {
          //ADD DADA UPLOAD TO COLLECTION FIREBASE
          /// *THIS COLLECTION IN CHANGE FOR CITYS* /////////////////////

          await addDoc(collection(db, "login_user"), {
            ...data,
            Have_id: false,
            timstamp: serverTimestamp(),
          });
        } catch (error) {
          toast.error("Some network error so tryagain!!!", {
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
        const user_info = { ...data };
        localStorage.setItem(user_email, JSON.stringify(user_info));
        const container = document.querySelector(".login_container");
        container.classList.remove("active");
        document.getElementById("user_input").value = "";
        document.getElementById("user_input_email").value = "";
        document.getElementById("user_input_passw").value = "";
        document.getElementById("conform_pas").value = "";
      }
    });
    if (check_sigunup) {
      await toast.success(`Successfully register`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleLogin = async () => {
    //SUBMIT THE ALL DATA
    var counts = 0;
    const check_login = users.map((item) => {
      if (
        item.user_email === login_user_email &&
        item.user_passw === login_user_passw
      ) {
        const Remember = { ...login_data };
        if (document.getElementById("logCheck").checked) {
          localStorage.setItem("remember", JSON.stringify(Remember));
        } else {
          try {
            localStorage.removeItem("remember");
          } catch (e) {}
        }
        if (item.Have_id != false) {
          localStorage.setItem("Access_id", item.Have_id);
        }

        var temp_store = localStorage.getItem(login_user_email);
        var pass_val = JSON.parse(temp_store);
        toast.success(`Welcome ${item.user_name}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        const current_user_name = item.user_name;
        const current_user = { ...login_data, current_user_name };
        localStorage.setItem("current_user", JSON.stringify(current_user));
        if (
          login_user_email === "20110090@hicet.ac.in" &&
          login_user_passw === "26@#seeni"
        ) {
          navigate("/admin_all_city");
        } else {
          //localStorage.setItem('current_user',current_user)
          navigate("/all_city");
        }

        counts = 1;
      } else {
      }
    });
    if (check_login) {
      toast.error(`invalied username or passwored!`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const call_design = () => {
    const container = document.querySelector(".login_container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      cpwShowHide = document.querySelectorAll(".cshowHidePw"),
      pwFields = document.querySelectorAll(".password"),
      cpwFields = document.querySelectorAll(".cpassword"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link"),
      forgot = document.querySelector(".forgot-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach((eyeIcon) => {
      eyeIcon.addEventListener("click", () => {
        pwFields.forEach((pwField) => {
          if (pwField.type === "password") {
            pwField.type = "text";

            pwShowHide.forEach((icon) => {
              icon.classList.replace("uil-eye-slash", "uil-eye");
            });
          } else {
            pwField.type = "password";

            pwShowHide.forEach((icon) => {
              icon.classList.replace("uil-eye", "uil-eye-slash");
            });
          }
        });
      });
    });
    cpwShowHide.forEach((eyeIcon) => {
      eyeIcon.addEventListener("click", () => {
        cpwFields.forEach((pwField) => {
          if (pwField.type === "password") {
            pwField.type = "text";
            cpwShowHide.forEach((icon) => {
              icon.classList.replace("uil-eye-slash", "uil-eye");
            });
          } else {
            pwField.type = "password";

            cpwShowHide.forEach((icon) => {
              icon.classList.replace("uil-eye", "uil-eye-slash");
            });
          }
        });
      });
    });

    // js code to appear signup and login form
    signUp.addEventListener("click", () => {
      container.classList.add("active");
    });
    login.addEventListener("click", () => {
      container.classList.remove("active");
    });
    forgot.addEventListener("click", () => {
      setOpen_forgot(true);
    });
  };

  const check_or_not = () => {
    if (localStorage.getItem("remember")) {
      var store_remember = localStorage.getItem("remember");
      var pass_val = JSON.parse(store_remember);
      var temp_obj = {
        login_user_email: (document.getElementById("login_email").value =
          pass_val.login_user_email),
        login_user_passw: (document.getElementById("login_pasw").value =
          pass_val.login_user_passw),
      };
      login_initialState = temp_obj;
      handleChange_login2();

      // setData({...login_data,login_user_email:pass_val.login_user_email,login_user_passw:pass_val.login_user_passw});
      //  ;
      //;

      document.getElementById("logCheck").checked = true;

      // document.getElementById('login_bttn').disabled= false;
    }
  };

  if (count === 1 || count === 2) {
    setTimeout(check_or_not);
    count++;
  }
  const closeForm = () => {
    count = 1;
    setOpen(false);
  };

  return (
    <>
      <div id="background">
        <div id="align_form">
          <div class="login_container">
            <i
              className="fa fa-close"
              id="close_form"
              onClick={() => {
                closeForm();
              }}
            ></i>

            <div class="forms">
              <div class="in_form login">
                <span class="log_title">Login</span>

                <div class="log_input-field">
                  <input
                    type="email"
                    id="login_email"
                    placeholder="Enter your email"
                    name="login_user_email"
                    required
                    onChange={handleChange_login}
                  />
                  <i class="uil uil-envelope icon"></i>
                </div>

                <div class="log_input-field">
                  <input
                    type="password"
                    class="password"
                    id="login_pasw"
                    placeholder="Enter your password"
                    name="login_user_passw"
                    required
                    onChange={handleChange_login}
                  />
                  <i class="uil uil-lock icon"></i>
                  <i
                    class="uil uil-eye-slash showHidePw"
                    onClick={() => call_design()}
                  ></i>
                </div>

                <div class="checkbox-text">
                  <div class="checkbox-content">
                    <input type="checkbox" id="logCheck" />
                    <label for="logCheck" class="text">
                      Remember me
                    </label>
                  </div>

                  <a href="javascript:" class="text forgot-link">
                    Forgot password?
                  </a>
                  {Open_forgot && (
                    <Forgot_pasw setOpen_forgot={setOpen_forgot} />
                  )}
                </div>

                <Button
                  type="submit"
                  id="login_bttn"
                  onClick={() => handleLogin()}
                >
                  Login
                </Button>

                <div class="login-signup">
                  <span class="text">
                    Not have a account?
                    <a href="#" class="text signup-link">
                      Signup Now
                    </a>
                  </span>
                </div>
              </div>
              <div class="in_form signup">
                <i
                  className="fa fa-close"
                  id="close_sign"
                  onClick={() => closeForm()}
                ></i>

                <span class="log_title" id="registration">
                  Registration
                </span>

                <form onSubmit={handleSubmit} method="POST">
                  <div class="log_input-field newname">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      maxLength={30}
                      name="user_name"
                      id="user_input"
                      required
                      onChange={handleChange}
                    />
                    <i class="uil uil-user icon"></i>
                  </div>
                  <div class="log_input-field">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="user_email"
                      id="user_input_email"
                      required
                      onChange={handleChange}
                    />
                    <i class="uil uil-envelope icon"></i>
                  </div>
                  <div class="log_input-field">
                    <input
                      type="password"
                      class="password"
                      placeholder="Create a password"
                      name="user_passw"
                      id="user_input_passw"
                      required
                      onChange={handleChange}
                    />
                    <i class="uil uil-lock icon"></i>
                    <i
                      class="uil uil-eye-slash showHidePw"
                      onClick={() => call_design()}
                    ></i>
                  </div>
                  <div class="log_input-field">
                    <input
                      type="password"
                      class="cpassword"
                      id="conform_pas"
                      placeholder="Confirm a password"
                      name="user_conform_passw"
                      required
                      onChange={handleChange}
                    />
                    <i class="uil uil-lock icon"></i>
                    <i
                      class="uil uil-eye-slash  cshowHidePw"
                      onClick={() => call_design()}
                    ></i>
                  </div>
                  <Button
                    type="submit"
                    id="login_bttn"
                    disabled={
                      user_name == "" ||
                      user_email == "" ||
                      user_passw == "" ||
                      user_conform_passw == "" ||
                      user_passw !== user_conform_passw
                    }
                  >
                    Signup
                  </Button>
                </form>

                <div class="login-signup">
                  <span class="text">
                    Already i have a account?
                    <a href="#" class="text login-link">
                      Login Now
                    </a>
                  </span>
                </div>
                <p id="setTime">{setTimeout(call_design)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Login_reg_form;
