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
import img1 from "../asset/All_workers.jpeg";
import { toast, ToastContainer } from "react-toastify";
import "../pages/All_kind_of_work.css";
import "react-toastify/dist/ReactToastify.css";
import Area_about_box from "../components/Area_about_box";
const All_Kind_of_work = () => {
  const [users, setUsers] = useState([]); //SET DATA
  const [open, setOpen] = useState(false);
  const [open_about, setOpen_about] = useState(false);
  const [user, setUser] = useState({});
  var [search, setSearch] = useState("");
  const location = useLocation(); //get VALE FOR PREVASE PAGE
  const collection_value = location.state.collection_name; //COLLECTION NAME
  const get_area_imageurl = location.state.area_imgurl; //COLLECTION NAME
  const get_area_name_english = location.state.area_name_english;
  const get_area_name_tamil = location.state.area_name_tamil;
  const get_area_location = location.state.area_location;
  var count = location.state.count;
  if (count == 1) {
    var get_subcollection_id = location.state.subcollection_id;
    count = 0;
  } else {
    var get_subcollection_id =
      collection_value +
      "/" +
      location.state.subcollection_id +
      "/" +
      `All_workers${collection_value}`; //SUBCOLLECTION ID
  }
  const get_about_area =
    collection_value +
    "/" +
    location.state.subcollection_id +
    "/" +
    `All_workers${collection_value}` +
    "about_area"; //ABOUT AREA ID
  //var get_subcollection_id = location.state.subcollection_id;//SUBCOLLECTION ID

  //WRITE QUERY FOR REACTRIVE IMAGE
  const usersCollectionRef = collection(db, get_subcollection_id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // var city_img=useParams();////OTHER TYPE FOR GET VALUE FOR PREVASE PAGE!
  if (!localStorage.getItem("current_user")) {
    navigate("/");
  }

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
  const handleModal = () => {
    //ITS IS VIEW THA USER DATA
    setOpen_about(true);
  };
  /*
  const handleDelet = async (id) => {
    if(id!==null){
      localStorage.setItem('delete_id',id);
      setOpen(true);
     }
     const get_delete_id=localStorage.getItem('delete_id');   
    
    <Loader1 />
    if (id===null) {
      setOpen(false);
      try {
        
        await deleteDoc(doc(db, get_subcollection_id, get_delete_id));//DELETE THA DATA
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
        localStorage.removeItem('delete_id');
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
  }
*/
  const Search_fun = async (e, searc) => {
    ///THIS IS A SEARCH VALUE FUNCTION
    var search1 = searc;
    e.preventDefault();
    setUsers(
      users.filter(
        (bolg) =>
          bolg.work_type_english
            .toLowerCase()
            .includes(search1.toLowerCase()) ||
          bolg.work_type_tamil.toLowerCase().includes(search1.toLowerCase())
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

    const usersCollectionRef = collection(db, get_subcollection_id);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    document.getElementById("search_input").value = "";
    document.getElementById("i").style.display = "none";
    document.getElementById("area_page_heading").innerHTML =
      "Find your nearby areas!";
    document.getElementById("area_page_heading").style.color = "black";
    setSearch("");
  };
  const check_myarea_clicked = () => {
    if (get_subcollection_id === localStorage.getItem("my_area")) {
      document.getElementById("my_area").style.textDecoration = "line-through";
      document.getElementById("my_area").style.color = "red";
      document.getElementById("my_area").innerHTML = `it's your area!`;
    } else {
      document.getElementById("my_area").style.textDecoration = "";
      document.getElementById("my_area").style.color = "";
    }
  };
  setTimeout(check_myarea_clicked, 0);
  const Add_path_localstorage = () => {
    let storage = localStorage.getItem("my_area");
    if (get_subcollection_id === storage) {
      toast.error("Double click to remove...!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      localStorage.setItem("my_area", get_subcollection_id);
      document.getElementById("my_area").style.textDecoration = "line-through";
      document.getElementById("my_area").style.color = "red";
      document.getElementById("my_area").innerHTML = `it's your area!`;
    }
  };
  const Remove_path_localstorage = () => {
    localStorage.removeItem("my_area");

    toast.success("Remove sucessfully...", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    document.getElementById("my_area").style.textDecoration = "none";
    document.getElementById("my_area").style.color = "";
    document.getElementById("my_area").innerHTML = `Click to add area`;
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
            <a href="/all_city">Back</a>
          </li>
          <li>
            <a
              id="my_area"
              title="You can choose only one location!"
              href="javascript:"
              onDoubleClick={() => Remove_path_localstorage()}
              onClick={() => Add_path_localstorage()}
            >
              Click to add area
            </a>
          </li>
          <li>
            <a href="javascript:" onClick={() => navigate("/new_registration")}>
              Register
            </a>
          </li>
          <li>
            <a href="javascript:" onClick={() => handleModal()}>
              About
            </a>
          </li>
          {open_about && (
            <Area_about_box
              setOpen_about={setOpen_about}
              get_about_area={get_about_area}
              area_image={get_area_imageurl}
              get_area_name_english={get_area_name_english}
              get_area_name_tamil={get_area_name_tamil}
              get_area_location={get_area_location}
            />
          )}
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
        src={img1}
        style={{
          width: "97%",
          height: "410px",
          marginTop: "1%",
        }}
        alt={collection_value + "image"}
      ></img>
      <h1>{collection_value}</h1>
      <Container>
        <h1 id="area_page_heading">See all professions in your area!</h1>
        <Grid columns={3} stackable>
          {users?.map((item) => {
            return (
              <div className="containear1">
                <div className="content1">
                  <div className="card1" htmlFor="check">
                    <div className="card-content">
                      <h1 id="city_tamil" title={item.work_type_tamil}>
                        {item.work_type_tamil}
                      </h1>
                      <div className="image">
                        <img src={item.img} alt="" />
                      </div>
                      <h1 id="city_english" title={item.work_type_english}>
                        {item.work_type_english.toLocaleUpperCase()}
                      </h1>

                      <h5 id="bellow-english">
                        Find all the'
                        <span id="eng">{item.work_type_english}</span>'in your
                        <br /> area!
                      </h5>
                    </div>
                    <button
                      id="card_bttn"
                      onClick={() =>
                        navigate(`/show_p`, {
                          state: {
                            subcollection_id:
                              get_subcollection_id +
                              "/" +
                              item.id +
                              "/" +
                              item.id,
                            img_url: item.img,
                            collection_name: collection_value,
                            work_type_english: item.work_type_english,
                          },
                        })
                      }
                    >
                      Select the professions<span id="sp"></span>
                    </button>
                  </div>
                </div>
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

export default All_Kind_of_work;
