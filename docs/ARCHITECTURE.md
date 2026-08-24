# Architecture

本文件只描述高階設計，不公開原廠元件名稱、載入方式、內部函式、資料表或部署識別資訊。

## 設計原則

1. 保留既有商業規則：正式建立單據不以 SQL 模擬。
2. 讀寫分離：SQL 僅用於唯讀探索、查詢與結果驗證。
3. 憑證不離開主機：遠端入口只傳輸業務命令，不傳 ERP 密碼。
4. 一個核心、多個入口：CLI、Discord 與 Web 共用相同 JSON contract。
5. Fail closed：操作結果不確定時停止，不以重送猜測結果。
6. 可稽核：命令、預覽、確認與結果各有可追蹤狀態，但 Log 不含秘密。

## 邏輯架構

```mermaid
flowchart TB
    subgraph Remote[遠端與本機入口]
        A[CLI]
        B[Discord]
        C[Web]
        D[macOS Client]
    end

    subgraph Gateway[Command Gateway]
        E[Schema Validation]
        F[Authorization Policy]
        G[Request Journal]
    end

    subgraph Host[Windows ERP Host]
        H[Session Bootstrap]
        I[Read Adapter]
        J[Mutation Adapter]
        K[Licensed Vendor Runtime]
        L[Read-only Reconciliation]
    end

    A & B & C & D --> E --> F --> G --> H
    H --> I --> L
    H --> J --> K --> L
    L --> G --> E

    classDef protected fill:#fff3cd,stroke:#9a6700,color:#24292f
    class H,J,K,L protected
```

`Licensed Vendor Runtime` 是部署環境既有的合法安裝相依項，不包含於這個 Showcase。

## 背景登入與銷貨單流程

```mermaid
sequenceDiagram
    autonumber
    actor User as 使用者或整合服務
    participant Client as CLI / Discord / Web
    participant Gateway as JSON Command Gateway
    participant Session as Host Session Manager
    participant ERP as Vendor Business Runtime
    participant Read as Read-only Verifier

    User->>Client: 查詢或建立銷貨單
    Client->>Gateway: 結構化命令，不含 ERP 密碼
    Gateway->>Gateway: 驗證輸入、權限與請求識別
    Gateway->>Session: 取得或啟動受控工作階段
    Note over Session: 憑證只在 Windows 主機本機讀取

    alt 查詢
        Session->>Read: 執行當次唯讀查詢
        Read-->>Gateway: 正規化單據結果
    else 建立
        Session->>ERP: 透過既有商業物件建立
        ERP-->>Session: 執行結果
        Session->>Read: 獨立核對持久化結果
        Read-->>Gateway: reconciliation 證據
    end

    Gateway-->>Client: 最小化 JSON 回應
    Client-->>User: 顯示結果與下一個安全動作
```

## 安全邊界

```mermaid
flowchart LR
    Public[遠端裝置] -->|SSH 或 HTTPS\n業務 JSON| DMZ[命令入口]
    DMZ -->|已驗證命令| Trusted[Windows 使用者工作階段]
    Trusted --> ERP[ERP Runtime]
    Trusted --> SQL[(Read-only SQL)]

    Secret[Host-local Credentials] -.只在主機讀取.-> Trusted
    Secret -.不傳送.-> Public
```

- 遠端客戶端沒有 ERP 密碼，也不能要求系統回傳密碼。
- 帳密不放在命令列、SSH 參數、JSON payload、Log 或 Repository。
- CLI 只接受固定命令與 schema 驗證後的欄位。
- 單據建立需要明確確認；不確定結果只能 reconciliation，不能重做 mutation。
- Web 查詢預設不快取單據，避免顯示過期內容。

## 平台策略

原版是 Delphi 建置的 32-bit Windows EXE，原廠 Runtime 也維持 32-bit Windows 相依，因此 Windows 是唯一 ERP 執行節點。Python 適合先整合既有驗證、稽核與 native bridge；macOS 使用薄 CLI 透過 SSH／JSON 呼叫。未來若需要單一執行檔，可用 Rust 重寫薄客戶端，但不會假裝能在 macOS 原生載入 Windows 原廠 Library。

相容的 x86 Windows VM 可能執行原版程式，但它仍需要完整 Windows 桌面、授權與互動工作階段，並不能成為手機或一般終端的直接入口。Web 版則是真正的 Flask／HTML／CSS／JavaScript 應用：瀏覽器接收結構化資料並渲染 DOM，不傳送原 ERP 畫面的像素串流。
