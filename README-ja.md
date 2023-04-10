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
4. 「From an app manifest」を選択し、このボットを利用したいワークスペースを選択します。
5. YAMLを選択し、以下のManifestを貼り付ける
   Manifest
   ```yaml
   display_information:
    name: ChatGPT-Bot
    features:
    app_home:
        home_tab_enabled: false
        messages_tab_enabled: true
        messages_tab_read_only_enabled: false
    bot_user:
        display_name: ChatGPT-Bot
        always_online: false
    slash_commands:
        - command: /chatgpt
        description: ChatGPT Bot Settings
        should_escape: false
    oauth_config:
    scopes:
        bot:
        - channels:history
        - channels:manage
        - chat:write
        - groups:history
        - groups:read
        - users.profile:read
        - users:read
        - groups:write
        - commands
    settings:
    event_subscriptions:
        bot_events:
        - message.channels
        - message.groups
    interactivity:
        is_enabled: true
    org_deploy_enabled: false
    socket_mode_enabled: true
    token_rotation_enabled: false
   ```
6. App IDをコピーし、settings.jsonのSLACK_APP_IDを置き換えます
7. 「Generate Token and Scopes」をクリックします
8. Token Nameに「ChatGPT-Bot」と入力し、「connections:write」の権限を追加します
9. 表示されたトークンをコピーし、settings.jsonのSLACK_APP_TOKENを置き換えます。
10. サイドメニューから「Install App」を選択し、ワークスペースにボットをインストールします
11. 表示されたトークンをコピーし、settings.jsonのSLACK_BOT_TOKENを置き換えます
12. 使用したいチャンネルのインテグレーションにChatGPT-Botを追加します
13. [ここから](https://platform.openai.com/account/api-keys)OpenAIのAPIキーを作成します
14. settings.jsonのOPENAI_API_KEYを取得したAPIキーに置き換えます
15. ChatGPT-Botを実行
```shell
node index.js
```
