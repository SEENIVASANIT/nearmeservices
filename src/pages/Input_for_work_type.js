import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Loader, Progress } from "semantic-ui-react";
import { storage, db } from "../firebase";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Loader1 from "../components/Loader1";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  work_type_tamil: "",
  work_type_english: "",
};
const area_about_initialState = {
  Block_Name: "",
  District: "",
  State: "",
  Area_Address: "",
  Telephone_Std_Code: "",
  Assembly_MLA: "",
  Parliament_MP: "",
  Post_Office_Name: "",
  Pin_Code: "",
  Area_location: "",
};

const Input_for_work_type = () => {
  const [data, setData] = useState(initialState);
  const [set_data, set_Data] = useState(area_about_initialState);
  const { work_type_tamil, work_type_english } = data;
  const {
    Block_Name,
    District,
    State,
    Area_Address,
    Telephone_Std_Code,
    Assembly_MLA,
    Parliament_MP,
    Post_Office_Name,
    Pin_Code,
    Area_location,
  } = set_data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSuBmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const {id}=useParams();

  const get_collection = useLocation(); //get img_url_value
  var get_collection_name = get_collection.state.collection_name;
  var get_subcollection_id = get_collection.state.subcollection_id;
  var id = get_collection.state.id;
  const usersCollectionRef = collection(
    db,
    get_subcollection_id + "about_area"
  );
  // var get_collection_name = get_collection.state.collection_name;
  // var get_img_url = get_collection.state.img_url;
  // var id = get_collection.state.id;
  var get_about_data = 0;
  useEffect(() => {
    id && getSingleuser();
  }, [id]);
  const getSingleuser = async () => {
    const docRef = doc(db, get_subcollection_id, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };
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
              closeOnClick: false,
              pauseOnHover: true,
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
          console.log(errors);
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

  const validate = () => {
    let errors = {};
    // if (!work_type_tamil || !work_type_tamil || location) {
    //   //Toast.error("empty field is not allow!")

    // }

    return errors;
  };
  const about_area_initial = async () => {
    const get_data = await getDocs(usersCollectionRef);
    if (get_data.empty) {
      //CHECK COLLECTION EMPTY ARE NOT
      try {
        //ADD DADA UPLOAD TO COLLECTION FIREBASE
        /// *THIS COLLECTION IN CHANGE FOR CITYS* /////////////////////
        await addDoc(collection(db, get_subcollection_id + "about_area"), {
          ...set_data,
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
  };
  const handleSubmit = async (e) => {
    //SUBMIT THE ALL DATA
    e.preventDefault(); //COMMEN
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);
    setIsSuBmit(true);
    if (!id) {
      try {
        //ADD DADA UPLOAD TO COLLECTION FIREBASE
        /// *THIS COLLECTION IN CHANGE FOR CITYS* /////////////////////
        about_area_initial();
        await addDoc(collection(db, get_subcollection_id), {
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
    } else {
      try {
        //*UPDATE THE DATA IN FIREBASE*//
        await updateDoc(doc(db, get_subcollection_id, id), {
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

    //OFTER CLICK UPLOAD THEN NAVIGATE AREA PAGE
    if (localStorage.getItem("current_user")) {
      var temp_store = localStorage.getItem("current_user");
      var pass_val = JSON.parse(temp_store);
      if (
        pass_val.login_user_email === "20110090@hicet.ac.in" &&
        pass_val.login_user_passw === "26@#seeni"
      ) {
        navigate("/admin_all_worker", {
          state: {
            collection_name: get_collection_name,
            subcollection_id: get_subcollection_id,
            count: 1,
          },
        }); //PASS THA DATA FO THAT PAGE(ITS USE SHOW THA DATA THIS PAGE)
      } else {
        navigate("/w", {
          state: {
            collection_name: get_collection_name,
            subcollection_id: get_subcollection_id,
            count: 1,
          },
        }); //PASS THA DATA FO THAT PAGE(ITS USE SHOW THA DATA THIS PAGE)
      }
    }
  };
  setTimeout(id_not_null, 0);
  var id_not_null = () => {
    id !== ""
      ? (document.getElementById("submit_btt_for_add_area").innerHTML =
          "UPDATE")
      : (document.getElementById("submit_btt_for_add_area").innerHTML =
          "ADD PROFESSION");
  };
  // if(count==1){
  //   if(progress!==null && progress<100){
  //     document.getElementById('sp').innerHTML='WAIT....'
  //   }
  //   else{
  //     document.getElementById('sp').innerHTML='ADD AREA'
  //   }
  // }

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
            <a href="/all_city"> Go back</a>
          </li>
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
        <div id="group-in1">
          <form onSubmit={handleSubmit}>
            <div
              className="form"
              style={{
                backgroundColor: "#161616",
                borderRadius: "20px",
                boxSizing: "border-box",
                height: "400px",
                padding: "20px",
                width: "400px",
                marginTop: "10%",
              }}
            >
              {" "}
              <div className="title">Add NEW WORKS</div>
              <div className="subtitle">Let's create new work in the area</div>
              <div className="input-container ic1">
                <input
                  id="work_type_tamil"
                  className="input"
                  type="text"
                  required
                  placeholder=" "
                  error={
                    errors.work_type_tamil
                      ? { content: errors.work_type_tamil }
                      : null
                  }
                  name="work_type_tamil"
                  onChange={handleChange}
                  value={work_type_tamil}
                />
                <div className="cut1"></div>
                <label for="work_type_tamil" className="placeholder">
                  professions name(Tamil)
                </label>
              </div>
              <div className="input-container ic2">
                <input
                  id="work_type_english"
                  className="input"
                  type="text"
                  required
                  placeholder=" "
                  error={
                    errors.work_type_english
                      ? { content: errors.work_type_english }
                      : null
                  }
                  name="work_type_english"
                  onChange={handleChange}
                  value={work_type_english}
                />
                <div className="cut1"></div>
                <label for="work_type_english" className="placeholder">
                  professions name(English)
                </label>
              </div>
              <p id="area_img_file">Upload professions image.</p>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button
                id="submit_btt_for_add_area"
                primary
                className="submit"
                disabled={
                  (id == null && progress == null) ||
                  (progress !== null && progress < 100)
                }
              >
                <span id="sp">ADD PROFESSION</span>
              </Button>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Input_for_work_type;
