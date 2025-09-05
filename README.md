# React GridStack Dashboard
一個基於 React + GridStack 打造的可拖曳式儀表板，支援動態新增、刪除、拖曳與縮放 Grid 元件，並可放入不同類型的圖表（Line、Bar、Pie 等）。此專案旨在提供一個模組化、可重複利用的前端儀表板架構。

[🚀 Demo Page](https://react-gridstack-dashboard.vercel.app)

---

## ✨ 功能特色
- 動態新增 / 移除 Grid  
    使用按鈕快速建立或刪除儀表板區塊。
- 拖曳與縮放  
    基於 GridStack.js 的強大拖曳功能，支援自由調整位置與大小。
- 即時位置同步  
    GridStack 事件監聽，將最新的 x, y, w, h 同步回 React state。
- 圖表管理  
    可選擇不同圖表類型（Line、Bar、Pie）並展示假資料（可替換為 API）。
- 模組化元件  
    拆分成 GridstackProvider、GridstackItem、GridCard 等組件，方便維護與擴展。
---
## 🛠 技術組合
- React 18
- GridStack.js (拖曳 & 佈局)
- Material-UI (MUI) (按鈕、輸入框、選單等 UI 元件)
- Chart.js (圖表繪製)
- Vite (開發與打包)
- ESLint + Prettier (程式碼規範)

---
## 📦 安裝與執行
```bash
# Clone 專案
git clone https://github.com/jingyieva/react-gridstack-dashboard.git

cd react-gridstack-dashboard

# 安裝套件
pnpm install
# 或者
npm install

# 啟動開發伺服器
pnpm dev
# 或者
npm run dev

# 打包專案
pnpm build
# 或者
npm run build
```
---
## 📂 專案結構
```bash
src/
├─ assets/                      # 靜態資源：圖片、icons、字型、靜態 JSON 等
│
├─ components/                  # 可重用 UI 元件（無頁面語意）
│  ├─ GridStack/
│  │  ├─ GridstackProvider.jsx  # GridStack 初始化與事件監聽
│  │  ├─ GridstackItem.jsx      # 提供 createPortal 將內容綁定到 Grid
│  │  └─ GridCard.jsx           # 卡片樣式容器，支援刪除與 header action
│  ├─ Chart/
│  │  ├─ Types/                 # Bar, Pie, Line 等圖表元件
│  │  └─ ChartContainer.jsx     # Chart.js 封裝，顯示不同類型圖表
│  └─ DateTimePicker/           # 日期選擇器
│
├─ constants/                   # 常數與 enum（純資料，不含副作用）
│  ├─ chart.js                  # 定義圖表類型 (Line, Bar, Pie)
│  └─ gridStack.js              # GridStack 預設配置
│
├─ layouts/                     # 頁框架（Header、Footer、Shell）
│
├─ styles/                      # 全域樣式
│
├─ utils/                       # 純函式工具
│
├─ views/                       # 有路由語意的頁面級元件
│  └─ Dashboard.jsx             # 主儀表板頁面
│
├─ App.jsx
└─ main.jsx                     # React 入口
```
---
## 🔑 主要元件說明
- `GridstackProvider`  
    封裝 GridStack 初始化，統一管理新增、刪除、拖曳、縮放事件。
- `GridstackItem`  
    使用 React Portal 將子組件渲染到對應的 Grid 容器內。
- `GridCard`  
    一個 MUI Card 元件，內含標題、刪除按鈕與內容區塊。
- `ChartContainer`  
    根據傳入的 type 與 data 顯示對應的 Recharts 圖表。
---
## 🧭 使用方式
1. 點擊「Add Grid」新增一個空的格子。
2. 點擊格子內的 「+」 按鈕，選擇 Line / Bar / Pie 圖表。
3. 拖曳或縮放格子，查看位置與大小如何即時回傳 state。
4. 點擊卡片右上角的刪除按鈕，可以移除該格子。
---
## 🔮 未來規劃
- [ ] 加入 儲存佈局 功能（將 grid 狀態存到 localStorage 或 API）。
- [ ] 支援 後端 API 資料綁定，動態載入圖表數據。
- [ ] 提供 Dark Mode 切換。
- [ ] 封裝成 NPM 套件，可直接安裝並在其他專案中使用。

## 📜 授權
MIT License © 2025 [jingyieva@github](https://github.com/jingyieva)
