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
  doc,
  serverTimestamp,
  updateDoc,
  limitToLast,
} from "firebase/firestore";
const initialState = {
  area_name_tamil: "",
  area_name_english: "",
  location: "",
};
const Input_for_area = () => {
  //var count=0;
  const [data, setData] = useState(initialState);
  const { area_name_tamil, area_name_english, location } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSuBmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const {id}=useParams();

  const get_collection = useLocation(); //get img_url_value
  var get_collection_name = get_collection.state.collection_name;
  var get_img_url = get_collection.state.img_url;
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
    // if (!area_name_tamil || !area_name_tamil || location) {
    //   //Toast.error("empty field is not allow!")

    // }

    return errors;
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
        await addDoc(collection(db, get_collection_name), {
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

    //OFTER CLICK UPLOAD THEN NAVIGATE AREA PAGE
    if (localStorage.getItem("current_user")) {
      var temp_store = localStorage.getItem("current_user");
      var pass_val = JSON.parse(temp_store);
      if (
        pass_val.login_user_email === "20110090@hicet.ac.in" &&
        pass_val.login_user_passw === "26@#seeni"
      ) {
        navigate("/admin_home", {
          state: { collection_name: get_collection_name, img_url: get_img_url },
        }); //PASS THA DATA FO THAT PAGE(ITS USE SHOW THA DATA THIS PAGE)
      } else {
        navigate("/all_area", {
          state: { collection_name: get_collection_name, img_url: get_img_url },
        }); //PASS THA DATA FO THAT PAGE(ITS USE SHOW THA DATA THIS PAGE)
      }
    }
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
        <div id="group-in">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="title">Add NEW AREA</div>
              <div className="subtitle">
                Let's create new area in the '{get_collection_name}'
              </div>
              <div className="input-container ic1">
                <input
                  id="area_name_tamil"
                  className="input"
                  type="text"
                  required
                  placeholder=" "
                  error={
                    errors.area_name_tamil
                      ? { content: errors.area_name_tamil }
                      : null
                  }
                  name="area_name_tamil"
                  onChange={handleChange}
                  value={area_name_tamil}
                />
                <div className="cut"></div>
                <label for="area_name_tamil" className="placeholder">
                  Area name(Tamil)
                </label>
              </div>
              <div className="input-container ic2">
                <input
                  id="area_name_english"
                  className="input"
                  type="text"
                  required
                  placeholder=" "
                  error={
                    errors.area_name_english
                      ? { content: errors.area_name_english }
                      : null
                  }
                  name="area_name_english"
                  onChange={handleChange}
                  value={area_name_english}
                />
                <div className="cut"></div>
                <label for="area_name_english" className="placeholder">
                  Area name(English)
                </label>
              </div>
              <div className="input-container ic2">
                <input
                  id="location"
                  className="input"
                  required
                  type="text"
                  placeholder=" "
                  error={errors.location ? { content: errors.location } : null}
                  name="location"
                  onChange={handleChange}
                  value={location}
                />
                <div className="cut cut-short"></div>
                <label for="location" className="placeholder" required>
                  Area location.
                </label>
              </div>
              <p id="area_img_file">Upload area image.</p>
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
                <span id="sp">ADD AREA</span>
              </Button>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Input_for_area;
