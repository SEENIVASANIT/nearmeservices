import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader1 from "../components/Loader1";
import { ToastContainer, toast } from "react-toastify";
import { Container, Button } from "semantic-ui-react";
//ALL CITY LOGO
import img1 from "../All_city_in_tamilnadu/Avadi_city.jpeg";
import img2 from "../All_city_in_tamilnadu/Chennai_city.jpeg";
import img3 from "../All_city_in_tamilnadu/Coimbatore_city.png";
import img4 from "../All_city_in_tamilnadu/Cuddalore_city.jpeg";
import img5 from "../All_city_in_tamilnadu/Erode_city.jpeg";
import img6 from "../All_city_in_tamilnadu/hosur_city.jpg";
import img7 from "../All_city_in_tamilnadu/Kanchipuram_city.jpg";
import img8 from "../All_city_in_tamilnadu/Karur_city.jpeg";
import img9 from "../All_city_in_tamilnadu/Madurai_City_Corporation_Logo.png";
import img10 from "../All_city_in_tamilnadu/Nagercoil_city.png";
import img11 from "../All_city_in_tamilnadu/Salem_city.jpg";
import img12 from "../All_city_in_tamilnadu/Sivakasi_city.jpeg";
import img13 from "../All_city_in_tamilnadu/Tambaram_city.jpg";
import img14 from "../All_city_in_tamilnadu/Thanjavur_city.png";
import img15 from "../All_city_in_tamilnadu/Tiruchirappalli_city.png";
import img16 from "../All_city_in_tamilnadu/Tirunelveli_city.png";
import img17 from "../All_city_in_tamilnadu/Tirupur_city.jpeg";
import img18 from "../All_city_in_tamilnadu/Tuttukkuti_city.jpg";
import img19 from "../All_city_in_tamilnadu/Vellore_city.jpeg";
import img20 from "../All_city_in_tamilnadu/Dindugal_city.png";
import img21 from "../All_city_in_tamilnadu/Kumbakonam_city.jpeg";
var user_name = "";
const Admin_all_city = () => {
  //var toasts=false;
  //const get_tost = useLocation();
  //const toasts=get_tost.state?.toast;
  //alert(toasts)

  const navigate = useNavigate(); //ITS USE NAVIGATE AREA PAGE
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
  const userProf = () => {
    var temp_store = localStorage.getItem("current_user");
    var pass_val = JSON.parse(temp_store);
    toast.success(
      `Name : ${pass_val.current_user_name},                
          Email : ${pass_val.login_user_email}`,
      {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
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
            <a href="javascript:" onClick={() => navigate("/new_registration")}>
              Register
            </a>
          </li>
          <li>
            <a href="/" onClick={() => localStorage.removeItem("current_user")}>
              Logout
            </a>
          </li>
          <li>
            <i
              className="fas fa-user-circle"
              id="user_show_info"
              onClick={() => userProf()}
            ></i>
          </li>
        </ul>
      </nav>

      <div className="below_navi">
        <h1 id="city_page_heading">
          WELCOME TO OUR WEBSITE, {user_name.toLocaleUpperCase()}
        </h1>
        <h3 id="city_page_subtitle">Select your city</h3>
      </div>
      <div className="row">
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">ஆவடி</h1>
                <div className="image">
                  <img src={img1} alt="" />
                </div>
                <h1 id="city_english">AVADI</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu/@13.0474878,80.0689252,11z/data=!4m5!3m4!1s0x3a5265ea4f7d3361:0x6e61a70b6863d433!8m2!3d13.0826802!4d80.2707184!5m1!1e4"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "AVADI",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FAvadi_main.jpeg?alt=media&token=1852eec6-1921-49bf-87cd-69fdce2322c4",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">சென்னை</h1>
                <div className="image">
                  <img src={img2} />
                </div>
                <h1 id="city_english">CHENNAI</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Avadi,+Tamil+Nadu/@13.1141327,80.0887858,11470m/data=!3m1!1e3!4m5!3m4!1s0x3a5289d19bef6d25:0xe575e8ba16808e64!8m2!3d13.1067448!4d80.0969511!5m1!1e4"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: `CHENNAI`,
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FChennai_main.jpeg?alt=media&token=ebce7d73-35ce-402c-aa88-f31db445f72e",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">கோயமுத்தூர்</h1>
                <div className="image">
                  <img src={img3} />
                </div>
                <h1 id="city_english">COIMBATORE</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Coimbatore,+Tamil+Nadu/@11.0120145,76.8271454,11z/data=!3m1!4b1!4m5!3m4!1s0x3ba859af2f971cb5:0x2fc1c81e183ed282!8m2!3d11.0168445!4d76.9558321!5m1!1e4"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "COIMBATORE",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FCoimbatore_main.jpeg?alt=media&token=228a63e4-cd4f-4e26-9a06-363ea6d1e356",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row2">
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">கடலூர்</h1>
                <div className="image">
                  <img src={img4} alt="" />
                </div>
                <h1 id="city_english">CUDDALORE</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Cuddalore,+Tamil+Nadu/@11.7508628,79.7316556,13z/data=!3m1!4b1!4m5!3m4!1s0x3a549888444e5d9d:0x6aa2c2d991f57236!8m2!3d11.7480419!4d79.7713687"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "CUDDALORE",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FCuddalore_main.jpeg?alt=media&token=cdcd32fc-6fc9-4b61-9ef8-2d76e19ccc21",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">திண்டுக்கல்</h1>
                <div className="image">
                  <img src={img20} />
                </div>
                <h1 id="city_english">DINDUGAL</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%A4%E0%AE%BF%E0%AE%A3%E0%AF%8D%E0%AE%9F%E0%AF%81%E0%AE%95%E0%AF%8D%E0%AE%95%E0%AE%B2%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjf3ueN1Jv8AhXdxjgGHewHCpEQ_AUoAXoECAEQAw"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "DINDUGAL",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FDindugal_main.jpeg?alt=media&token=1221beb2-3a19-4308-bf37-16dfea3772c2",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">ஈரோடு</h1>
                <div className="image">
                  <img src={img5} />
                </div>
                <h1 id="city_english">ERODE</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%88%E0%AE%B0%E0%AF%8B%E0%AE%9F%E0%AF%81&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiy9Ing1Jv8AhU28zgGHTKTAa8Q_AUoAXoECAEQAw"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "ERODE",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FErode_main.jpeg?alt=media&token=2ce9a3e4-d2a4-4307-8329-511837968c25",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row3">
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">ஓசூர்</h1>
                <div className="image">
                  <img src={img6} t="" />
                </div>
                <h1 id="city_english">HOUSUR</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%93%E0%AE%9A%E0%AF%82%E0%AE%B0%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjw9t2f2Jv8AhXZUGwGHRs2CW8Q_AUoAnoECAEQBA"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "HOUSUR",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FHousur_main.jpeg?alt=media&token=73e45828-142d-433d-aa70-10f1767e9e87",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">காஞ்சிபுரம்</h1>
                <div className="image">
                  <img src={img7} />
                </div>
                <h1 id="city_english">KANCHIPURAM</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/search/%E0%AE%95%E0%AE%BE%E0%AE%9E%E0%AF%8D%E0%AE%9A%E0%AE%BF%E0%AE%AA%E0%AF%81%E0%AE%B0%E0%AE%AE%E0%AF%8D/@12.7417009,79.3515632,9z/data=!3m1!4b1"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "KANCHIPURAM",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FKanchipuram_main.jpg?alt=media&token=5b6577db-5e3d-4308-960d-61584b9785fb",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">கரூர்</h1>
                <div className="image">
                  <img src={img8} />
                </div>
                <h1 id="city_english">KARUR</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%95%E0%AE%B0%E0%AF%82%E0%AE%B0%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&sxsrf=ALiCzsYYOEZn8_wMSiN9hw1ddwQkzH8ciQ:1672209498004&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiv-pHq2Zv8AhWC_DgGHTnpD98Q_AUoAnoECAEQBA"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "KARUR",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FKarur_main.jpeg?alt=media&token=bc212568-740b-4f27-802f-228e31e57c15",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row4">
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">கும்பகோணம்</h1>
                <div className="image">
                  <img src={img21} alt="" />
                </div>
                <h1 id="city_english">KUMBAKONAM</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%95%E0%AF%81%E0%AE%AE%E0%AF%8D%E0%AE%AA%E0%AE%95%E0%AF%8B%E0%AE%A3%E0%AE%AE%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiz-IWt25v8AhUTSGwGHR53AeoQ_AUoAXoECAEQAw"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "KUMBAKONAM",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FKumbakonm_main.jpg?alt=media&token=8bfbb2e5-a6c7-4d22-b736-e575096120bd",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">மதுரை</h1>
                <div className="image">
                  <img src={img9} />
                </div>
                <h1 id="city_english">MADURAI</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Madurai,+Tamil+Nadu/@9.9178296,78.0527831,12z/data=!3m1!4b1!4m5!3m4!1s0x3b00c582b1189633:0xdc955b7264f63933!8m2!3d9.9252007!4d78.1197754"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "MADURAI",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FMadurai_main.jpeg?alt=media&token=034e6a64-9013-40bd-9504-74953ef0b4eb",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">நாகர்கோயில்</h1>
                <div className="image">
                  <img src={img10} />
                </div>
                <h1 id="city_english">NAGERCOIL</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%A8%E0%AE%BE%E0%AE%95%E0%AE%B0%E0%AF%8D%E0%AE%95%E0%AF%8B%E0%AE%AF%E0%AE%BF%E0%AE%B2%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjBweOv3Jv8AhVIcGwGHWGvCnUQ_AUoAXoECAEQAw"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "NAGERCOIL",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FNagerCoil_main.jpeg?alt=media&token=f4bf5708-6ccb-48b7-a936-4c2451575586",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row5">
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">சேலம்</h1>
                <div className="image">
                  <img src={img11} t="" />
                </div>
                <h1 id="city_english">SALEM</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%9A%E0%AF%87%E0%AE%B2%E0%AE%AE%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiB_YLf3pv8AhX9cGwGHXCPC6wQ_AUoAnoECAEQBA"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "SALAM",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FSalem_city.jpeg?alt=media&token=4b816749-0f4b-4045-ac81-f6cceea53ca5",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">சிவகாசி</h1>
                <div className="image">
                  <img src={img12} />
                </div>
                <h1 id="city_english">SIVAKASI</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%9A%E0%AE%BF%E0%AE%B5%E0%AE%95%E0%AE%BE%E0%AE%9A%E0%AE%BF&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjU6dqv35v8AhXGTGwGHcfaAUwQ_AUoAXoECAEQAw"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "SIVAKASI",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FSivakasi_main.jpeg?alt=media&token=90b537ce-7579-4af5-a4ff-57ae970c8467",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">தாம்பரம்</h1>
                <div className="image">
                  <img src={img13} />
                </div>
                <h1 id="city_english">TAMBARAM</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Tambaram,+Chennai,+Tamil+Nadu/@12.9220044,80.0779362,13z/data=!3m1!4b1!4m5!3m4!1s0x3a525f14844aad0f:0xe16d3a66c4ce38d4!8m2!3d12.9249308!4d80.1000026"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "TAMBARAM",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FThambaram_main.jpeg?alt=media&token=e7849fdb-d6ef-46fe-a4b9-1d6e5fb3c995",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row6">
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">தஞ்சாவூர்</h1>
                <div className="image">
                  <img src={img14} alt="" />
                </div>
                <h1 id="city_english">THANJAVUR</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%A4%E0%AE%9E%E0%AF%8D%E0%AE%9A%E0%AE%BE%E0%AE%B5%E0%AF%82%E0%AE%B0%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjVso2r4Zv8AhVDxjgGHUDpAcQQ_AUoAXoECAEQAw"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "THANJAVUR",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FThanjavur_main.jpeg?alt=media&token=9b1bf866-9821-4970-b999-a3f6600906e9",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">திருச்சிராப்பள்ளி</h1>
                <div className="image">
                  <img src={img15} />
                </div>
                <h1 id="city_english">TIRUCHIRAPPALLI</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%9A%E0%AF%8D%E0%AE%9A%E0%AE%BF%E0%AE%B0%E0%AE%BE%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%B3%E0%AF%8D%E0%AE%B3%E0%AE%BF&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiOq-uq4pv8AhVqR2wGHbnoD8AQ_AUoAXoECAEQAw"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "திருச்சிராப்பள்ளி",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FTiruchirappalli_main.jpg?alt=media&token=9d6762c2-2a35-4299-b77a-f2ffdc1cc825",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">திருநெல்வேலி</h1>
                <div className="image">
                  <img src={img16} />
                </div>
                <h1 id="city_english">TIRUNELVELI</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/search?q=%E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%A8%E0%AF%86%E0%AE%B2%E0%AF%8D%E0%AE%B5%E0%AF%87%E0%AE%B2%E0%AE%BF&rlz=1C1CHBF_enIN989IN989&oq=%E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%A8%E0%AF%86%E0%AE%B2%E0%AF%8D%E0%AE%B5%E0%AF%87%E0%AE%B2%E0%AE%BF&aqs=chrome..69i57.605j0j7&sourceid=chrome&ie=UTF-8"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "TIRUNELVELI",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FTirunelveli_main.jpg?alt=media&token=9360b7d4-f4d6-4257-97f7-0ff8e17c4fa4",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row7">
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">திருப்பூர்</h1>
                <div className="image">
                  <img src={img17} alt="" />
                </div>
                <h1 id="city_english">TIRUPUR</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AF%82%E0%AE%B0%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjy-vK65Jv8AhXegtgFHYK_BgcQ_AUoAnoECAEQBA"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "TIRUPUR",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FTirupur_main.jpeg?alt=media&token=cb6e0d1b-88de-4bc0-8dd8-1cf37671bd8f",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">துட்டுக்குடி</h1>
                <div className="image">
                  <img src={img18} />
                </div>
                <h1 id="city_english">THOOTHUKUDI</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Thoothukudi,+Tamil+Nadu/@8.7766073,78.0759769,12z/data=!3m1!4b1!4m5!3m4!1s0x3b03ee67b4ad764f:0x2443e6dc90ee7d3!8m2!3d8.7641661!4d78.1348361"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FThoothukudi_main.jpeg?alt=media&token=75cd4331-3c93-4113-a6df-c032c2a06148",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="containear">
          <div className="content">
            <div className="card">
              <div className="card-content">
                <h1 id="city_tamil">வேலூர்</h1>
                <div className="image">
                  <img src={img19} />
                </div>
                <h1 id="city_english">VELLORE</h1>
                <h5 id="map">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=%E0%AE%B5%E0%AF%87%E0%AE%B2%E0%AF%82%E0%AE%B0%E0%AF%8D&rlz=1C1CHBF_enIN989IN989&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjzg8Hc5Zv8AhWS9zgGHajbAIgQ_AUoAXoECAEQAw"
                  >
                    (((•))) Go to location
                  </a>
                </h5>
              </div>
              <button
                id="card_bttn"
                onClick={() =>
                  navigate(`/admin_home`, {
                    state: {
                      collection_name: "VELLORE",
                      img_url:
                        "https://firebasestorage.googleapis.com/v0/b/help-web-92738.appspot.com/o/City_Image%2FAll_city_main_Images%2FVellore_main.jpeg?alt=media&token=0a0cf406-c7a2-4397-a54a-4cece47d1646",
                    },
                  })
                }
              >
                Select the city <span id="sp"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Admin_all_city;
