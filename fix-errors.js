const fs = require('fs');

// Fix Header.tsx
let header = fs.readFileSync('packages/web/src/components/Header.tsx', 'utf-8');
header = header.replace('onClick={onMenuClick,\n  onSellerCentreClick}', 'onClick={onMenuClick}');
fs.writeFileSync('packages/web/src/components/Header.tsx', header);

// Fix CurrencyContext.tsx
let currency = fs.readFileSync('packages/web/src/contexts/CurrencyContext.tsx', 'utf-8');
currency = currency.replace("import React, { createContext, useContext, useState, ReactNode } from 'react';", "import { createContext, useContext, useState, type ReactNode } from 'react';");
fs.writeFileSync('packages/web/src/contexts/CurrencyContext.tsx', currency);
