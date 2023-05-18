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
} from "semantic-ui-react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
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
import Delete_alert from "../components/Delete_alert";
import "react-toastify/dist/ReactToastify.css";
const Admin_home = () => {
  const [users, setUsers] = useState([]); //SET DATA
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  var [search, setSearch] = useState("");
  const location = useLocation(); //get VALE FOR PREVASE PAGE
  var collection_value = location.state.collection_name; //COLLECTION NAME
  var individual_img_url = location.state.img_url; //IMAGE URL NAME
  //WRITE QUERY FOR REACTRIVE IMAGE
  const usersCollectionRef = query(
    collection(db, collection_value),
    orderBy("area_name_english", "asc")
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
        var check_is_empty = `No [${collection_value}] area has been added yet.`;
        document.getElementById("area_page_heading").innerHTML = check_is_empty;
        document.getElementById("area_page_heading").style.color = "red";
        document.getElementById("no_there").style.display = "none";
      }

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

  if (!loading) {
    //LOADE DATA PROGRESS
    return <Loader1 />; //THIS DESIGN IS OTHER PAGE JUST CALL HEAR
  }
  // const handleModal = (item) => {//ITS IS VIEW THA USER DATA
  //   setOpen(true);
  //   setUser(item);
  // }
  const handleDelet = async (id) => {
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
        //setUser(users.filter((user)=>user.id==id));
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
          bolg.area_name_english
            .toLowerCase()
            .includes(search1.toLowerCase()) ||
          bolg.area_name_tamil.toLowerCase().includes(search1.toLowerCase())
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

    const usersCollectionRef = query(
      collection(db, collection_value),
      orderBy("area_name_english", "asc")
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
  const Go_path_localstorage = () => {
    var store = localStorage.getItem("my_area");

    if (store === null) {
      toast.error("Sorry must select your area!!!", {
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
          <Button
            className="bbb"
            size="mini"
            id="btten"
            primary
            onClick={() =>
              navigate("/add_new_area", {
                state: {
                  collection_name: collection_value,
                  img_url: individual_img_url,
                },
              })
            }
          >
            +Add more area
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
            <a href="javascript:" onClick={() => navigate("/new_registration")}>
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
      <img
        src={individual_img_url}
        style={{
          width: "97%",
          height: "460px",
          marginTop: "1%",
        }}
        alt={location.state.collection_name}
      ></img>
      <h1>{collection_value}</h1>
      <Container>
        <h1 id="area_page_heading">Select your area!</h1>
        <Grid columns={3} stackable>
          {users.map((item) => {
            return (
              <div className="containear1">
                <div className="content1">
                  <i
                    className="fas fa-edit"
                    id="edit_icon"
                    onClick={() =>
                      navigate("/update_area", {
                        state: {
                          collection_name: collection_value,
                          img_url: individual_img_url,
                          id: item.id,
                        },
                      })
                    }
                  ></i>
                  <i
                    className="fas fa-light fa-trash"
                    id="delete_icon"
                    onClick={() => handleDelet(item.id)}
                  ></i>
                  {open && (
                    <Delete_alert
                      open={open}
                      setOpen={setOpen}
                      handleDelet={handleDelet}
                    />
                  )}
                  <div className="card" htmlFor="check">
                    <div className="card-content">
                      <h1 id="city_tamil" title={item.area_name_tamil}>
                        {item.area_name_tamil}
                      </h1>
                      <div className="image">
                        <img
                          src={item.img}
                          alt=""
                          title={item.area_name_english}
                        />
                      </div>
                      <h1 id="city_english" title={item.area_name_english}>
                        {item.area_name_english.toLocaleUpperCase()}
                      </h1>
                      <h5 id="map">
                        <a
                          href={item.location}
                          target="_blank"
                          title={item.location}
                        >
                          (((•))) Go to location
                        </a>
                      </h5>
                    </div>
                    <button
                      id="card_bttn"
                      onClick={() =>
                        navigate("/admin_all_worker", {
                          state: {
                            subcollection_id: item.id,
                            collection_name: collection_value,
                            area_imgurl: item.img,
                            area_name_english: item.area_name_english,
                            area_name_tamil: item.area_name_tamil,
                            area_location: item.location,
                          },
                        })
                      }
                    >
                      Select the area<span id="sp"></span>
                    </button>
                  </div>
                </div>
                <p id="invisable_fun"></p>
              </div>
            );
          })}
        </Grid>
        <h1 id="no_there">
          Place ask me if your area is not available.{" "}
          <a href="/new_registration" id="area_not_there">
            Click here
          </a>
        </h1>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default Admin_home;
