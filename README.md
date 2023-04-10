# Slack ChatGPT Bot

[日本語](README-ja.md)

[![Run on Repl.it](https://repl.it/badge/github/tsubasa652/chatgpt-slack-bot)](https://repl.it/github/tsubasa652/chatgpt-slack-bot)

## Requirement

Node.js 18.12.0 or newer is required

## Usage

1. Install dependencies
    ```shell
    npm install
    ```
2. Copy setting file
    ```shell
    cp settings.json.example settings.json
    ```
3. Create Slack App [here](https://api.slack.com/apps?new_app=1)
4. Select "From an app manifest" and select workspace,　you want to use this app
5. Select "YAML" and past Manifest
   
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
6. Copy the App ID and replace SLACK_APP_ID in settings.json
7. Click "Generate Token and Scopes"
8.  Enter "ChatGPT-Bot" in Token Name and add "connections:write" scope
9.  Copy the token and replace SLACK_APP_TOKEN in settings.json
10. Select "Install App" in the side menu and install ChatGPT-Bot to your workspace
11. Copy the token and replace SLACK_BOT_TOKEN in settings.json
12. Add ChatGPT-Bot to the channel integrations you want to use
13. Create OpenAI API key [here](https://platform.openai.com/account/api-keys)
14. Replace OPENAI_API_KEY in settings.json with the obtained API key 
15. Run ChatGPT-Bot
```shell
node index.js
```
<!--
## Additional settings(Option)
If you use the command, please add the following settings
1. 
-->