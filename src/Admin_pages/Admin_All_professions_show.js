import "../pages/All_professions_show.css";
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
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import Loader1 from "../components/Loader1";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delete_alert from "../components/Delete_alert";
const Admin_All_professions_show = () => {
  const [users, setUsers] = useState([]); //SET DATA
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  var [search, setSearch] = useState("");
  // {work_type_english}=useParams();
  const location = useLocation(); //get VALE FOR PREVASE PAGE
  var collection_value = location.state.subcollection_id; //COLLECTION NAME
  var Professions_img_url = location.state.img_url; //IMAGE URL NAME
  var collection_name = location.state.collection_name; //IMAGE URL NAME
  //WRITE QUERY FOR REACTRIVE IMAGE
  const usersCollectionRef = query(
    collection(db, collection_value),
    orderBy("w_experience", "desc")
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // var city_img=useParams();////OTHER TYPE FOR GET VALUE FOR PREVASE PAGE!

  useEffect(() => {
    //THIS FUNCTION LOAD DATA FOR THIS PAGE
    setLoading(true);
    var getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      if (data.empty) {
        //CHECK COLLECTION EMPTY ARE NOT
        var check_is_empty = `No data item has been added yet.`;
        document.getElementById("area_page_heading").innerHTML = check_is_empty;
        document.getElementById("area_page_heading").style.color = "red";
        document.getElementById("area_page_heading_sub_heading").style.display =
          "none";
      }

      setUsers(
        data.docs.map((doc) => ({
          //OFTER CHECKING SET THA ALL DATA.
          ...doc.data(),
          id: doc.id,
        })),
        console.log("")
      );
    };
    getUsers();
  }, []);

  if (!loading) {
    //LOADE DATA PROGRESS
    return <Loader1 />; //THIS DESIGN IS OTHER PAGE JUST CALL HEAR
  }
  // var item_id='';
  const handleModal = (id) => {
    //ITS IS VIEW THA USER DATA
    setOpen(true);
    open = id;
    //setUser(item);
  };
  const handleDelet = async (id) => {
    //const store=id;
    // id=id ?? store;//defuld parameter
    if (id !== null) {
      localStorage.setItem("delete_id", id);
      setOpen(true);
    }
    const get_delete_id = localStorage.getItem("delete_id");
    <Loader1 />;
    if (id === null) {
      setOpen(false);
      try {
        await deleteDoc(doc(db, collection_value, get_delete_id)); //DELETE THA DATA
        toast.success("Deletetd successfull", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.removeItem("delete_id");
        window.location.reload();
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
  };

  const Search_fun = async (e, searc) => {
    ///THIS IS A SEARCH VALUE FUNCTION
    var search1 = searc;
    e.preventDefault();
    setUsers(
      users.filter(
        (bolg) =>
          bolg.w_name.toLowerCase()?.includes(search1.toLowerCase()) ||
          bolg.w_adderss?.toLowerCase().includes(search1.toLowerCase())
      )
    );

    //if(search1.includes(use))

    document.querySelector("section").scrollTop = 500; //CALL THA FUN PAGE SCROLLTOP
    document.getElementById(
      "area_page_heading"
    ).innerHTML = `The final result of the search. "${search1}"`;
    document.getElementById("area_page_heading").style.color = "green";
    //UASE REMOVE THA VALUE FOR SEARCH_INPUT

    if (search1 == "") {
      Handle_restore();
      document.getElementById("area_page_heading").innerHTML =
        "Find your nearby areas!";
      document.getElementById("area_page_heading").style.color = "black";
    } else {
      document.getElementById("i").style.display = "inline-flex";
    }
  };

  const Handle_restore = async () => {
    //USER CLICK CLOSE BUTTON THEN RETURN NARNAL STATE
    document.querySelector("section").scrollTop = 500; //CALL THA FUN PAGE SCROLLTOP
    const usersCollectionRef = query(
      collection(db, collection_value),
      orderBy("w_experience", "desc")
    );
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    document.getElementById("search_input").value = "";
    document.getElementById("i").style.display = "none";
    document.getElementById("area_page_heading").innerHTML =
      "Find your nearby areas!";
    document.getElementById("area_page_heading").style.color = "black";
    setSearch("");
  };
  var Call_person = () => {
    document.getElementById("call_person").click();
    document.getElementsByClassName("checked5").style.display = "none";
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
  //<i className="fas fa-solid fa-thumbtack" id='pin' onClick={()=>Store_local_storage(item)}></i>
  var count = 1;
  var bar_hide = () => {
    if (count == 1) {
      document.getElementById("hidden_body").style.display = "none";
      count = 2;
    } else {
      document.getElementById("hidden_body").style.display = "block";
      count = 1;
    }
  };
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
          <Button
            className="bbb"
            size="mini"
            id="btten"
            primary
            onClick={() =>
              navigate("/add_p", {
                state: {
                  subcollection_id: collection_value,
                  img_url: Professions_img_url,
                  collection_name: collection_name,
                  work_type_english: location.state.work_type_english,
                },
              })
            }
          >
            +Add professions
          </Button>

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
            <a href="#" onClick={() => navigate("/new_registration")}>
              Register
            </a>
          </li>
          <li>
            <a href="/">Logout</a>
          </li>
          <form
            onSubmit={(e) => {
              Search_fun(e);
            }}
          >
            <input
              type="text"
              id="search_input"
              onChange={(e) => {
                Search_fun(e, e.target.value);
              }}
              className="searchTerm"
              placeholder="Search..."
            />
            <button type="submit" className="searchButton">
              <i className="fa fa-search"></i>
            </button>
            <i
              id="i"
              className="fas fa-times"
              onClick={() => Handle_restore()}
            ></i>
          </form>
        </ul>
      </nav>
      <div id="hidden_body">
        <img
          src={Professions_img_url}
          style={{
            width: "97%",
            height: "460px",
            marginTop: "1%",
            filter: "brightness(100%)",
          }}
          alt=""
        ></img>
        <h1 id="area_page_heading">
          FIND YOUR NEARBY {location.state.work_type_english}
        </h1>
        <h5 id="area_page_heading_sub_heading">
          All occupations are clearly verified and uploaded on the website.
        </h5>
        {users.map((item) => {
          var get_worker_star = item.w_star_rading;

          //console.log(item.five_stars.four_star)

          //console.log(item.w_star_rading)
          return (
            <div id="con">
              <div className="courses-container">
                <div className="course">
                  <div className="course-preview">
                    <div className="worker_image">
                      <img src={item.img} alt="" />
                    </div>
                  </div>

                  <div className="course-info">
                    <div>
                      <div className="progress-container">
                        <p id="w_dob">
                          <span>
                            <i className="fas fa-calendar-check"></i>
                          </span>{" "}
                          {item.w_dob}
                        </p>
                        <br id="br_for_star" />
                        <br />
                        {parseFloat(get_worker_star) === 0 ? (
                          <>
                            <span
                              id="span"
                              className="fa fa-star checked1"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked2"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked3"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked4"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked5"
                            ></span>
                          </>
                        ) : (
                          console.log("")
                        )}
                        {parseFloat(get_worker_star) > 0 &&
                        parseFloat(get_worker_star) <= 1.5 ? (
                          <>
                            <span
                              id="span1"
                              className="fa fa-star checked1"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked2"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked3"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked4"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked5"
                            ></span>
                          </>
                        ) : (
                          console.log("")
                        )}
                        {parseFloat(get_worker_star) > 1.5 &&
                        parseFloat(get_worker_star) <= 2.5 ? (
                          <>
                            <span
                              id="span1"
                              className="fa fa-star checked1"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked2"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked3"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked4"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked5"
                            ></span>
                          </>
                        ) : (
                          console.log("")
                        )}
                        {parseFloat(get_worker_star) > 2.5 &&
                        parseFloat(get_worker_star) <= 3.5 ? (
                          <>
                            <span
                              id="span1"
                              className="fa fa-star checked1"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked2"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked3"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked4"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked5"
                            ></span>
                          </>
                        ) : (
                          console.log("")
                        )}
                        {parseFloat(get_worker_star) > 3.5 &&
                        parseFloat(get_worker_star) <= 4.5 ? (
                          <>
                            <span
                              id="span1"
                              className="fa fa-star checked1"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked2"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked3"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked4"
                            ></span>
                            <span
                              id="span"
                              className="fa fa-star checked5"
                            ></span>
                          </>
                        ) : (
                          console.log("")
                        )}
                        {parseFloat(get_worker_star) >= 4.6 ? (
                          <>
                            <span
                              id="span1"
                              className="fa fa-star checked1"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked2"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked3"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked4"
                            ></span>
                            <span
                              id="span1"
                              className="fa fa-star checked5"
                            ></span>
                          </>
                        ) : (
                          console.log("")
                        )}
                        <br />
                        <span className="proggress-text">
                          Star rating :{item.w_star_rading}
                          <span id="star">★</span>.
                          <span id="total_count_star">
                            {item.five_stars.one_star +
                              item.five_stars.two_star +
                              item.five_stars.three_star +
                              item.five_stars.four_star +
                              item.five_stars.five_star}
                          </span>
                        </span>
                      </div>
                    </div>
                    <h1 id="w_name" title={item.w_name}>
                      {item.w_name.toUpperCase()}
                    </h1>
                    <div id="align">
                      <h2>
                        <span id="h6">Place : </span>
                        <a
                          id="w_place"
                          target="_blank"
                          href={item.w_location}
                          title={item.w_address}
                        >
                          {item.w_address.toUpperCase()}
                        </a>
                      </h2>

                      <br className="br" />
                      <br />
                      <h2 id="o" title={item.Professions}>
                        <span id="h6">Professions : </span>
                        {item.Professions.toUpperCase()}
                      </h2>
                      <br />
                      <br id="br" />
                      <h2>
                        <span id="h6">Experience : </span>
                        {item.w_experience} years
                      </h2>
                    </div>

                    <button
                      className="btn"
                      onClick={() =>
                        navigate("/info", {
                          state: {
                            subcollection_id: collection_value,
                            id: item.id,
                            w_name: item.w_name,
                            w_Gender: item.w_Gender,
                            w_email: item.w_email,
                            w_phone: item.w_phone,
                            Professions: item.Professions,
                            w_experience: Number(item.w_experience),
                            w_dob: item.w_dob,
                            w_address: item.w_address,
                            w_location: item.w_location,
                            w_img: item.img,
                            w_star_rading: parseFloat(item.w_star_rading),
                            item,
                            one_star: item.five_stars.one_star,
                            two_star: item.five_stars.two_star,
                            three_star: item.five_stars.three_star,
                            four_star: item.five_stars.four_star,
                            five_star: item.five_stars.five_star,
                            Instagram: item.Instagram,
                            Facebook: item.Facebook,
                            Twitter: item.Twitter,
                            item: item,
                          },
                        })
                      }
                    >
                      Viwe All
                    </button>
                    <a
                      id="call_person"
                      href={`tel:${item.w_phone}`}
                      target="_blank"
                    ></a>
                    <button className="btn_call" onClick={() => Call_person()}>
                      CALL
                    </button>
                  </div>
                </div>
              </div>
              <i
                className="fas fa-edit didable_e_d"
                id="edit_icon_for_worker"
                onClick={() =>
                  navigate("/add_p", {
                    state: {
                      subcollection_id: collection_value,
                      img_url: Professions_img_url,
                      collection_name: collection_name,
                      id: item.id,
                    },
                  })
                }
              ></i>
              <i
                className="fas fa-light fa-trash didable_e_d"
                id="delete_icon_for_worker"
                onClick={() => handleDelet(item.id)}
              ></i>
              {open && (
                <Delete_alert
                  open={open}
                  setOpen={setOpen}
                  handleDelet={handleDelet}
                />
              )}

              <p id="invisable_fun"></p>
            </div>
          );
        })}

        <h1 id="no_there">
          Place ask me if Professions is not available.{" "}
          <a href="/new_registration" id="area_not_there">
            Click here
          </a>
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Admin_All_professions_show;
