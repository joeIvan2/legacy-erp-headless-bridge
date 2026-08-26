# Screenshot Policy

這個資料夾包含專案流程的真實畫面與公開展示素材，用來證明「原始 Delphi ERP → 可驗證資料邊界 → Headless／Web／Discord／第三方作業」不是概念圖。

## 圖片清單

- `legacy-delphi-sale-voucher.png`：原始 Delphi 32-bit ERP 與版本資訊，作為整個改造流程的起點。
- `readonly-sql-sale-voucher.png`：MSSQL 唯讀查詢取得的銷貨單、客戶與品項明細，作為資料流證據。
- `web-rebuild-devtools.png`：依原始表單結構重建的 Web 畫面與 DOM 檢查，用來呈現欄位／物件層級已可被程式理解。
- `discord-ai-sale-voucher.png`：Discord 自然語言要求建立銷貨單後，Bot 回傳單號與 SQL 驗證結果。
- `sales-query-web.png`：實際 Web 銷貨單查詢頁。
- `original-erp.png`：另一張原版 Delphi ERP 銷貨單畫面，用於與 Web 版本逐欄比對。
- `web-sale-voucher.png`：Flask／HTML／CSS／JavaScript 實際渲染的原始介面重建版本。
- `today-labels-workflow.png`：將銷貨資料接上發票、UDI、郵局版位與 HCT 標籤的實際作業頁。

所有圖片都由 Repository 所有者提供、審閱並明確指定放入公開 GitHub。圖片依提供時的原始像素保存，不做 AI 修復，也不將畫面宣稱為合成資料或完全去識別化；其中部分圖片刻意保留單號、客戶／品項欄位、價格、Discord 顯示名稱或網址查詢參數，作為實際流程證據。

## 公開前檢查

未來新增圖片時，仍應先檢查：

- ERP、Windows、資料庫、Discord 或 GitHub 帳號與任何密碼提示
- Token、Webhook、連線字串、內網 IP、主機名稱與私鑰
- 公司代號、授權資訊或可被濫用的部署識別
- 客戶名稱、聯絡資料、統一編號、地址與可識別個人的資訊
- 單號、日期、品號、價格與備註是否已由資料所有者明確批准公開
- 瀏覽器網址、查詢參數、Discord server／channel／user 是否已明確批准公開

## 不代表的內容

- 截圖只證明畫面與流程，不提供資料庫寫入方式。
- SQL 畫面是唯讀查詢證據，不授權任何人仿製正式資料、連線或操作。
- Web 畫面是瀏覽器 DOM，不是遠端桌面、畫面串流或包裝原版 EXE。
- 圖片公開不等於原廠 Binary、反編譯產物、帳密或內部程式可以公開。

若未來發現圖片包含未授權的秘密或個資，必須先撤銷／輪替可能受影響的秘密，再處理最新版本與 Git 歷史；只刪除最新檔案不足以消除洩漏。
