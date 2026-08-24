const fs = require('fs');
let content = fs.readFileSync('packages/web/src/App.tsx', 'utf-8');
content = content.replace(
  `  if (loggedIn && email === 'admin@tapmall.com') {
    return <AdminDashboard setLoggedIn={handleLogout as any} />;
  }`,
  `  if (loggedIn && email === 'admin@tapmall.com') {
    return <AdminDashboard setLoggedIn={handleLogout as any} />;
  }

  if (loggedIn && showSellerDashboard) {
    return <SellerDashboard onClose={() => setShowSellerDashboard(false)} />;
  }`
);
content = content.replace(
  `onMenuClick={() => setIsMenuOpen(true)}`,
  `onMenuClick={() => setIsMenuOpen(true)}
        onSellerCentreClick={() => setShowSellerDashboard(true)}`
);
fs.writeFileSync('packages/web/src/App.tsx', content);
