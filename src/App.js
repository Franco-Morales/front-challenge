import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";

// Components
import Navbar from "./Components/Navbar";

// Pages
import HomeContainer from "./Pages/Home/HomeCont";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Singup";
import DashboardContainer from "./Pages/Dashboard/DashboardCont";
import GameFormContainer from "./Pages/Dashboard/PageForm/GameFormCont";
import Error404 from "./Pages/Error404/Error404";

// Context
import AuthContextProvider from "./Context/authContext";

//Guard
import AuthGuard from "./Guards/AuthGuard";


function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={ <HomeContainer /> }/>
          <Route path="/login" element={ <Login /> }/>
          <Route path="/signup" element={ <Signup />}/>
          <Route path="/dashboard" element={ 
              <AuthGuard>
                <DashboardContainer />
              </AuthGuard>
            }
          />
          <Route path="/dashboard/new" element={
              <AuthGuard>
                <GameFormContainer />
              </AuthGuard>
            }
          />
          <Route path="/dashboard/update/:gameId" element={
              <AuthGuard>
                <GameFormContainer />
              </AuthGuard>
            }
          />
          <Route path="*" element={ <Error404 /> } />
        </Routes>
      </AuthContextProvider>
      <ToastContainer pauseOnHover hideProgressBar autoClose={1500} />
    </Router>
  );
}


export default App;