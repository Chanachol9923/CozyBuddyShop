import { createBrowserRouter } from "react-router"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import About from "./pages/About"
import Diy from "./pages/Diy"
import CompleteCheckout from "./pages/CompleteCheckout"


export const router = createBrowserRouter([
  {

    element: <MainLayout />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/cart", element: <Cart /> },
      { path: "/about", element: <About /> },
      { path: "/diy", element: <Diy /> },
      { path: "/complete-checkout", element: <CompleteCheckout /> },

    ],
  },

])
