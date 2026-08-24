import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function ProductModal({
  isOpen,
  onClose,
  product,
  onAddToCart
}: {
  isOpen: boolean;
  onClose: () => void;
  product: any | null;
  onAddToCart: (productId: string, quantity: number) => void;
}) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when a new product is selected
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}>&times;</button>
        <div className="product-detail-content">
          <div className="product-image">
            <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.name} />
          </div>
          <div className="product-info-panel">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-price">USD {product.price}</div>
            
            <div className="product-description">
              <p>{product.description || t('No description available.')}</p>
            </div>
            
            <div className="product-controls">
              <div className="quantity-selector">
                <span className="label">{t('Quantity')}</span>
                <div className="stepper">
                  <button 
                    disabled={quantity <= 1} 
                    onClick={() => setQuantity(q => q - 1)}
                  >
                    -
                  </button>
                  <input type="text" readOnly value={quantity} />
                  <button 
                    disabled={quantity >= product.stock}
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="stock-info">{product.stock} {t('pieces available')}</span>
              </div>
              
              <div className="action-buttons">
                <button 
                  className="btn-add-cart-large"
                  onClick={() => {
                    onAddToCart(product.id, quantity);
                    onClose();
                  }}
                  disabled={product.stock === 0}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  {t('Add to Cart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
