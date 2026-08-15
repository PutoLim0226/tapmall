import { useState, useEffect } from 'react';

// === ADMIN DASHBOARD ===
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
        <h1>Shopee Admin Dashboard</h1>
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

// === MAIN APP ===
function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    if (loggedIn && !isAdmin) {
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
    setIsAuthModalOpen(false);
  };

  const handleCartAction = () => {
    if (!loggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCartOpen(true);
  };

  const addToCart = (productId: string) => {
    if (!loggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
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
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loggedIn && isAdmin) {
    return <AdminDashboard setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className="shopee-layout">
      {/* HEADER */}
      <header className="shopee-header">
        <div className="header-container">
          <div className="top-navbar">
            <div className="nav-links">
              <a href="#">Seller Centre</a>
              <span>|</span>
              <a href="#">Download</a>
              <span>|</span>
              <a href="#">Follow us on</a>
            </div>
            <div className="user-links">
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill="white"/><path d="M8 2.5a4 4 0 0 0-3.5 2.1c.3.1.6.3.8.5A3 3 0 0 1 8 3.5a3 3 0 0 1 2.7 1.6c.2-.2.5-.4.8-.5A4 4 0 0 0 8 2.5z" fill="white"/></svg>
                English
              </span>
              <a href="#">Help</a>
              {loggedIn ? (
                <>
                  <span>Welcome, {email.split('@')[0]}</span>
                  <a onClick={() => { setLoggedIn(false); setIsAdmin(false); setCartItems([]); }}>Logout</a>
                </>
              ) : (
                <>
                  <a onClick={() => { setIsLogin(false); setIsAuthModalOpen(true); }}>Sign Up</a>
                  <span>|</span>
                  <a onClick={() => { setIsLogin(true); setIsAuthModalOpen(true); }}>Login</a>
                </>
              )}
            </div>
          </div>
          <div className="main-header">
            <div className="logo" onClick={() => window.scrollTo(0,0)}>
              <svg viewBox="0 0 256 341" xmlns="http://www.w3.org/2000/svg"><path d="M128 341.333c70.692 0 128-57.308 128-128 0-70.692-57.308-128-128-128S0 142.641 0 213.333c0 70.692 57.308 128 128 128zm0-234.666c58.912 0 106.667 47.755 106.667 106.666S186.912 320 128 320 21.333 272.245 21.333 213.333 69.088 106.667 128 106.667zm-14.933 64c-3.115 0-6.176.62-9.013 1.835-18.005 7.744-24.907 26.987-16.15 44.938.832 1.706 1.888 3.306 3.146 4.757l30.827 35.83-36.63-42.592c-5.77-6.72-5.066-16.714 1.57-22.56 6.303-5.558 15.701-5.11 21.503 1.013l46.155 53.664c11.093 12.896 9.536 32.224-3.467 43.168-12.213 10.272-30.293 9.472-41.525-1.835-3.093-3.115-5.504-6.72-7.072-10.645-3.861-9.675 1.13-20.576 11.147-24.288 8.95-3.328 18.912-.117 24.16 7.744 2.805 4.192 1.483 10.123-2.902 12.96-3.893 2.518-8.992 1.632-11.776-2.027l-5.632 7.702c5.995 8.16 16.203 11.957 26.219 9.75 14.186-3.136 24.128-15.541 24.128-29.984 0-6.187-1.835-12.192-5.248-17.205l-44.502-51.744c-12.021-13.974-10.325-34.923 3.798-46.806 12.394-10.421 30.73-10.421 43.125 0 13.952 11.755 15.915 32.48 4.288 46.592l-4.117 4.79-11.595-13.483c6.048-7.99 4.725-19.467-2.901-25.877-6.528-5.483-16.15-4.885-21.909 1.344-5.323 5.76-5.835 14.474-1.227 20.736l36.566 42.517-30.827-35.83c-1.578-1.834-3.413-3.434-5.461-4.757-11.189-7.146-26.048-6.112-36.256 2.507zM117.333 0h21.333v64h-21.333V0zm25.109 23.36l15.083 15.083-45.248 45.248-15.083-15.083 45.248-45.248zm-28.885 0l-15.083 15.083 45.248 45.248 15.083-15.083-45.248-45.248z"/></svg>
              <span>Tapmall</span>
            </div>
            
            <div className="search-section">
              <div className="search-bar">
                <input type="text" placeholder="Sign up and get 100% off on your first order" />
                <button>
                  <svg height="16" viewBox="0 0 19 19" width="16"><path d="m18.98 17.58-5.31-5.31a8.13 8.13 0 1 0-1.4 1.4l5.31 5.31a1 1 0 0 0 1.4-1.4zM2.08 8.08a6.13 6.13 0 1 1 6.13 6.13 6.14 6.14 0 0 1-6.13-6.13z" fill="#fff"></path></svg>
                </button>
              </div>
              <div className="search-tags">
                <a href="#">Shoes</a>
                <a href="#">Watches</a>
                <a href="#">Bags</a>
                <a href="#">Phones</a>
                <a href="#">Cosmetics</a>
                <a href="#">Laptops</a>
              </div>
            </div>

            <div className="cart-icon" onClick={handleCartAction}>
              <svg viewBox="0 0 26.6 25.6" width="28" height="28"><polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5"></polyline><circle cx="10.7" cy="23" fill="#fff" r="2.2"></circle><circle cx="19.7" cy="23" fill="#fff" r="2.2"></circle></svg>
              {loggedIn && cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="main-content">
        {/* Banner Section */}
        <section className="banners-section">
          <div className="main-banner">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80" alt="Main Banner" />
          </div>
          <div className="side-banners">
            <div className="side-banner"><img src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&q=80" alt="Side 1" /></div>
            <div className="side-banner"><img src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=400&q=80" alt="Side 2" /></div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="section-title">Categories</div>
          <div className="category-grid">
            {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys', 'Motors', 'Groceries', 'Pets', 'Health'].map((cat) => (
              <div className="category-item" key={cat}>
                <img src={`https://picsum.photos/seed/${cat}/80/80`} style={{ borderRadius: '50%' }} alt={cat} />
                <span>{cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Discover Section */}
        <section className="daily-discover">
          <div className="section-title">Daily Discover</div>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card" onClick={() => addToCart(product.id)}>
                <div className="image-wrapper">
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="mall-tag">Mall</div>
                </div>
                <div className="product-info">
                  <div className="name">{product.name}</div>
                  <div className="bottom-row">
                    <span className="price">${product.price}</span>
                    <span className="sales">{product.stock} sold</span>
                  </div>
                </div>
                <button className="btn-add-cart-hover" onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}>
                  Find Similar
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODALS & SIDEBARS */}
      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="btn-close" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png" width="100" />
              <p style={{ marginTop: '20px' }}>Your shopping cart is empty</p>
            </div>
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

      {isAuthModalOpen && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setIsAuthModalOpen(false);
        }}>
          <div className="auth-card" style={{ margin: 0 }}>
            <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Phone number / Username / Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" />
            </div>
            {!isLogin && (
              <div className="form-group">
                <input type="text" placeholder="Name" />
              </div>
            )}
            <button className="btn-primary" onClick={handleAuth}>{isLogin ? 'LOG IN' : 'SIGN UP'}</button>
            <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "New to Tapmall? Sign Up" : "Have an account? Log In"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
