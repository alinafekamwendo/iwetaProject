import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, } from "react-router-dom";
import {  PermIdentity, PostAdd, NotificationsNone, PowerSettingsNewOutlined } from "@material-ui/icons";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import EmailRecovery from "./pages/EmailRecovery";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Production from "./pages/production/Production";
import Forum from "./pages/forum/Forum";
import Choose from "./pages/chooseCategory/Choose";
import Profile from "./pages/Profile"; 
import { AuthContext } from "./helpers/AuthContext";
import Livestock from "./pages/livestock/Livestock";
import SpecificKhola from "./pages/specificKhola/SpecificKhola";
import { useState, useEffect } from "react";
import axios from "axios";
import Nutrition from "./pages/nutrition/Nutrition";
import NewBreed from "./pages/newbreed/NewBreed";
import RegisterLivestock from "./pages/registerLivestock/RegisterLivestock";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { Outlet } from 'react-router-dom';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import R from './image/IMG-20220120-WA0010.png';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateKhola from "./pages/createKhola/CreateKhola";
import UpDateKhola from "./pages/createKhola/UpDateKhola";
import KholaPage from "./pages/KholaPage/KholaPage";
import AboutUs from "./pages/aboutUs/AboutUs";
import Market from "./pages/market/Market";
import Supplier from "./pages/supplierLandingPage/Supplier";
import SupplierMarket from "./pages/supplierMarket/SupplierMarket";
import SupplierProducts from "./pages/supplierProducts/SupplierProducts";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0.7;
  top: 0;
  left: 0.71;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 120,
  bgcolor: 'whitesmoke',
  borderRadius: 5,
 // bgcolor: 'background.paper',
  //border: '2px solid blue',

  margin: 1,
  p: 2,
  px: 4,
  pb: 3,
};


const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

// const AdminLayout = () => (
 
//   <div>
//   <div style={{backgroundColor: "#1C321C", width: "190vh"}}>
//        <div className="inlineNav">
//          <Link to="/supplier">
//          <div><h4>SUPPLIER</h4></div>
//          </Link>
//          <Link to="/supplierProducts">
//          <div><h4>MY PRODUCTS</h4></div>
//          </Link>
//          <Link to="/supplierMarket">
//          <div><h4>MARKET</h4></div>
//          </Link>
         
//        </div>
//        </div>
  
              
//     <Outlet />
//     </div>
// );

// const TopbarLayout = () => (
 
//   <div>
//   <div style={{backgroundColor: "#1C321C", width: "192vh"}}>
//        <div className="inlineNav">
//          <Link to="/">
//          <div><h4>HOME</h4></div>
//          </Link>
//          <Link to="/kholaPage">
//          <div><h4>MY KHOLA</h4></div>
//          </Link>
//          <Link to="/choose">
//          <div><h4>MANAGE</h4></div>
//          </Link>
//          <Link to="/market">
//          <div><h4>MARKET</h4></div>
//          </Link>
//          <Link to="/aboutUs">
//          <div><h4>ABOUT US</h4></div>
//          </Link>
//        </div>
//        </div>
  
              
//     <Outlet />
//     </div>
  
// );

function App() {
  //assigning classes to the method useStyles()
  const classes = useStyles();

   // for the register livestock modal
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

  const [authState, setAuthState] = useState({
    username: "",
    role: "",
    id: 0,
    status: false,
  });

//persist state after refreshing the page
  useEffect(()=> {
  const data = localStorage.getItem('maintain-logged-in-state');
  if(data) {
    setAuthState(JSON.parse(data));
  }
  },[]);

useEffect(()=> {
  localStorage.setItem("maintain-logged-in-state", JSON.stringify(authState));
});

// verify that the user has a valid token and is aunthticated
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/login", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    
  }, []);

//logout function 
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    setAuthState({ username: "", id: 0, status: false });
    handleClose() 
    localStorage.removeItem("listOfKholaNumber");
  };

  const profile = () => {
    handleClose() 
  };
  
  return (
   
    <div className="App">
     
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
      
          <div className="navbar">
          <div className="topbar_main">
            <div className="links">
            {!authState.status ? (
                <> 
                  <Link to="/login"><h2 style={{color:"black"}}> iWeta </h2></Link>
                  
                </>
              ) : (
                <>
                
          <img src={R} alt="livestock pic" style={{ height: "80px", width: "120px"}} className=""/>
                  <Link to="/"> <h2 style={{color: "black"}}> iWeta</h2> </Link>
               
                </>
              )}
            </div>
           
            <div className="loggedInContainer">
            <h3 style={{color: "black", padding: "15px"}}> {authState.username} {authState.role} </h3>
            <></>
            {authState.status && <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">6</span>
                    </div>}
            <></>
            {authState.status && <PermIdentity onClick={handleOpen}  className={classes.root}> </PermIdentity>}
            <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}>
        <Box sx={style}>
        
        <Link to="/login">
      
       <p onClick={logout} className="popup"><PowerSettingsNewOutlined/>Logout</p>
       </Link>
       
      <Link to="/profile">
       <p onClick={profile} className="popup"><PostAdd/>Profile</p>
       </Link>
        
        </Box>
      </StyledModal>

      {/* <h3>{authState.username} </h3> */}
      </div> 
           </div>
          {!authState.status ? (
                <>   
                </>
              ) : (
                <>
            
                <div style={{backgroundColor: "#1C321C"}}>
       <div className="inlineNav">
         <Link to="/">
         <div><h4>HOME</h4></div>
         </Link>
         <Link to="/kholaPage">
         <div><h4>MY KHOLA</h4></div>
         </Link>
         <Link to="/choose">
         <div><h4>MANAGE</h4></div>
         </Link>
         <Link to="/market">
         <div><h4>MARKET</h4></div>
         </Link>
         <Link to="/aboutUs">
         <div><h4>ABOUT US</h4></div>
         </Link>
       </div>
       </div>
  
                </>
              )}
      </div>
      
        
        <div className="container">
       <Routes>
     
          <Route element={<SidebarLayout/>}>
              <Route path="/nutrition" exact element={<Nutrition/>} />
              <Route path="/production/:id" exact element={<Production/>}  />
              <Route path="/forum" exact element={<Forum/>} />
              <Route path="/createpost" exact element={<CreatePost/>} />
              <Route path="/post/:id" exact element={<Post/>}/>
              <Route path="/livestock/:id" exact element={<Livestock/>}/>
              <Route path="/createlivestock" exact element={<RegisterLivestock/>} />
              <Route path="/createbreed" exact element={<NewBreed/>} />
              <Route path="*" exact element={<PageNotFound/>} />
          </Route>
           <Route index element={<Home/>} />
          <Route path="/profile" exact element={<Profile/>} />
          <Route path="/choose" exact element={<Choose/>} />
          <Route path="/market" exact element={<Market/>} />
          <Route path="/kholaPage" exact element={<KholaPage/>} />
          <Route path="/emailRecovery" exact element={<EmailRecovery/>} />
          <Route path="/createKhola" exact element={<CreateKhola/>} />
          <Route path="/aboutUs" exact element={<AboutUs/>} />
          <Route path="/upDateKhola" exact element={<UpDateKhola/>} />
          <Route path="/specificKhola" exact element={<SpecificKhola/>} />
          <Route path="/registration" exact element={<Registration/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/supplier" exact element={<Supplier/>} />
          <Route path="/supplierProducts" exact element={<SupplierProducts/>} />
          <Route path="/supplierMarket" exact element={<SupplierMarket/>} />
       </Routes>
       </div>
        </Router>
      </AuthContext.Provider>
    </div>
   
  );
}

export default App;