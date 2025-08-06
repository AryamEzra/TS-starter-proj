import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cartQuantity } = useCart();

  return (
    <div className="bg-gray-900 text-white fixed top-0 left-0 right-0 h-15 flex items-center justify-between px-4 z-50">
      <div className="w-48">
        <Link to="/" className="inline-block p-2 rounded border border-transparent hover:border-white">
          <img className="w-24 mt-1 hidden sm:block" src="images/amazon-logo-white.png" alt="Amazon Logo" />
          <img className="h-9 mt-1 sm:hidden" src="images/amazon-mobile-logo-white.png" alt="Amazon Logo" />
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-4 hidden sm:flex">
        <input 
          className="flex-1 h-9 px-4 rounded-l text-base focus:outline-none focus:ring-2 focus:ring-yellow-400" 
          type="text" 
          placeholder="Search" 
        />
        <button className="bg-yellow-400 w-12 h-9 rounded-r">
          <img className="h-5 ml-1 mt-2" src="images/icons/search-icon.png" alt="Search" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Link className="text-white hover:border-white p-2 rounded border border-transparent" to="/orders">
          <div className="text-xs">Returns</div>
          <div className="text-sm font-bold">& Orders</div>
        </Link>

        <Link className="text-white hover:border-white p-2 rounded border border-transparent flex items-center relative" to="/checkout">
          <img className="w-12" src="images/icons/cart-icon.png" alt="Cart" />
          <div className="text-orange-400 text-base font-bold absolute top-1 left-6 w-6 text-center">
            {cartQuantity}
          </div>
          <div className="text-sm font-bold mt-3">Cart</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;