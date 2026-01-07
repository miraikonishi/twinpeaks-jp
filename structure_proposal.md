# Twin Peaks Archive - Site Structure Proposal (Rev. 2)

## 方針 (Policy)
1.  **デザイン維持**: 既存のサイトデザイン（雰囲気、アセット）を最大限活用し、大幅な見た目の変更は行わない。
2.  **コンテンツ再編集**: 新しい記事を作成するのではなく、既存の「膨大な解説記事」をアーカイブとして整理し、読みやすく提示することに注力する。
3.  **最小限の新機能**: 訪問の楽しみとなる「Random Quote（日替わり名言）」のみ追加実装する。

## サイトマップ構成案 (Sitemap Structure)

### 1. THE RED ROOM (Entrance/Home)
現在のトップページのデザインを維持しつつ、ナビゲーションとしての機能を強化。
- **Daily Quote**: (NEW) 訪問するたびにランダムで表示される劇中の名言や豆知識。
- **Entrance**: アーカイブへの入り口。
- **Recent Updates**: (もしあれば) 更新履歴。

### 2. ARCHIVES: EPISODES (本編解説)
メインコンテンツである `Studies` を、時系列順に整理して提示。
- **Season 1 & 2**: エピソードごとの詳細解説リスト。
- **Fire Walk With Me**: 映画版の解説。
- **The Return (Season 3)**: (将来的な枠として確保)

### 3. ARCHIVES: LIBRARY (読み物・資料)
作品世界を深く知るためのテキスト系コンテンツを統合。
- **Beginner's Guide**: 初級者ガイド (旧 `Ay P Gtp`).
- **Essays**: 考察コラム・エッセイ (旧 `Essays`).
- **David Lynch**: リンチのフィルモグラフィー、年表 (旧 `Lynchzone`).

### 4. ARCHIVES: BLACK LODGE (その他・文化)
作品周辺のカルチャー情報をまとめたセクション。
- **Locations**: ロケ地探訪記 (旧 `Travel`).
- **Gourmet**: チェリーパイレシピなど (旧 `Tp Gourmet`).
- **Reviews**: Blu-ray特典レビューなど (旧 `Bluray`).

## データ移行計画 (Mapping)
既存の `src/data.js` を活用し、以下の構造で表示カテゴリを変更します。

| 新セクション | 旧カテゴリキー | 備考 |
| :--- | :--- | :--- |
| **EPISODES** | `studies` | 全話数をリスト化し、インデックス性を高める |
| **LIBRARY** | `guide`, `essays`, `lynch` | 「読む」コンテンツとして統合 |
| **BLACK LODGE** | `travel`, `gourmet`, `bluray` | 「体験・レビュー」コンテンツとして統合 |

## 実装ステップ (Implementation Steps)
1.  **Quote機能の実装**: 既存のデザインに馴染む形で、トップページにランダムテキスト表示用エリアを追加。
2.  **ナビゲーション改修**: 上記3つのアーカイブセクション（EPISODES, LIBRARY, BLACK LODGE）へ誘導するメニュー構造に変更。
3.  **リストページ作成**: 各セクションの目次ページ（インデックス）を見やすく整備。記事本文のデザインは既存を維持。
