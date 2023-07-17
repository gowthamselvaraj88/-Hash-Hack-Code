import { createContext } from "react";

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: () => {},
  dataArray: [],
  setDataArray: () => {},
  userDetails: [],
  setUserDetails: () => { },
  location :"",
  setLocation:()=> [],
  userLevel:"",
  setUserLevel:()=>{},
  slideIndex:"",  //  scroll index
  setSlideIndex:()=>{},
  previousPage:"",
  setPreviousPage:()=>{},
  nextPage:"",
  setNextPage:()=>{},
});

export default AuthContext;