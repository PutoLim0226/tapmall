import { useState, useEffect } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (loggedIn) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Error fetching products:', err));
    }
  }, [loggedIn]);

  const handleAuth = () => {
    // Simulate auth success
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <div className="home-container">
        <div className="header">
          <h1>Tapmall</h1>
          <button className="btn-logout" onClick={() => setLoggedIn(false)}>Logout</button>
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
                <button className="btn-add-cart">Add to Cart</button>
              </div>
            </div>
          ))}
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
