import './App.css'
import "react-toastify/dist/ReactToastify.css"
import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About';
import Book from './components/Book';
import Cart from './components/Cart';
import Cuisine from './components/Cuisine';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Services from './components/Services';
import {ToastContainer} from "react-toastify";
import Success from './components/Success';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/cuisine",
      element: <Cuisine />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/book",
      element: <Book />,
    },
    {
      path: "/cart",
      element:
        <Cart />,
    },
    {
      path: "/success",
      element:
        <Success />,
    },
  ]);


  return (
    <>
      <ToastContainer/>
      <Navbar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
