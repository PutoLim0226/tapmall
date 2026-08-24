import { useState, useEffect } from 'react';

export function AdminDashboard({ setLoggedIn }: { setLoggedIn: (val: boolean) => void }) {
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
