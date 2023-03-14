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
2. [ここから](https://api.slack.com/apps?new_app=1)Slackアプリを作成します
3. 「From Scratch」を選択
4. App Nameに「ChatGPT-Bot」入力し、ワークスペースを選択します
5. App IDをコピーし、環境変数のSLACK_APP_IDに設定します
6. サイドメニューから「Socket Mode」を選択します
7. Socket Modeを有効にして、Token Nameに「ChatGPT-Bot」と入力します
8. 表示されたトークンをコピーし、環境変数のSLACK_APP_TOKENに設定します
10. サイドメニューから「Event Subscriptions」を選択します
11. イベントを有効にして以下の項目をBot Eventsに追加します
- channels:history
- channels:manage
- groups:history
- groups:read
- groups:write
- users.profile:read
- users:read

11. サイドメニューから「Install App」を選択し、ワークスペースにボットをインストールします
14. 表示されたトークンをコピーし、環境変数のSLACK_BOT_TOKENに設定します
15. 使用したいチャンネルのインテグレーションにChatGPT-Botを追加します
16. [ここから](https://platform.openai.com/account/api-keys)OpenAIのAPIキーを作成します
17. 取得したAPIキーを環境変数のOPENAI_API_KEYに設定します
19. ChatGPT-Botを実行
```shell
node index.js
```
