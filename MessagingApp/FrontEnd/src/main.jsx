import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Listchat from "./components/Listchat";
import Mainchat from "./components/Mainchat";
import Pinned from "./components/Pinned";
import Addfriend from "./components/Addfriend";


const router = createBrowserRouter([
  {
    path: "/", //Akses melalui base_url
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index:true,
        element: <Login></Login>,
      },
      {
        path: "/register", 
        element: <Register/>,
      }
    ],
  },
  {
    path: "/home", 
    element: <Home/>,
    errorElement: <Error />,
    children: [
      {
        index: true, 
        element: <div className="d-flex row"><Listchat></Listchat><div className="col-9 border">Make a new confersation</div></div>,
      },
      {
        path: "/home/chat/:id", 
        element: <div className="d-flex row"><Listchat></Listchat><Mainchat></Mainchat></div>,
      },
      {
        path: "/home/chat/:id/pinned", 
        element: <div className="d-flex row"><Listchat></Listchat><Pinned></Pinned></div>,
      },
      {
        path: "/home/addfriend", 
        element: <div className="d-flex row"><Listchat></Listchat><Addfriend></Addfriend></div>,
      }
    ]
  }
]);

/**
 * Untuk mengaktifkan router, gunakan RouterProvider dari react-router-dom
 * berikan router pada properti router
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
