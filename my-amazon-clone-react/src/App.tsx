import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
// import CheckoutPage from './pages/CheckoutPage'; // We will create these later
// import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    // The CartProvider wraps everything, so all pages have access to the cart.
    <CartProvider>
      <BrowserRouter>
        {/* Header is outside Routes, so it appears on every page */}
        <Header />

        <Routes>
          {/* When the URL is "/", show the HomePage component */}
          <Route path="/" element={<HomePage />} />

          {/* Define other pages here later */}
          {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
          {/* <Route path="/orders" element={<OrdersPage />} /> */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;