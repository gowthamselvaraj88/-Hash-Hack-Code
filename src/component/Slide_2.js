import React, { useState, useContext, useEffect } from 'react'
import Game from './Image/Gaming.png';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button,Container } from '@mui/material';
import Slide_3 from './Slide_3';
import Stack from '@mui/material/Stack';
import AuthContext from "../Authcontext";
import MenuBar from '../MenuBar';
import CardContent from '@mui/material/CardContent';

const Slide_2 = () => {
    
  const authContext = useContext(AuthContext);
  const { userDetails, setUserDetails } = authContext;
  const [userDetailsLoaded, setUserDetailsLoaded] = useState(true);
  const curlocation = useLocation();

  const navigate = useNavigate();

  const Slide_3Page = () => {

    if (userDetails.length > 0) {
        
      let userObj = findUserIndex(fetchUserName());
      let scrollPercentage =  userObj['slideIndex'];
      if(scrollPercentage >=90)
      navigate("/Slide_3");
      else
      alert("Read the content in slide")     
    }
    }

  // useEffect(() => {
  //    //console.log('Slide initial hook:: to update the path at userDetails');
  //   setUserDetailsLoaded(true); // Mark userDetails as loaded
  // }, []);

  useEffect(() => {
     console.log('updated user data = ', userDetails);

  }, [userDetails]);

  const findUserIndex = (userName) => {
    return userDetails.findIndex(e => e.userName == userName);
  }

  const findUser = (userName) => {
    return userDetails.find(e => e.userName == userName);
  }

  const fetchUserName = () => { return localStorage.getItem("userName"); }


  useEffect(() => {
     console.log("Slide initial hook:: to update the path at userDetails")
    if (userDetails.length > 0) {
      let userName = fetchUserName();
       //console.log("user::fetched from localstoreage", userName);
       //console.log("user::fetched from context", userDetails);
      // TODO update the context api based on logged userName
      let userIndex = findUserIndex(userName);
       console.log("userName :: ",userName,"userIndex :: ", userIndex,);
      userDetails[userIndex]['location'] = curlocation.pathname;
      userDetails[userIndex]['userLevel'] = 2;
      userDetails[userIndex]['slideIndex'] = 0; // 0 measns Top ; 100 means End
       console.log("updated userDetails = ", userDetails)
    } else {
       //console.log("user::fetched from context else block", userDetails);
    }
    setUserDetailsLoaded(false);
  }, [userDetailsLoaded]);

    // ==========================================================

    
  // Function to update the slideIndex value for a given userName
const updateSlideIndex = (userName, newSlideIndex) => {
  // const updatedData = userDetails.map(item => {
  //   console.log("if block :: updateSlideIndex",userDetails)
  //   if (item.userName === userName) {
  //     return { ...item, slideIndex1: newSlideIndex };
  //   } else console.log("else block :: updateSlideIndex")
  //   console.log("userDetails item ::",item)
  //   return item;
  // });

  // Now the updatedData array will have the updated slideIndex value
   //console.log("Slide_1 :: updateSlideIndex =  ",updatedData);


   //  new code

   const updatedData = userDetails.map(item => {
    if (item.userName === userName) {
      return { ...item, slideIndex: newSlideIndex };
    }
    return item;
  });
  console.log("** updatedData ",updatedData)
  // Return the updated data so that it can be used to update the state
  return updatedData;
};

  const [pageScroll, setPageScroll] = useState();
  useEffect(() => {
    const updateScrollPercentage = () => {
      const heightOfWindow = window.innerHeight;
      const contentScrolled = window.pageYOffset;
      const bodyHeight = document.body.offsetHeight;
       //console.log("heightOfWindow", heightOfWindow);
       //console.log("contentScrolled", contentScrolled);
       //console.log("bodyHeight", bodyHeight);
       console.log("fetching scroll position");
      if (bodyHeight - contentScrolled <= heightOfWindow) {
        let pageScroll = "100%";
      } else {
        const total = bodyHeight - heightOfWindow;
        const got = contentScrolled;
        const percent = parseInt((got / total) * 100);
         //console.log("percent value = ", percent);
        const pageScroll = percent + "%";
         console.log("percentage = ", pageScroll);
        let userName = fetchUserName();
        let userIndex = findUserIndex(userName);
        console.log("calling :: updateSlideIndex :: userName :: ",userName,"userIndex :: ", userIndex,"percent :: ",percent)
        //let result = updateSlideIndex(userName, percent);
        setUserDetails(updateSlideIndex(userName, percent));
        //console.log("result :: ",result)
        //debugger;
      }
    };

    window.addEventListener("scroll", updateScrollPercentage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", updateScrollPercentage);
    };
  }, []);



  return (
     <CardContent>
    {<MenuBar />}
    <h2 style={{ textAlign: "center" }}>Game Page</h2>
    <div style={{ textAlign: "center", height: "500px" }}>
      <img style={{ cursor: "pointer" }} src={Game}/>
      <p style={{ display: "flex", justifyContent: "space-between" }} >
      <Button variant="contained" disabled >Back</Button>
      <Button onClick={Slide_3Page} variant="contained" >Next</Button> 
      </p>
    </div>
  </CardContent>
    
     
    
     
    
  )
};
// export default withStyles(withStyles)(EventItem);
export default Slide_2;
