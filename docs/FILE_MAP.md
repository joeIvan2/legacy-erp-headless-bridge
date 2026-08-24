# Internal File Map

以下檔名用來說明完整專案的責任切分。原始實作不包含在這個 Showcase 中，檔案也不提供可點擊的原始碼連結。

| 內部檔案 | 責任邊界 |
| --- | --- |
| `erp_automation/login.py` | Windows 主機本機工作階段與登入狀態管理 |
| `erp_automation/bridge.py` | Python 與既有 Windows Runtime 之間的受控橋接 |
| `erp_automation/sale_voucher.py` | 銷貨單狀態機、輸入驗證與結果快照 |
| `erp_automation/full_sale_read.py` | 銷貨單唯讀完整資料模型與正規化 |
| `erp_automation/helper_cli.py` | 固定工具白名單與 JSON request／response envelope |
| `scripts/erpctl.py` | Windows／macOS 可共用的薄 CLI 入口 |
| `discord_erp_bot/erp_cli.py` | Discord workflow 到共用 CLI 的 adapter |
| `webapp/views/sale_query.py` | Flask 唯讀銷貨單 API |
| `webapp/sale_navigation.py` | 即時上一張／下一張與客戶範圍導航 |
| `webapp/templates/sale_query.html` | 銷貨單 Web UI 與快捷鍵互動 |
| `tests/test_sale_*.py` | 查詢、導航、無 UI 輸入與安全契約測試 |

## 為什麼只列職責

這個切分可以說明系統如何將登入、資料讀取、mutation、遠端傳輸與 UI 解耦；但基於商業軟體版權疑慮、原廠授權邊界與企業環境安全考量，不公開完整實作原始碼、反編譯原始碼、函式位址、Library 名稱、資料表、欄位、部署路徑，或可直接驅動原廠元件的對應操作程式碼。
