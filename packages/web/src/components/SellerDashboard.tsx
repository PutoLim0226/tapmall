import { useState, useEffect } from 'react';

export function SellerDashboard({ onClose }: { onClose: () => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: ''
  });

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: data[0].id }));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Product uploaded successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          imageUrl: '',
          categoryId: categories.length > 0 ? categories[0].id : ''
        });
      } else {
        alert('Failed to upload product.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to upload product.');
    }
  };

  return (
    <div className="seller-dashboard-container">
      <div className="header">
        <h1>Seller Centre - Upload Product</h1>
        <button onClick={onClose}>Back to Shop</button>
      </div>

      <form onSubmit={handleSubmit} className="seller-form">
        <div className="form-group">
          <label>Product Name</label>
          <input required name="name" value={formData.name} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input required type="number" name="stock" value={formData.stock} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select required name="categoryId" value={formData.categoryId} onChange={handleChange}>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Upload Product
        </button>
      </form>
    </div>
  );
}
