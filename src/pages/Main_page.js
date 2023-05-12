/* this is First bage for web site*/
import React, { useState } from "react";
import bg_image from "../asset/home_backgrount.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { useNavigate } from 'react-router-dom';
import Login_reg_form from "../components/Login_reg_form";
const Main_page = () => {
  const [open, setOpen] = useState(false);
  if (localStorage.getItem("current_user")) {
    localStorage.removeItem("current_user");
  }
  // const navigate = useNavigate();

  // const navigate_City_page = () => {
  //   navigate('/all_city')
  // }
  const handleModal = () => {
    //ITS IS VIEW THA USER DATA
    setOpen(true);
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
            <a href="javascript:" onClick={() => handleModal()}>
              Login
            </a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>

      <div className="bg-image">
        <img src={bg_image} />
      </div>
      <h1 id="main_page_title">FIND YOUR SMALL NEED!!!</h1>
      <h5>
        This website helps find your all kinds of professions in your near by
        areas finding easy.
      </h5>
      <div id="btt">
        <button className="log-reg" onClick={() => handleModal()}>
          Login/Register
        </button>
        {open && <Login_reg_form setOpen={setOpen} />}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Main_page;
