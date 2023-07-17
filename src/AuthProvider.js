import React, { createContext, useState } from "react";
import AuthContext from "./Authcontext";

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [location, setLocation] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [slideIndex,setSlideIndex] = useState("");
  const [previousPage,setPreviousPage] = useState("");
  const [nextPage,setNextPage] = useState("");

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        dataArray,
        setDataArray,
        userDetails,
        setUserDetails,
        location,
        setLocation,
        userLevel,
        setUserLevel,
        slideIndex,setSlideIndex,
        previousPage,setPreviousPage,
        nextPage,setNextPage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
