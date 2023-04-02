# Slack ChatGPT Bot

[English](README.md)

[![Run on Repl.it](https://repl.it/badge/github/tsubasa652/chatgpt-slack-bot)](https://repl.it/github/tsubasa652/chatgpt-slack-bot)


## Requirement

Node.js 18.12.0または、より新しいバージョン

## Usage

1. 依存関係のインストール
    ```shell
    npm install
    ```
2. 設定ファイルをコピーします
    ```shell
    cp settings.json.example settings.json
    ```
3. [ここから](https://api.slack.com/apps?new_app=1)Slackアプリを作成します
4. 「From Scratch」を選択
5. App Nameに「ChatGPT-Bot」入力し、ワークスペースを選択します
6. App IDをコピーし、settings.jsonのSLACK_APP_IDを置き換えます
7. サイドメニューから「Socket Mode」を選択します
8. Socket Modeを有効にして、Token Nameに「ChatGPT-Bot」と入力します
9.  表示されたトークンをコピーし、settings.jsonのSLACK_APP_TOKENを置き換えます。
10. サイドメニューから「Event Subscriptions」を選択します
11. イベントを有効にして以下の項目をBot Eventsに追加します
    - channels:history
    - channels:manage
    - groups:history
    - groups:read
    - groups:write
    - users.profile:read
    - users:read
12. サイドメニューから「Install App」を選択し、ワークスペースにボットをインストールします
13. 表示されたトークンをコピーし、settings.jsonのSLACK_BOT_TOKENを置き換えます
14. 使用したいチャンネルのインテグレーションにChatGPT-Botを追加します
15. [ここから](https://platform.openai.com/account/api-keys)OpenAIのAPIキーを作成します
16. settings.jsonのOPENAI_API_KEYを取得したAPIキーに置き換えます
17. ChatGPT-Botを実行
```shell
node index.js
```
