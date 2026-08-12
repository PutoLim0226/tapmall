# 專案產品需求文件 (PRD) - Tapmall 跨境電商平台

## 1. 專案概述 (Project Overview)
本專案旨在打造一個類似 Shopee / 淘寶 的跨境電商平台，支援多賣家進駐 (B2B2C 模式)，並具備多國語系與多幣別的跨境基礎能力。專案初期專注於 Web 網頁端開發，未來將無縫擴展至 iOS 與 Android 行動裝置 App。

## 2. 核心技術選型 (Tech Stack)
- **架構設計**: Monorepo (Yarn Workspaces)，前後端及未來 App 皆置於同一倉儲，便於共享 TypeScript 型別與共用邏輯。
- **前端 Web**: React + Vite (使用 TypeScript)
- **前端樣式**: Vanilla SCSS (自建 Design System，嚴禁 inline-css，無 Tailwind)
- **未來行動端 App**: React Native (Expo)
- **後端 API**: Node.js + NestJS (使用 TypeScript)
- **資料庫**: PostgreSQL (適合處理電商複雜且關聯性高的交易與庫存資料)

## 3. 核心商業模式與 MVP 功能 (Core Business & MVP Features)
### 3.1 商業模式 (B2B2C 多商家進駐)
- **買家端 (C端)**: 瀏覽商品、加入購物車、多國語系結帳、訂單追蹤、會員中心。
- **賣家端 (B端)**: 賣家中心 (Dashboard)、商品上架與庫存管理、訂單處理、店鋪設定。
- **平台管理端 (Admin)**: 審核賣家、平台金流與手續費抽成管理、會員權限管理。

### 3.2 跨境電商基礎 (Cross-border Capabilities)
- **多語系 (i18n)**: 前端介面支援多國語言切換。
- **多幣別顯示**: 根據使用者偏好，動態換算商品價格並顯示在地幣別。
- **結帳金流 (MVP)**: 結帳時統一轉換為「單一基礎幣別」(如 USD/TWD) 進行扣款，降低初期跨國匯差與當地金流串接複雜度。

### 3.3 會員與驗證系統 (Authentication)
- 自建 Email/密碼 註冊與登入。
- 採用 JWT 進行 API 身份驗證。
- 整合主流社群登入 (Google, Apple) 以降低會員轉換門檻。

## 4. 專案開發規範 (Development Guidelines)
*(請參考 `AGENTS.md` 的詳細約定)*
- **強制測試**: 任何新功能或 Bug 修復皆需經過 Mock Testing 驗證 (Jest / RTL)。
- **自動化建置**: 程式碼修改後自動執行 `yarn build` 確保無編譯錯誤。
- **API 文件**: 新增或修改 API 時，需同步更新 API 文件以便未來與 App 端交接。
- **SCSS 規範**: 修改 SCSS 後，必須編譯輸出至對應的 CSS 檔案。禁止修改編譯後的產物與 inline CSS。
- **Git 操作**: 遵守 `rtk` 指令規範，修改前 `rtk git pull`，建置成功後執行 `rtk git add/commit/push`。
- **程式碼拆分**: 單一檔案超過 300 行時，強制抽離為共用元件或子元件。

## 5. 後續開發步驟 (Next Steps)
1. **基礎建設 (Infrastructure)**: 初始化 Yarn Workspaces Monorepo 結構。
2. **專案建立 (Project Setup)**: 
   - 建立 Vite React 前端專案 (`packages/web`)
   - 建立 NestJS 後端專案 (`packages/api`)
   - 建立共用型別資料夾 (`packages/shared`)
3. **資料庫設計 (DB Schema)**: 設計核心資料表 (Users, Stores, Products, Orders) 並建立 Migration。
4. **後端核心實作**: 實作 JWT Auth 與會員系統 API。
5. **前端 UI 實作**: 建立自訂 SCSS Design System，並開始實作核心頁面 (註冊登入、首頁)。
