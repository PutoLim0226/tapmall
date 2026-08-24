import { useTranslation } from 'react-i18next';

export function CategorySidebar({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-sidebar category-menu-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>{t('Categories')}</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="menu-items">
          <div 
            className={`menu-item ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => { onSelectCategory(null); onClose(); }}
          >
            All Products
          </div>
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className={`menu-item ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => { onSelectCategory(cat.id); onClose(); }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
