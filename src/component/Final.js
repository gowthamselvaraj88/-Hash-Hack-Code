import React from 'react'
import Level_2 from './Image/End page.png';
import MenuBar from '../MenuBar';
import CardContent from '@mui/material/CardContent';


const Final = () => {
  
  return (
    <CardContent>
    {<MenuBar />}
    <h2 style={{ textAlign: "center" }}>Game Over</h2>
    <div style={{ textAlign: "center", height: "500px" }}>
      <img style={{ cursor: "pointer" }} src={Level_2}/>
     
    </div>
  </CardContent>
       
  )
};

export default Final;
