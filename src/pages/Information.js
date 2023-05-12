import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  Button,
  Card,
  Grid,
  Container,
  Image,
  Checkbox,
  Loader,
  Item,
} from "semantic-ui-react";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
  Await,
} from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import Professions_post from "./Professions_post";
import "react-toastify/dist/ReactToastify.css";
import "../pages/Information.css";
import Star_rading from "../components/Star_rading";
import Comments from "../components/Comments";
const Information = () => {
  const [users, setUsers] = useState([]); //SET DATA
  const [open, setOpen] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [user, setUser] = useState({});
  var [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation(); //get VALE FOR PREVASE PAGE
  //STORE ALL VALE
  const get_collection = location.state.subcollection_id;
  const w_name = location.state.w_name;
  const w_Gender = location.state.w_Gender;
  const w_email = location.state.w_email;
  const w_phone = location.state.w_phone;
  const Professions = location.state.Professions;
  const w_experience = location.state.w_experience;
  const w_dob = location.state.w_dob;
  const w_address = location.state.w_address;
  const w_img = location.state.w_img;
  const w_location = location.state.w_location;
  const subcollection_id = location.state.subcollection_id;
  const id = location.state.id;
  var w_star_rading = location.state.w_star_rading;
  var one_star = location.state.one_star;
  var two_star = location.state.two_star;
  var three_star = location.state.three_star;
  var four_star = location.state.four_star;
  var five_star = location.state.five_star;
  var Instagram = location.state.Instagram;
  var Facebook = location.state.Facebook;
  var Twitter = location.state.Twitter;
  var item = location.state.item;
  const navigate = useNavigate();
  const get_current_date = new Date();
  /////////////////////////////////check star rading alrady click/////////////////////////////
  var temp_store = localStorage.getItem(id);
  var pass_val = JSON.parse(temp_store);
  // alert(parseInt(String(get_current_date.getDate()).padStart(2,'0')))
  //setTimeout(call_check_star_rating,0)
  //{(pass_val===null)? console.log("nodata"): (parseInt(pass_val.date)===parseInt(String(get_current_date.getDate()).padStart(2,'0')) && parseInt(pass_val.month)===parseInt(String(get_current_date.getMonth()+1).padStart(2,'0'))&& pass_val.year===get_current_date.getFullYear())? document.getElementById('give_rading').disabled=true:localStorage.removeItem(id)}
  var call_check_star_rating = () => {
    if (pass_val === null) {
    } else {
      if (
        parseInt(pass_val.date) ===
          parseInt(String(get_current_date.getDate()).padStart(2, "0")) &&
        parseInt(pass_val.month) ===
          parseInt(String(get_current_date.getMonth() + 1).padStart(2, "0")) &&
        pass_val.year === get_current_date.getFullYear()
      ) {
        document.getElementById("give_rading").disabled = true;
        document.getElementById("give_rading").style.textDecoration =
          "line-through";
        document.getElementById("give_rading").style.display = "block";
      } else {
        localStorage.removeItem(id);
      }
    }
  };
  ///////////////////////////
  const handleModal = () => {
    //ITS USE FOR SHOW STAR RATING POPUP
    setOpen(true);
    setUser();
  };
  const handleModal_comment = () => {
    //ITS USE FOR SHOW STAR RATING POPUP
    setOpen1(true);
  };
  const handleUpdate_star = async (stars) => {
    setOpen(false);
    var itemss = {
      date: String(get_current_date.getDate()).padStart(2, "0"),
      year: get_current_date.getFullYear(),
      month: String(get_current_date.getMonth() + 1).padStart(2, "0"),
    };
    localStorage.setItem(id, JSON.stringify(itemss));
    if (stars === 1) {
      const total_star =
        (one_star += 1) + two_star + three_star + four_star + five_star;
      const Score_total =
        one_star * 1 +
        two_star * 2 +
        three_star * 3 +
        four_star * 4 +
        five_star * 5;
      const five_str_score = Score_total / total_star;
      const factor = Math.pow(10, 1);
      const tempNum = five_str_score * factor;
      const rounded = Math.round(tempNum);
      w_star_rading = rounded / factor;
      update_stars_in_firebase();
    } else if (stars === 2) {
      const total_star =
        one_star + (two_star += 1) + three_star + four_star + five_star;
      const Score_total =
        one_star * 1 +
        two_star * 2 +
        three_star * 3 +
        four_star * 4 +
        five_star * 5;
      const five_str_score = Score_total / total_star;
      const factor = Math.pow(10, 1);
      const tempNum = five_str_score * factor;
      const rounded = Math.round(tempNum);
      w_star_rading = rounded / factor;
      update_stars_in_firebase();
    } else if (stars === 3) {
      const total_star =
        one_star + two_star + (three_star += 1) + four_star + five_star;
      const Score_total =
        one_star * 1 +
        two_star * 2 +
        three_star * 3 +
        four_star * 4 +
        five_star * 5;
      const five_str_score = Score_total / total_star;
      const factor = Math.pow(10, 1);
      const tempNum = five_str_score * factor;
      const rounded = Math.round(tempNum);
      w_star_rading = rounded / factor;
      update_stars_in_firebase();
    } else if (stars === 4) {
      const total_star =
        one_star + two_star + three_star + (four_star += 1) + five_star;
      const Score_total =
        one_star * 1 +
        two_star * 2 +
        three_star * 3 +
        four_star * 4 +
        five_star * 5;
      const five_str_score = Score_total / total_star;
      const factor = Math.pow(10, 1);
      const tempNum = five_str_score * factor;
      const rounded = Math.round(tempNum);
      w_star_rading = rounded / factor;
      update_stars_in_firebase();
    } else if (stars === 5) {
      const total_star =
        one_star + two_star + three_star + four_star + (five_star += 1);
      const Score_total =
        one_star * 1 +
        two_star * 2 +
        three_star * 3 +
        four_star * 4 +
        five_star * 5;
      const five_str_score = Score_total / total_star;
      const factor = Math.pow(10, 1);
      const tempNum = five_str_score * factor;
      const rounded = Math.round(tempNum);
      w_star_rading = rounded / factor;
      update_stars_in_firebase();
    }
  };
  const update_stars_in_firebase = async () => {
    try {
      toast.success("Thank you for your valuable star rating!!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //*UPDATE THE DATA IN FIREBASE*//
      await updateDoc(doc(db, subcollection_id, id), {
        w_star_rading: w_star_rading,

        five_stars: {
          one_star: one_star,
          two_star: two_star,
          three_star: three_star,
          four_star: four_star,
          five_star: five_star,
        },
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
  };

  var count = 1;
  var bar_hide = () => {
    if (count == 1) {
      document.getElementById("align_cen").style.display = "none";
      count = 2;
    } else {
      document.getElementById("align_cen").style.display = "block";
      count = 1;
    }
  };
  const Go_path_localstorage = () => {
    var store = localStorage.getItem("my_area");

    if (store === null) {
      toast.error("Sorry you must select your area!!!", {
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

  {
    setTimeout(call_check_star_rating, 0);
  }
  return (
    <div>
      <nav>
        <div className="logo">NearMe Services!</div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" id="menu">
          <i
            className="fas fa-bars"
            onClick={() => {
              setTimeout(bar_hide, 100);
            }}
          ></i>
        </label>
        <ul>
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
            <a href="jacascript:" onClick={() => navigate("/new_registration")}>
              Register
            </a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
      </nav>
      <div id="align_cen">
        <div class="w_Information">
          <div class="left">
            <img id="left_user_img" src={w_img} alt="Worker" />
            <h4 id="left_below_name">{w_name}</h4>
            <p>{Professions}</p>
            <p>{w_experience} Years</p>
            <span>
              <Button
                primary
                id="comment_for_worker"
                onClick={() => handleModal_comment()}
              >
                Comments
              </Button>{" "}
              <Button positive id="viewpost" onClick={() => setOpen3(true)}>
                View Posts{" "}
              </Button>
            </span>
            {open1 && (
              <Comments
                open1={open1}
                setOpen1={setOpen1}
                id={id}
                collections={get_collection}
                name={w_name}
              />
            )}{" "}
            {open3 && (
              <Professions_post
                open3={open3}
                setOpen3={setOpen3}
                id={id}
                collections={get_collection}
                name={w_name}
              />
            )}
          </div>
          <div class="right">
            <div class="info">
              <h3>Information</h3>
              <div class="info_data">
                <div id="info_genter" class="data">
                  <h4>&#9681;GENDER</h4>
                  <p id="info_gen">{w_Gender}</p>
                </div>
                <div id="info_dob" class="data">
                  <h4>&#9681;DATA OF BIRATH</h4>
                  <p id="info_d">{w_dob}</p>
                </div>
              </div>
              <div class="info_data">
                <div class="data">
                  <h4>&#9681;EMAIL</h4>
                  <a
                    href={`mailto:${w_email}`}
                    target="_blank"
                    title="Click to send mail!"
                  >
                    <p id="info_mail">{w_email}</p>
                  </a>
                </div>
                <div id="info_mob" class="data">
                  <h4>&#9681;PHONE</h4>
                  <a
                    href={`tel:${w_phone}`}
                    target="_blank"
                    title="Click to call!"
                  >
                    <p id="info_phon">+91 {w_phone}</p>
                  </a>
                </div>
              </div>
              <div class="info_data">
                <div id="info_add" class="data">
                  <h4 id="adds">&#9681;ADDRESS</h4>
                  <a
                    href={w_location}
                    target="_blank"
                    title="Click to go location!"
                  >
                    <p id="info_address">{w_address}</p>
                  </a>
                </div>
              </div>
            </div>
            <div class="star-container">
              <br />
              <br />
              <br />
              {w_star_rading === 0 ? (
                <>
                  <span id="span" className="fa fa-star checked1"></span>
                  <span id="span" className="fa fa-star checked2"></span>
                  <span id="span" className="fa fa-star checked3"></span>
                  <span id="span" className="fa fa-star checked4"></span>
                  <span id="span" className="fa fa-star checked5"></span>
                </>
              ) : (
                console.log("")
              )}
              {w_star_rading > 0 && w_star_rading <= 1.5 ? (
                <>
                  <span id="span1" className="fa fa-star checked1"></span>
                  <span id="span" className="fa fa-star checked2"></span>
                  <span id="span" className="fa fa-star checked3"></span>
                  <span id="span" className="fa fa-star checked4"></span>
                  <span id="span" className="fa fa-star checked5"></span>
                </>
              ) : (
                console.log("")
              )}
              {w_star_rading > 1.5 && w_star_rading <= 2.5 ? (
                <>
                  <span id="span1" className="fa fa-star checked1"></span>
                  <span id="span1" className="fa fa-star checked2"></span>
                  <span id="span" className="fa fa-star checked3"></span>
                  <span id="span" className="fa fa-star checked4"></span>
                  <span id="span" className="fa fa-star checked5"></span>
                </>
              ) : (
                console.log("")
              )}
              {w_star_rading > 2.5 && w_star_rading <= 3.5 ? (
                <>
                  <span id="span1" className="fa fa-star checked1"></span>
                  <span id="span1" className="fa fa-star checked2"></span>
                  <span id="span1" className="fa fa-star checked3"></span>
                  <span id="span" className="fa fa-star checked4"></span>
                  <span id="span" className="fa fa-star checked5"></span>
                </>
              ) : (
                console.log("")
              )}
              {w_star_rading > 3.5 && w_star_rading <= 4.5 ? (
                <>
                  <span id="span1" className="fa fa-star checked1"></span>
                  <span id="span1" className="fa fa-star checked2"></span>
                  <span id="span1" className="fa fa-star checked3"></span>
                  <span id="span1" className="fa fa-star checked4"></span>
                  <span id="span" className="fa fa-star checked5"></span>
                </>
              ) : (
                console.log("")
              )}
              {w_star_rading >= 4.6 ? (
                <>
                  <span id="span1" className="fa fa-star checked1"></span>
                  <span id="span1" className="fa fa-star checked2"></span>
                  <span id="span1" className="fa fa-star checked3"></span>
                  <span id="span1" className="fa fa-star checked4"></span>
                  <span id="span1" className="fa fa-star checked5"></span>
                </>
              ) : (
                console.log("")
              )}
              <br />
              <span id="info_rate">
                Star rating: {w_star_rading}
                <span id="star">★</span>
              </span>
              .
              <span id="total_count_star">
                {item.five_stars.one_star +
                  item.five_stars.two_star +
                  item.five_stars.three_star +
                  item.five_stars.four_star +
                  item.five_stars.five_star}
              </span>
              <Button
                onClick={() => handleModal()}
                title="Only one time give star rading per day!!!"
                id="give_rading"
              >
                Give Rating
              </Button>
              {open && (
                <Star_rading
                  open={open}
                  setOpen={setOpen}
                  img={w_img}
                  name={w_name}
                  handleUpdate_star={handleUpdate_star}
                />
              )}
            </div>
            <div class="social_media">
              <ul>
                <li>
                  <a href={Facebook} target="_blank">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href={Twitter} target="_blank">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href={Instagram} target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {loading && "Loading..."}
    </div>
  );
};

export default Information;
