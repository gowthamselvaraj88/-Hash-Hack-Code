import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Level_1 from './Image/Slide-1.png';
import AuthContext from "../Authcontext";
import MenuBar from '../MenuBar';
import CardContent from '@mui/material/CardContent';

const Slide_1 = () => {

  const authContext = useContext(AuthContext);
  const { userDetails } = authContext;
  const [userDetailsLoaded, setUserDetailsLoaded] = useState(false);
  const curlocation = useLocation();

  useEffect(() => {
    console.log('Slide initial hook:: to update the path at userDetails');
    setUserDetailsLoaded(true); // Mark userDetails as loaded
  }, []);

  useEffect(() => {
    console.log('updated user data = ', userDetails);

  }, [userDetails]);

  const findUserIndex = (userName) => {
    return userDetails.findIndex(e => e.userName == userName);
  }

  const fetchUserName = () => { return localStorage.getItem("userName"); }


  useEffect(() => {
    console.log("Slide initial hook:: to update the path at userDetails")
    if (userDetails.length > 0) {
      let userName = fetchUserName();
      console.log("user::fetched from localstoreage", userName);
      console.log("user::fetched from context", userDetails);
      // TODO update the context api based on logged userName
      let userIndex = findUserIndex(userName);
      console.log("userIndex = ", userIndex);
      userDetails[userIndex]['location'] = curlocation.pathname;
      userDetails[userIndex]['userLevel'] = 1;
      userDetails[userIndex]['slideIndex'] = 0; // 0 measns Top ; 100 means End
      console.log("updated userDetails = ", userDetails)
    } else {
      console.log("user::fetched from context else block", userDetails);
    }
    setUserDetailsLoaded(false);
  }, [userDetails, userDetailsLoaded])

  const navigate = useNavigate();
  const gamePage = () => {
    navigate("/Slide_2");
  }
  // =========================================


  // Function to update the slideIndex value for a given userName
  const updateSlideIndex = (userName, newSlideIndex) => {
    const updatedData = userDetails.map(item => {
      if (item.userName === userName) {
        return { ...item, slideIndex: newSlideIndex };
      }
      return item;
    });
    console.log("** updatedData ", updatedData)
    // Return the updated data so that it can be used to update the state
    return updatedData;
  };

  // const [pageScroll, setPageScroll] = useState();
  useEffect(() => {
    const updateScrollPercentage = () => {
      const heightOfWindow = window.innerHeight;
      const contentScrolled = window.pageYOffset;
      const bodyHeight = document.body.offsetHeight;
      console.log("heightOfWindow", heightOfWindow);
      console.log("contentScrolled", contentScrolled);
      console.log("bodyHeight", bodyHeight);
      console.log("");
      if (bodyHeight - contentScrolled <= heightOfWindow) {
        let pageScroll = "100%";
      } else {
        const total = bodyHeight - heightOfWindow;
        const got = contentScrolled;
        const percent = parseInt((got / total) * 100);
        console.log("percent value = ", percent);
        const pageScroll = percent + "%";
        console.log("percentage = ", pageScroll);
        let userName = fetchUserName();
        let userIndex = findUserIndex(userName);
        updateSlideIndex(userName, percent);
        //debugger;
      }
    };

    window.addEventListener("scroll", updateScrollPercentage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", updateScrollPercentage);
    };
  }, []);
  // =========================================
  return (
    <CardContent style={{ textAlign: "center", height: "500px" }} >
      {<MenuBar />}
      <h1 style={{ textAlign: "center" }}>Home Page</h1>
      <div >
        <img style={{ cursor: "pointer" }} src={Level_1} onClick={gamePage} alt='Level1' />
      </div>
    </CardContent>

  )
}
export default Slide_1;
