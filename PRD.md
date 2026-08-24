# Product Requirements Document (PRD) / 產品需求文件 / 产品需求文档 - Tapmall

*(Choose your preferred language / 請選擇您偏好的語言 / 请选择您偏好的语言)*
- [English (英文)](#english-en)
- [Traditional Chinese (繁體中文 - 台灣)](#traditional-chinese-zh-tw)
- [Simplified Chinese (简体中文)](#simplified-chinese-zh-cn)

---

<a id="english-en"></a>
## 🌍 English (EN) - Tapmall Cross-border E-commerce Platform PRD

### 1. Project Overview
This project aims to build a cross-border e-commerce platform similar to Shopee/Taobao, supporting multi-seller onboarding (B2B2C model), and equipped with foundational cross-border capabilities like multi-language and multi-currency support. The project initially focuses on Web development, with a seamless extension to iOS and Android mobile apps in the future.

### 2. Tech Stack
- **Architecture**: Monorepo (Yarn Workspaces), placing frontend, backend, and future apps in the same repository for easy sharing of TypeScript types and logic.
- **Frontend Web**: React + Vite (TypeScript)
- **Frontend Styling**: Vanilla SCSS (Custom Design System, strictly no CSS frameworks, no inline-css, strictly SCSS writing and compilation only).
- **Future Mobile App**: React Native (Expo)
- **Backend API**: Node.js + NestJS (TypeScript)
- **Database**: PostgreSQL (suitable for complex and highly relational e-commerce transactions and inventory data), with Prisma ORM.

### 3. Core Business & MVP Features
#### 3.1 Business Model (B2B2C Multi-vendor)
- **Buyer (C-end)**: Browse products, add to cart, multi-language checkout, order tracking, member center.
- **Seller (B-end)**: Seller Dashboard, product and inventory management, order processing, store settings.
- **Platform Admin**: Seller approval, platform financial and commission management, member role management.

#### 3.2 Cross-border Capabilities
- **i18n (Internationalization)**: Frontend interface supports switching between multiple languages.
- **Multi-currency Display**: Dynamically convert product prices and display them in local currency based on user preference.
- **Checkout Payment (MVP)**: Uniformly convert to a "single base currency" (e.g., USD/TWD) for deduction at checkout, reducing early-stage cross-border exchange rate and payment integration complexity.

#### 3.3 Authentication
- Custom Email/Password registration and login.
- JWT for API authentication.
- Integrate mainstream social logins (Google, Apple) to lower the conversion barrier.

### 4. Development Guidelines
*(Please refer to `AGENTS.md` for detailed rules)*
- **Mandatory Testing**: Any new feature or bug fix must be verified via Mock Testing (Jest / RTL).
- **Automated Build**: Automatically run `yarn build` after code modifications to ensure no compilation errors.
- **API Documentation**: Synchronously update API documentation when adding/modifying APIs for future App handovers.
- **SCSS Rules**: Strictly no CSS frameworks. All styles must be generated via compiling SCSS. After modifying SCSS, it must be compiled into corresponding CSS files. Do not modify compiled products or inline CSS.
- **Git Operations**: Follow `rtk` command rules: `rtk git pull` before modifying, `rtk git add/commit/push` after successful build.
- **Code Splitting**: If a single file exceeds 300 lines, it MUST be extracted into shared or sub-components.

### 5. Next Steps (Current Status)
1. **Infrastructure**: Initialize Yarn Workspaces Monorepo structure. *(Done)*
2. **Project Setup**: 
   - Create Vite React frontend (`packages/web`) *(Done)*
   - Create NestJS backend (`packages/api`) *(Done)*
   - Create shared types folder (`packages/shared`) *(Done)*
3. **DB Schema**: Design core tables (Users, Stores, Products, Orders) and create Prisma schema. *(Done)*
4. **Backend Core**: Implement JWT Auth and core modules (admin, auth, cart, products, stores, users). *(Initial Implementation Done, Iterating)*
5. **Frontend UI & Refactoring**: 
   - *Note*: Currently, `packages/web/src/App.tsx` exceeds 300 lines and mixes multiple components (e.g., `AdminDashboard`). It MUST be refactored into independent components/routes according to the guidelines.
   - Build custom SCSS Design System and core pages. *(In Progress)*

---

<a id="traditional-chinese-zh-tw"></a>
## 🇹🇼 繁體中文 (zh-TW) - Tapmall 跨境電商平台 PRD

### 1. 專案概述 (Project Overview)
本專案旨在打造一個類似 Shopee / 淘寶 的跨境電商平台，支援多賣家進駐 (B2B2C 模式)，並具備多國語系與多幣別的跨境基礎能力。專案初期專注於 Web 網頁端開發，未來將無縫擴展至 iOS 與 Android 行動裝置 App。

### 2. 核心技術選型 (Tech Stack)
- **架構設計**: Monorepo (Yarn Workspaces)，前後端及未來 App 皆置於同一倉儲，便於共享 TypeScript 型別與共用邏輯。
- **前端 Web**: React + Vite (使用 TypeScript)
- **前端樣式**: Vanilla SCSS (自建 Design System，嚴禁使用任何 CSS 框架，嚴禁 inline-css，嚴格遵守只執行與撰寫 SCSS)
- **未來行動端 App**: React Native (Expo)
- **後端 API**: Node.js + NestJS (使用 TypeScript)
- **資料庫**: PostgreSQL (適合處理電商複雜且關聯性高的交易與庫存資料)，搭配 Prisma ORM。

### 3. 核心商業模式與 MVP 功能 (Core Business & MVP Features)
#### 3.1 商業模式 (B2B2C 多商家進駐)
- **買家端 (C端)**: 瀏覽商品、加入購物車、多國語系結帳、訂單追蹤、會員中心。
- **賣家端 (B端)**: 賣家中心 (Dashboard)、商品上架與庫存管理、訂單處理、店鋪設定。
- **平台管理端 (Admin)**: 審核賣家、平台金流與手續費抽成管理、會員權限管理。

#### 3.2 跨境電商基礎 (Cross-border Capabilities)
- **多語系 (i18n)**: 前端介面支援多國語言切換。
- **多幣別顯示**: 根據使用者偏好，動態換算商品價格並顯示在地幣別。
- **結帳金流 (MVP)**: 結帳時統一轉換為「單一基礎幣別」(如 USD/TWD) 進行扣款，降低初期跨國匯差與當地金流串接複雜度。

#### 3.3 會員與驗證系統 (Authentication)
- 自建 Email/密碼 註冊與登入。
- 採用 JWT 進行 API 身份驗證。
- 整合主流社群登入 (Google, Apple) 以降低會員轉換門檻。

### 4. 專案開發規範 (Development Guidelines)
*(請參考 `AGENTS.md` 的詳細約定)*
- **強制測試**: 任何新功能或 Bug 修復皆需經過 Mock Testing 驗證 (Jest / RTL)。
- **自動化建置**: 程式碼修改後自動執行 `yarn build` 確保無編譯錯誤。
- **API 文件**: 新增或修改 API 時，需同步更新 API 文件以便未來與 App 端交接。
- **SCSS 規範**: 嚴格禁止使用任何 CSS 框架。所有樣式必須透過編譯 SCSS 產生，修改 SCSS 後必須編譯輸出至對應的 CSS 檔案。禁止修改編譯後的產物與 inline CSS。
- **Git 操作**: 遵守 `rtk` 指令規範，修改前 `rtk git pull`，建置成功後執行 `rtk git add/commit/push`。
- **程式碼拆分**: 單一檔案超過 300 行時，強制抽離為共用元件或子元件。

### 5. 後續開發步驟 (當前狀態)
1. **基礎建設 (Infrastructure)**: 初始化 Yarn Workspaces Monorepo 結構。 *(已完成)*
2. **專案建立 (Project Setup)**: 
   - 建立 Vite React 前端專案 (`packages/web`) *(已完成)*
   - 建立 NestJS 後端專案 (`packages/api`) *(已完成)*
   - 建立共用型別資料夾 (`packages/shared`) *(已完成)*
3. **資料庫設計 (DB Schema)**: 設計核心資料表並建立 Prisma Schema。 *(已完成)*
4. **後端核心實作**: 實作 JWT Auth 與核心模組 (admin, auth, cart, products, stores, users)。 *(初步完成，持續迭代)*
5. **前端 UI 實作與重構**: 
   - *注意*: 目前 `packages/web/src/App.tsx` 超過 300 行，且混合了多個元件 (如 `AdminDashboard`)。需要依據規範將其強制拆分為獨立的共用元件或子元件與路由。
   - 建立自訂 SCSS Design System 與實作核心頁面。 *(進行中)*

---

<a id="simplified-chinese-zh-cn"></a>
## 🇨🇳 简体中文 (zh-CN) - Tapmall 跨境电商平台 PRD

### 1. 项目概述 (Project Overview)
本项目旨在打造一个类似 Shopee / 淘宝 的跨境电商平台，支持多卖家入驻 (B2B2C 模式)，并具备多国语言与多币种的跨境基础能力。项目初期专注于 Web 网页端开发，未来将无缝扩展至 iOS 与 Android 移动端 App。

### 2. 核心技术选型 (Tech Stack)
- **架构设计**: Monorepo (Yarn Workspaces)，前后端及未来 App 皆置于同一仓库，便于共享 TypeScript 类型与共用逻辑。
- **前端 Web**: React + Vite (使用 TypeScript)
- **前端样式**: Vanilla SCSS (自建 Design System，严禁使用任何 CSS 框架，严禁 inline-css，严格遵守只执行与编写 SCSS)
- **未来移动端 App**: React Native (Expo)
- **后端 API**: Node.js + NestJS (使用 TypeScript)
- **数据库**: PostgreSQL (适合处理电商复杂且关联性高的交易与库存数据)，搭配 Prisma ORM。

### 3. 核心商业模式与 MVP 功能 (Core Business & MVP Features)
#### 3.1 商业模式 (B2B2C 多商家入驻)
- **买家端 (C端)**: 浏览商品、加入购物车、多国语言结账、订单追踪、会员中心。
- **卖家端 (B端)**: 卖家中心 (Dashboard)、商品上架与库存管理、订单处理、店铺设定。
- **平台管理端 (Admin)**: 审核卖家、平台资金与手续费抽成管理、会员权限管理。

#### 3.2 跨境电商基础 (Cross-border Capabilities)
- **多语言 (i18n)**: 前端界面支持多国语言切换。
- **多币种显示**: 根据用户偏好，动态换算商品价格并显示本地币种。
- **结账支付 (MVP)**: 结账时统一转换为“单一基础币种”(如 USD/TWD) 进行扣款，降低初期跨国汇差与当地支付对接复杂度。

#### 3.3 会员与验证系统 (Authentication)
- 自建 Email/密码 注册与登录。
- 采用 JWT 进行 API 身份验证。
- 整合主流社交登录 (Google, Apple) 以降低会员转换门槛。

### 4. 项目开发规范 (Development Guidelines)
*(请参考 `AGENTS.md` 的详细约定)*
- **强制测试**: 任何新功能或 Bug 修复皆需经过 Mock Testing 验证 (Jest / RTL)。
- **自动化构建**: 代码修改后自动执行 `yarn build` 确保无编译错误。
- **API 文档**: 新增或修改 API 时，需同步更新 API 文档以便未来与 App 端交接。
- **SCSS 规范**: 严格禁止使用任何 CSS 框架。所有样式必须透过编译 SCSS 产生，修改 SCSS 后必须编译输出至对应的 CSS 文件。禁止修改编译后的产物与 inline CSS。
- **Git 操作**: 遵守 `rtk` 指令规范，修改前 `rtk git pull`，构建成功后执行 `rtk git add/commit/push`。
- **代码拆分**: 单一文件超过 300 行时，强制抽离为共用组件或子组件。

### 5. 后续开发步骤 (当前状态)
1. **基础设施 (Infrastructure)**: 初始化 Yarn Workspaces Monorepo 结构。 *(已完成)*
2. **项目建立 (Project Setup)**: 
   - 建立 Vite React 前端项目 (`packages/web`) *(已完成)*
   - 建立 NestJS 后端项目 (`packages/api`) *(已完成)*
   - 建立共用类型文件夹 (`packages/shared`) *(已完成)*
3. **数据库设计 (DB Schema)**: 设计核心数据表并建立 Prisma Schema。 *(已完成)*
4. **后端核心实现**: 实现 JWT Auth 与核心模块 (admin, auth, cart, products, stores, users)。 *(初步完成，持续迭代)*
5. **前端 UI 实现与重构**: 
   - *注意*: 目前 `packages/web/src/App.tsx` 超过 300 行，且混合了多个组件 (如 `AdminDashboard`)。需要依据规范将其强制拆分为独立的共用组件或子组件与路由。
   - 建立自订 SCSS Design System 与实现核心页面。 *(进行中)*
