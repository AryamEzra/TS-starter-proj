import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage'; 
// import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/orders" element={<OrdersPage />} /> */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;