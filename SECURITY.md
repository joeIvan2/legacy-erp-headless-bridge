# Security and Disclosure Policy

## Credentials

- ERP、資料庫、Discord、SSH 與 GitHub credentials 不得提交到 Repository。
- ERP 憑證只留在 Windows ERP 主機的使用者範圍，不透過 CLI argument、SSH command、JSON payload 或 HTTP response 傳送。
- Log 與錯誤訊息不得輸出秘密值。
- 私人 Repository 不是秘密管理工具；即使目前設為 Private，仍以未來可能公開的標準審核內容。

## Proprietary artifacts

下列內容不得提交：

- 原版或修改過的 `EXE`、`DLL`、`BPL`、`DCP` 等 Binary
- 反編譯 source、type-library dump、memory dump、symbol map 或函式位址
- 原廠素材、安裝包、授權檔與資料庫備份
- 能直接重現專有介面或資料模型的詳細操作文件

## Enterprise data

- 不提交可批次使用的正式客戶、產品、交易、庫存、價格或人員資料。
- 所有示例必須使用虛構值。
- 目前兩張由使用者明確指定的真實截圖使用「現金銷售客戶」示範資料，已確認沒有個人客戶資訊，並依要求保留原始像素；改為 Public 前仍需做一次一般資訊檢查。
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
5. 確認 GitHub Repository 仍為 Private，直到另行決定公開。

若發現秘密曾被提交，必須先撤銷／輪替該秘密，再處理 Git 歷史；單純刪除最新檔案不足以消除洩漏。
