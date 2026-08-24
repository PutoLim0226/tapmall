import { useTranslation } from 'react-i18next';

export function Header({
  loggedIn,
  email,
  cartCount,
  onCartClick,
  onLogout,
  onLoginClick,
  onSignUpClick
}: {
  loggedIn: boolean;
  email: string;
  cartCount: number;
  onCartClick: () => void;
  onLogout: () => void;
  onLoginClick: () => void;
  onSignUpClick: () => void;
}) {
  const { t, i18n } = useTranslation();

  return (
    <header className="shopee-header">
      <div className="header-container">
        <div className="top-navbar">
          <div className="nav-links">
            <a href="#">{t('Seller Centre')}</a>
            <span>|</span>
            <a href="#">{t('Download')}</a>
            <span>|</span>
            <a href="#">{t('Follow us on')}</a>
          </div>
          <div className="user-links">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill="white"/><path d="M8 2.5a4 4 0 0 0-3.5 2.1c.3.1.6.3.8.5A3 3 0 0 1 8 3.5a3 3 0 0 1 2.7 1.6c.2-.2.5-.4.8-.5A4 4 0 0 0 8 2.5z" fill="white"/></svg>
              <select 
                value={i18n.language} 
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
              >
                <option value="en" style={{ color: 'black' }}>English</option>
                <option value="zh-TW" style={{ color: 'black' }}>繁體中文</option>
                <option value="zh-CN" style={{ color: 'black' }}>简体中文</option>
              </select>
            </div>
            <a href="#">{t('Help')}</a>
            {loggedIn ? (
              <>
                <span>{t('Welcome')}, {email.split('@')[0]}</span>
                <a onClick={onLogout}>{t('Logout')}</a>
              </>
            ) : (
              <>
                <a onClick={onSignUpClick}>{t('Sign Up')}</a>
                <span>|</span>
                <a onClick={onLoginClick}>{t('Login')}</a>
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
              <input type="text" placeholder={t('Search Placeholder')} />
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
            </div>
          </div>

          <div className="cart-icon" onClick={onCartClick}>
            <svg viewBox="0 0 26.6 25.6" width="28" height="28"><polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5"></polyline><circle cx="10.7" cy="23" fill="#fff" r="2.2"></circle><circle cx="19.7" cy="23" fill="#fff" r="2.2"></circle></svg>
            {loggedIn && cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}
