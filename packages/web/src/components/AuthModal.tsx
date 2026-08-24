import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function AuthModal({
  isOpen,
  onClose,
  initialIsLogin,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  initialIsLogin: boolean;
  onSuccess: (token: string, email: string) => void;
}) {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  useEffect(() => setIsLogin(initialIsLogin), [initialIsLogin]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAuth = async () => {
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      onSuccess(data.access_token, email);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="auth-card" style={{ margin: 0 }}>
        <h1>{isLogin ? t('Login') : t('Sign Up')}</h1>
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        <div className="form-group">
          <input 
            type="text" 
            placeholder={t('Email or Phone')} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder={t('Password')} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <input 
              type="text" 
              placeholder={t('Name')} 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <button className="btn-primary" onClick={handleAuth}>
          {isLogin ? t('Login').toUpperCase() : t('Sign Up').toUpperCase()}
        </button>
        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? t('New to Tapmall? Sign Up') : t('Have an account? Log In')}
        </p>
      </div>
    </div>
  );
}
