import {Routes,Route} from 'react-router'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import About from './pages/About'
import Diy from './pages/Diy'
import MainLayout from './layouts/MainLayout'

export default function App() {
  return (
    <Routes>
      {/* หน้าที่อยู่ใน MainLayout จะมี navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/product/:id"element={<Product />} />
      <Route path="/diy" element={<Diy />} />
    </Routes>
  )
}
