const fs = require('fs');
const content = fs.readFileSync('packages/web/src/components/Header.tsx', 'utf-8');
const fixed = content.replace(
`  onMenuClick,
  onSellerCentreClick: () => void;
  onSellerCentreClick?: () => void;`, 
`  onMenuClick: () => void;
  onSellerCentreClick?: () => void;`
);
fs.writeFileSync('packages/web/src/components/Header.tsx', fixed);
