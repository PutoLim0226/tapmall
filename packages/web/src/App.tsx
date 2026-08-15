import { useState, useEffect } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  
  // Cart state
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Error fetching products:', err));
        
      fetchCart();
    }
  }, [loggedIn]);

  const fetchCart = () => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error('Error fetching cart:', err));
  };

  const handleAuth = () => {
    setLoggedIn(true);
  };

  const addToCart = (productId: string) => {
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 })
    })
      .then(() => {
        fetchCart();
        setIsCartOpen(true);
      })
      .catch(err => console.error('Error adding to cart:', err));
  };

  const removeFromCart = (itemId: string) => {
    fetch(`/api/cart/${itemId}`, { method: 'DELETE' })
      .then(() => fetchCart())
      .catch(err => console.error('Error removing from cart:', err));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (loggedIn) {
    return (
      <div className="home-container">
        <div className="header">
          <h1>Tapmall</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-logout" onClick={() => setIsCartOpen(true)}>
              Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
            <button className="btn-logout" onClick={() => setLoggedIn(false)}>Logout</button>
          </div>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="store-name">{product.store?.name}</div>
                <div className="price-stock">
                  <span className="price">${product.price}</span>
                  <span className="stock">Stock: {product.stock}</span>
                </div>
                <button className="btn-add-cart" onClick={() => addToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />}
        <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button className="btn-close" onClick={() => setIsCartOpen(false)}>&times;</button>
          </div>
          
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.product.imageUrl} alt={item.product.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.product.name}</h4>
                    <div className="item-price">${item.product.price} x {item.quantity}</div>
                    <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="total">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn-checkout">Checkout</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? 'Login to Tapmall' : 'Register for Tapmall'}</h1>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
        )}
        <button className="btn-primary" onClick={handleAuth}>{isLogin ? 'Login' : 'Register'}</button>
        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default App;
