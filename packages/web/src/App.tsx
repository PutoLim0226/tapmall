import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { CartSidebar } from './components/CartSidebar';
import { CategorySidebar } from './components/CategorySidebar';
import { Header } from './components/Header';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const loggedIn = !!token;
  const isAdmin = email === 'admin@tapmall.com';

  useEffect(() => {
    fetch('/api/products' + (selectedCategory ? `?categoryId=${selectedCategory}` : ''))
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, [selectedCategory]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  useEffect(() => {
    if (loggedIn && !isAdmin) {
      fetchCart();
    }
  }, [loggedIn, isAdmin]);

  const fetchCart = () => {
    fetch('/api/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error('Error fetching cart:', err));
  };

  const handleAuthSuccess = (newToken: string, userEmail: string) => {
    setToken(newToken);
    setEmail(userEmail);
    localStorage.setItem('token', newToken);
    localStorage.setItem('email', userEmail);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setToken(null);
    setEmail('');
    setCartItems([]);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
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
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    })
      .then(() => {
        fetchCart();
        setIsCartOpen(true);
      })
      .catch(err => console.error('Error adding to cart:', err));
  };

  const removeFromCart = (itemId: string) => {
    fetch(`/api/cart/${itemId}`, { 
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => fetchCart())
      .catch(err => console.error('Error removing from cart:', err));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loggedIn && isAdmin) {
    return <AdminDashboard setLoggedIn={handleLogout as any} />;
  }

  return (
    <div className="shopee-layout">
      <Header 
        loggedIn={loggedIn}
        email={email}
        cartCount={cartCount}
        onCartClick={handleCartAction}
        onLogout={handleLogout}
        onLoginClick={() => { setIsLoginModal(true); setIsAuthModalOpen(true); }}
        onSignUpClick={() => { setIsLoginModal(false); setIsAuthModalOpen(true); }}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      <main className="main-content">
        <section className="banners-section">
          <div className="main-banner">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80" alt="Main Banner" />
          </div>
          <div className="side-banners">
            <div className="side-banner"><img src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&q=80" alt="Side 1" /></div>
            <div className="side-banner"><img src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=400&q=80" alt="Side 2" /></div>
          </div>
        </section>

        <section className="categories-section">
          <div className="section-title">{t('Categories')}</div>
          <div className="category-grid">
            <div 
              className={`category-item ${selectedCategory === null ? 'active' : ''}`} 
              onClick={() => setSelectedCategory(null)}
            >
              <img src={`https://picsum.photos/seed/all/80/80`} style={{ borderRadius: '50%' }} alt="All" />
              <span>All</span>
            </div>
            {categories.map((cat: any) => (
              <div 
                className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`} 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <img src={`https://picsum.photos/seed/${cat.name}/80/80`} style={{ borderRadius: '50%' }} alt={cat.name} />
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="daily-discover">
          <div className="section-title">{t('Daily Discover')}</div>
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
                    <span className="sales">{product.stock} {t('sold')}</span>
                  </div>
                </div>
                <button className="btn-add-cart-hover" onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}>
                  {t('Add To Cart')}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
      />

      <CategorySidebar 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialIsLogin={isLoginModal}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;
