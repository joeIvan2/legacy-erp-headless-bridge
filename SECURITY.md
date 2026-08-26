# Security and Disclosure Policy

## Credentials

- ERP、資料庫、Discord、SSH 與 GitHub credentials 不得提交到 Repository。
- ERP 憑證只留在 Windows ERP 主機的使用者範圍，不透過 CLI argument、SSH command、JSON payload 或 HTTP response 傳送。
- Log 與錯誤訊息不得輸出秘密值。
- 公開 Repository 不是秘密管理工具；所有內容都必須在提交前完成秘密與企業資料檢查。

## Proprietary artifacts

下列內容不得提交：

- 原版或修改過的 `EXE`、`DLL`、`BPL`、`DCP` 等 Binary
- 反編譯 source、type-library dump、memory dump、symbol map 或函式位址
- 原廠素材、安裝包、授權檔與資料庫備份
- 能直接重現專有介面或資料模型的詳細操作文件

## Enterprise data

- 不提交可批次使用的正式客戶、產品、交易、庫存、價格或人員資料。
- 文件中的可執行範例與機器可讀資料必須使用虛構值；不得提交可批次使用的正式資料集。
- `docs/screenshots/` 內的真實畫面是例外：由 Repository 所有者逐張提供、審閱並明確指定公開。部分畫面刻意保留選定的單號、客戶／品項欄位、價格、Discord 顯示名稱或網址查詢參數作為流程證據；完整清單與邊界見 `docs/screenshots/README.md`。
- 截圖例外不延伸成資料庫匯出、Log、查詢腳本、連線資訊或其他正式資料可公開。
- 匯出檔、Log、測試資料庫與封存壓縮檔一律排除。

## Safe operations

- SQL discovery 與驗證維持 read-only。
- 正式單據 mutation 只能通過既有商業規則 adapter。
- 每次 mutation 必須有唯一 request identity、明確確認與 reconciliation。
- 結果不確定時不得重送 mutation。

## Before every push

1. 明確列出要提交的檔案，不使用不受控的全目錄加入。
2. 檢查 Binary、壓縮檔、資料庫、Log、設定檔與未遮蔽圖片。
3. 搜尋 password、token、secret、connection string、私鑰與常見 credential pattern。
4. 檢查 Git diff 與 staged diff。
5. 確認本次變更仍適合放在 Public Repository。

若發現秘密曾被提交，必須先撤銷／輪替該秘密，再處理 Git 歷史；單純刪除最新檔案不足以消除洩漏。
