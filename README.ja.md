Here is the Japanese translation of the provided English markdown chunk:

# webgpu-deno-test
An English version of the README is available here: [README.md](README.md)

このプロジェクトは、Deno(モダンなJavaScript/TypeScriptランタイム)を使用してWebGPU(低レベルグラフィックスAPI)の使用を示す一連の例です。

## 機能
- WebGPUベースの様々な計算を実装しています:
  - コンピュートシェーダーを使った整数から整数までの計算
  - フィボナッチ数列の計算
  - コラッツ予想の実装
  - コンピュートシェーダーでの様々なテーブルルックアップパターンの利用
- Denoの環境でのWebGPUコードの構造化と整理の様々な手法を示しています

## 要件
- Deno 1.39.2 以降
- WebGPU APIをサポートする最新のWebブラウザ（現在、特定のChromium系ブラウザでのみフラグ付きで利用可能）

## 使用方法
1. リポジトリをクローンします:
   ```
   git clone https://github.com/username/webgpu-deno-test.git
   ```
2. プロジェクトディレクトリに移動します:
   ```
   cd webgpu-deno-test
   ```
3. Denoを使用してサンプルを実行します:
   ```
   deno run --allow-all add1.js
   deno run --allow-all fib_main.js
   deno run --allow-all collatz.js
   deno run --allow-all tbl_main.js
   ```
   また、HTMLファイルを互換性のあるブラウザで開いて、ブラウザでサンプルを実行することもできます。

## ライセンス
このプロジェクトは [MIT License](LICENSE) のもとで公開されています。
