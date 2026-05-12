import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import TrackOrder from "./pages/TrackOrder"
import Account from "./pages/Account"
import { CartProvider } from "./context/CartContext"
import { OrdersProvider } from "./context/OrdersContext"

const App = () => {
  return (
    <OrdersProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/track/:orderId" element={<TrackOrder />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Router>
      </CartProvider>
    </OrdersProvider>
  )
}

export default App