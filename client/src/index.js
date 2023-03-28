import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './pages/Home';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Setting from './pages/Setting';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "posts",
        element: <Posts />
      },
      {
        path: "create",
        element: <CreatePost />
      },
      {
        path: "post/:postId",
        element: <Post />
      },
      {
        path: "setting",
        element: <Setting />
      }
    ],
    errorElement: <h1 className='text-center text-light'>404 not found :(</h1>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);