import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import './App.css';
import Admi_all_city from './Admin_pages/Admin_all_city';
import Admin_home from './Admin_pages/Admin_home';
import Admin_All_worker from './Admin_pages/Admin_All_Wokers';
import Admin_All_professions_show from './Admin_pages/Admin_All_professions_show';
import Main_page from './pages/Main_page';
import All_city_page from './pages/All_city_page';
import Input_for_area from './pages/Input_for_area';
import Home from './pages/Home';
import Input_for_work_type from './pages/Input_for_work_type';
import Add_professions from './pages/Add_professions';
import All_profesion_show from './pages/All_professions_show';
import Verification_id from './pages/Verification_id';
import All_Kind_of_work from './pages/All_kind_of_work'
import Information from './pages/Information'
import New_registration from './pages/New_registration';
import Area_about_box from './components/Area_about_box';
function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
    
           <Routes>
            {/*Admain page*/}
            <Route path='/admin_all_city' element={<Admi_all_city/>}/>
            <Route path='/admin_home' element={<Admin_home/>}/>
            <Route path='/admin_all_worker' element={<Admin_All_worker/>}/>
            <Route path='/admin_all_professions_show' element={<Admin_All_professions_show/>}/>
            {/* page1*/}
           <Route path='/' element={<Main_page/>}/>
           {/* page2*/}
           <Route path='/all_city' element={<All_city_page/>}/> 
           {/* page3*/}
           <Route path='/all_area'element={<Home/>}/>
           {/*add_new_area*/}
           <Route path='/add_new_area' element={<Input_for_area/>}/>
           {/*update_area*/}
        <Route path='/update_area' element={<Input_for_area/>}/>
        {/*all_kind_work*/}
        <Route path='/w' element={<All_Kind_of_work/>}/>
        <Route path='/input_for_work_type' element={<Input_for_work_type/>}/>
        <Route path='/add_p' element={<Add_professions/>}/>
        <Route path='/show_p' element={<All_profesion_show/>}/>
        <Route path='/info' element={<Information/>}/>
        <Route path='/new_registration' element={<New_registration/>}/>
        <Route path='/a' element={<Area_about_box/>}/>
        <Route path='/Verificationid2FAtxNEstK1qemk1xgoZrU' element={<Verification_id/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    
  );
}
////<NavBar/> using below div it visable all page
export default App;
