import { useTranslation } from 'react-i18next';

export function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onRemove,
  onCheckout
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
}) {
  const { t } = useTranslation();
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>{t('Your Cart')}</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png" width="100" alt="Empty Cart" />
              <p style={{ marginTop: '20px' }}>{t('Your shopping cart is empty')}</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.name} className="item-image" />
                <div className="item-details">
                  <h4>{item.product.name}</h4>
                  <div className="item-price">${item.product.price} x {item.quantity}</div>
                  <button className="btn-remove" onClick={() => onRemove(item.id)}>{t('Remove')}</button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total">
              <span>{t('Total')}:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn-checkout" onClick={onCheckout}>{t('Checkout')}</button>
          </div>
        )}
      </div>
    </>
  );
}
