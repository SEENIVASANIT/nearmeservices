import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Loader, Progress } from "semantic-ui-react";
import { storage, db } from "../firebase";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Loader1 from "../components/Loader1";
import { ToastContainer, toast } from "react-toastify";
import "../pages/Add_professions.css";
import emailjs from "@emailjs/browser";
import Registration_show from "../components/Registration_show";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
  limitToLast,
} from "firebase/firestore";
const initialState = {
  w_name: "",
  w_Gender: "",
  w_email: "",
  w_phone: "",
  Professions: "",
  w_experience: Number(0),
  w_dob: "",
  w_address: "",
  w_location: "",
  Instagram: "",
  Facebook: "",
  Twitter: "",
};

const Add_professions = () => {
  const [data, setData] = useState(initialState);
  const {
    w_name,
    w_Gender,
    w_email,
    w_phone,
    Professions,
    w_experience,
    w_dob,
    w_address,
    w_location,
    Instagram,
    Facebook,
    Twitter,
  } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSuBmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen1] = useState(false);
  const [call_dataset_fun, call_Dataset_fun] = useState(false);
  const [get_set_id, get_setId] = useState("");
  const navigate = useNavigate();
  //const {id}=useParams();

  const get_collection = useLocation(); //get img_url_value
  //var get_collection_name = get_collection.state.collection_name;
  var get_collection_name = get_collection.state.subcollection_id;
  var get_name_collection = get_collection.state.collection_name;
  var get_img_url = get_collection.state.img_url;
  //const {work_type_english}=useParams();
  //var get_img_url = get_collection.state.img_url;
  //var id = get_collection.state.id;
  var id = get_collection.state.id;
  useEffect(() => {
    id && getSingleuser();
  }, [id]);

  const getSingleuser = async () => {
    const docRef = doc(db, get_collection_name, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };
  const getSingleuser1 = async () => {
    const docRef = doc(db, "New_registration", get_set_id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };
  if (call_dataset_fun) {
    getSingleuser1();
    call_Dataset_fun(false);
  }

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          /*---------------------------BROGRESS-BAR-------------------------------*/
          if (progress !== null && progress < 100) {
            toast.success("File Uploading...", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
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
            case "running":
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
        },
        (errors) => {
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
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //GET IMAGE URL
            setData((prev) => ({ ...prev, img: downloadURL })); //Upload DATA TO FIRSTORE
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    //INPUT TO TAKE THE DATA
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e) => {
    //IT HELP FOR STORE DAT IN NUMBER (e.target.value) IT ONLY RETURN STRING SO USE IT
    setData({ ...data, [e.target.name]: e.target.valueAsNumber });
  };

  const validate = () => {
    let errors = {};
    // if (!area_name_tamil || !area_name_tamil || location) {
    //   //Toast.error("empty field is not allow!")

    // }

    return errors;
  };
  const handleSubmit = async (e) => {
    //SUBMIT THE ALL DATA
    e.preventDefault(); //COMMEN
    let errors = validate();
    const access_id =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    const Add_professions_profile_mail = {
      w_name: data.w_name,
      w_email: data.w_email,
      w_city_name: data.City_name,
      District_name: data.District_name,
      w_area_name: data.Area_name,
      w_professions: data.Professions,
      w_access_id: access_id,
      reply_to: "seenivasan90official@gmail.com",
    };
    if (Object.keys(errors).length) return setErrors(errors);

    setIsSuBmit(true);
    if (!id) {
      try {
        //ADD DADA UPLOAD TO COLLECTION FIREBASE
        /// *THIS COLLECTION IN CHANGE FOR CITYS* /////////////////////

        await addDoc(collection(db, get_collection_name), {
          ...data,
          w_star_rading: "0.0",
          five_stars: {
            one_star: 0,
            two_star: 0,
            three_star: 0,
            four_star: 0,
            five_star: 0,
          },
          access_id: access_id,
          timstamp: serverTimestamp(),
        });
        await addDoc(collection(db, "All_Verification_id"), {
          name: data.w_name,
          email: data.w_email,
          Access_id: access_id,
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
    } else {
      try {
        //*UPDATE THE DATA IN FIREBASE*//
        await updateDoc(doc(db, get_collection_name, id), {
          ...data,
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
    }
    //  SEND AUTO MAIL FOR USER
    emailjs
      .send(
        "service_lhmbaxs",
        "template_8bgv85n",
        Add_professions_profile_mail,
        "7OLy18V87149zFwY9"
      )
      .then(
        (result) => {
          toast.success("successfully profile added and send mail.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        },
        (error) => {
          toast.error("Invalid mail id.", {
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
      );

    //OFTER CLICK UPLOAD THEN NAVIGATE AREA PAGE
    if (localStorage.getItem("current_user")) {
      var temp_store = localStorage.getItem("current_user");
      var pass_val = JSON.parse(temp_store);
      if (
        pass_val.login_user_email === "20110090@hicet.ac.in" &&
        pass_val.login_user_passw === "26@#seeni"
      ) {
        navigate(`/admin_all_professions_show`, {
          state: {
            subcollection_id: get_collection_name,
            collection_name: get_name_collection,
            img_url: get_img_url,
            work_type_english: get_collection.state.work_type_english,
          },
        }); //PASS THA DATA FO THAT PAGE(ITS USE SHOW THA DATA THIS PAGE)
      } else {
        navigate(`/show_p`, {
          state: {
            subcollection_id: get_collection_name,
            collection_name: get_name_collection,
            img_url: get_img_url,
            work_type_english: get_collection.state.work_type_english,
          },
        }); //PASS THA DATA FO THAT PAGE(ITS USE SHOW THA DATA THIS PAGE)
      }
    }
  };
  const Go_path_localstorage = () => {
    var store = localStorage.getItem("my_area");

    if (store === null) {
      toast.error("Sorry you must select your city!!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      navigate(`/w`, {
        state: { subcollection_id: localStorage.getItem("my_area"), count: 1 },
      });
    }
  };
  var count = 1;
  const show_social_media_input = () => {
    if (count === 1) {
      document.getElementById("hidden").style.display = "block";
      count = 2;
    } else {
      document.getElementById("hidden").style.display = "none";
      count = 1;
    }
  };
  return (
    <div>
      <nav>
        <div className="logo">NearMe Services!</div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" id="menu">
          <i className="fas fa-bars"></i>
        </label>
        <ul>
          <li>
            <a href="javascript:" onClick={() => setOpen1(true)}>
              All request
            </a>
          </li>
          {open && (
            <Registration_show
              setOpen1={setOpen1}
              call_dataset_fun={call_Dataset_fun}
              get_set_id={get_setId}
            />
          )}
          <li>
            <a
              id="my_area"
              title="First you want to select your area. before that you click to go your area!"
              href="javascript:"
              onClick={() => Go_path_localstorage()}
            >
              Go My Area
            </a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
      {isSubmit ? (
        // <Loader active inline='centered' size="huge"/>
        <Loader1 />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div class="worker_from_wrapper">
              <div class="worker_from_wrapper_title">Registration Form</div>
              <div class="worker_input_form">
                <div class="worker_input_form_inputfield">
                  <label>NAME*</label>
                  <input
                    type="text"
                    name="w_name"
                    id="set_name"
                    placeholder="enter a name."
                    autoFocuse
                    required
                    class="input"
                    error={errors.w_name ? { content: errors.w_name } : null}
                    onChange={handleChange}
                    value={w_name}
                    autofocus
                  />
                </div>

                <div class="worker_input_form_inputfield">
                  <label>GENDER*</label>
                  <div class="worker_genter_select">
                    <select
                      required
                      name="w_Gender"
                      onChange={handleChange}
                      value={w_Gender}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="worker_input_form_inputfield">
                  <label>EMAIL ADDRESS*</label>
                  <input
                    type="email"
                    name="w_email"
                    placeholder="enter a email."
                    required
                    class="input"
                    onChange={handleChange}
                    value={w_email}
                  />
                </div>
                <div class="worker_input_form_inputfield">
                  <label>PHONE NUMDER*</label>
                  <input
                    type="tel"
                    pattern="^[6-9]\d{9}"
                    name="w_phone"
                    placeholder="Enter a number."
                    maxLength={10}
                    required
                    class="input"
                    onChange={handleChange}
                    value={w_phone}
                  />
                </div>
                <div class="worker_input_form_inputfield">
                  <label>PROFESSIONS*</label>
                  <input
                    type="text"
                    name="Professions"
                    placeholder="Enter a professions."
                    required
                    class="input"
                    onChange={handleChange}
                    value={Professions}
                  />
                </div>
                <div class="worker_input_form_inputfield">
                  <label>EXPERIENCE*</label>
                  <input
                    type="number"
                    name="w_experience"
                    min="0"
                    placeholder="Enter a experience."
                    required
                    class="input"
                    onChange={handleChange2}
                    value={Number(w_experience)}
                  />
                </div>
                <div class="worker_input_form_inputfield">
                  <label>DATE OF BEARTH*</label>
                  <input
                    type="date"
                    name="w_dob"
                    placeholder="Enter a DOB."
                    required
                    class="input"
                    onChange={handleChange}
                    value={w_dob}
                  />
                </div>

                <div class="worker_input_form_inputfield">
                  <label>ADDERSS</label>
                  <textarea
                    class="textarea"
                    name="w_address"
                    placeholder="Enter a address."
                    onChange={handleChange}
                    value={w_address}
                    required
                  ></textarea>
                </div>
                <div class="worker_input_form_inputfield">
                  <label>CURRENT LOCATION*</label>
                  <input
                    type="text"
                    placeholder="Enter a current location."
                    name="w_location"
                    required
                    class="input"
                    onChange={handleChange}
                    value={w_location}
                  />
                  <a
                    href="https://www.google.com/maps/@10.7828364,78.2885026,7z"
                    id="addres_map"
                    target="_blank"
                  >
                    <i class="material-icons">&#xe567;</i>
                  </a>
                </div>
                <div id="w_image">
                  <p>
                    <h4>YOUR PROFILE</h4>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </p>
                </div>
                <a
                  href="javascript:"
                  onClick={() => show_social_media_input()}
                  id="social_media"
                >
                  SOCIAL MEDIA
                </a>
                <div id="hidden">
                  <div class="worker_input_form_inputfield">
                    <label>INSTAGRAM</label>
                    <input
                      type="text"
                      name="Instagram"
                      placeholder="Instagram id(opetional)"
                      class="input"
                      onChange={handleChange}
                      value={Instagram}
                    />
                  </div>
                  <div class="worker_input_form_inputfield">
                    <label>FACEBOOK</label>
                    <input
                      type="text"
                      name="Facebook"
                      placeholder="Facebook id(opetional)"
                      class="input"
                      onChange={handleChange}
                      value={Facebook}
                    />
                  </div>
                  <div class="worker_input_form_inputfield">
                    <label>TWITTER</label>
                    <input
                      type="text"
                      name="Twitter"
                      placeholder="Twitter id(opetional)"
                      class="input"
                      onChange={handleChange}
                      value={Twitter}
                    />
                  </div>
                </div>
                <div class="worker_input_form_inputfield">
                  <Button primary className="worker_input_form_submit_btt">
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};
export default Add_professions;
