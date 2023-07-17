import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './component/Login';
import Slide_1 from './component/Slide_1';
import Slide_2 from './component/Slide_2';
import Slide_3 from './component/Slide_3';
import Slide_4 from './component/Slide_4';
import Final from './component/Final';
import AuthProvider from "./AuthProvider";
import AuthContext from "./Authcontext";
import MenuBar from './MenuBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'Slide_1',
    element: <Slide_1 />,
  },
  {
    path: 'Slide_2',
    element: <Slide_2 />,
  }
  ,
  {
    path: 'Slide_3',
    element: <Slide_3 />,
  },
  {
    path: 'Slide_4',
    element: <Slide_4 />,
  },
  {
    path: 'Final',
    element: <Final />,
  }
  ,
  {
    path: 'MenuBar',
    element: <MenuBar />,
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AuthContext.Consumer>
        {() => (
          <>  
         
           
            <RouterProvider router={router}>
              </RouterProvider>
          </> 
        )}
      </AuthContext.Consumer>
    </AuthProvider>    
  </React.StrictMode>
);


