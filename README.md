# Tapmall

Tapmall 是一個現代化的全端電子商務平台（E-commerce Platform），前端採用 React + SCSS 建構，後端採用 NestJS + Prisma 與 PostgreSQL 進行資料管理。整個專案採用 Yarn Workspaces 建立 Monorepo 架構。

## 📦 專案架構 (Monorepo)

本專案採用 Yarn Workspaces 管理，主要分為三個子專案：

- **`packages/web` (前端 UI)**
  - **技術棧**: React 18, Vite, TypeScript, SCSS
  - **特色**: 
    - 獨立的 SCSS Design System，**嚴格禁用** 任何現成 CSS 框架 (如 Tailwind)。
    - 透過 GitHub Actions 自動打包並部署至 GitHub Pages。
- **`packages/api` (後端 API)**
  - **技術棧**: NestJS, TypeScript, Prisma (ORM), PostgreSQL
  - **特色**:
    - 提供 JWT 認證與會員系統 (Users & Auth)。
    - 實作了核心的電商資料表 (Stores, Products, Orders)。
    - 具備完整的 Jest Mock 測試機制與驗證。
- **`packages/shared` (共用模組)**
  - 用於存放前後端共用的 TypeScript 型別 (Types) 與介面 (Interfaces)。

## 🚀 快速開始 (Quick Start)

### 1. 環境需求
- Node.js (v20.20 以上)
- Yarn (v1.22+)
- PostgreSQL

### 2. 安裝依賴
在專案根目錄下執行，一次安裝所有 workspaces 的套件：
```bash
yarn install
```

### 3. 環境變數設定
請在 `packages/api` 目錄下建立 `.env` 檔案，並配置您的 PostgreSQL 連線字串：
```env
DATABASE_URL="postgresql://使用者:密碼@localhost:5432/tapmall?schema=public"
```

### 4. 資料庫初始化 (Prisma)
進入 API 目錄並執行資料庫同步：
```bash
cd packages/api
npx prisma db push
```

### 5. 啟動開發伺服器
您可以分別啟動前端或後端伺服器：
- **啟動前端 (Vite)**:
  ```bash
  yarn workspace web run dev
  ```
- **啟動後端 (NestJS)**:
  ```bash
  yarn workspace api run start:dev
  ```

## 🛠 編譯與部署 (Build & Deploy)

### 全域自動編譯
在專案根目錄執行以下指令，系統將會依序編譯 `shared`、`web` 以及 `api`，確保套件間依賴正確：
```bash
yarn build
```

### GitHub Pages 前端部署
本專案已配置 GitHub Actions 腳本 (`.github/workflows/deploy.yml`)。
只要程式碼推送到 `main` 分支，前端網頁會自動打包發布到 **GitHub Pages**。
*(註：GitHub Pages 僅支援部署靜態前端頁面，後端 API 伺服器需另外部署至 Render、Vercel 或 Railway 等雲端服務。)*

## 📄 開發規範與測試 (Rules & Testing)
依照 `AGENTS.md` 的專案規範，嚴格遵守以下開發原則：
1. **SCSS 規範**：所有前端樣式僅能透過 SCSS 編譯，嚴禁修改編譯後的 CSS 與使用 Inline CSS。
2. **自動化驗證**：新增功能與修復錯誤時，皆必須攥寫臨時且全面的 Mock Test (Jest / Vitest) 進行驗證，通過後方可推送，絕不推送損壞的程式碼。
3. **Commit 規則**：開發過程中使用自訂的 `rtk git` CLI 來節省資源，確保每次上傳前皆能成功通過 `yarn build` 編譯。