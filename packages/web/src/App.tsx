import { useState, useEffect } from 'react';

function AdminDashboard({ setLoggedIn }: { setLoggedIn: (val: boolean) => void }) {
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Tapmall Admin Dashboard</h1>
        <button className="btn-logout" onClick={() => setLoggedIn(false)}>Logout</button>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="value">{stats.totalUsers}</div>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className="value">{stats.totalProducts}</div>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <div className="value">{stats.totalOrders}</div>
        </div>
      </div>

      <div className="table-container">
        <h2>Recent Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id.substring(0, 8)}...</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [email, setEmail] = useState('');
  
  const [products, setProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (loggedIn && !isAdmin) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Error fetching products:', err));
        
      fetchCart();
    }
  }, [loggedIn, isAdmin]);

  const fetchCart = () => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error('Error fetching cart:', err));
  };

  const handleAuth = () => {
    if (email === 'admin@tapmall.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
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
    if (isAdmin) {
      return <AdminDashboard setLoggedIn={setLoggedIn} />;
    }

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
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
