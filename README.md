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
4. Select "From Scratch"
5. Type "ChatGPT-Bot" in App Name field and Select Your WorkSpace
6. Copy the App ID and replace SLACK_APP_ID in settings.json
7. Select "Socket Mode" in the side menu
8. Enable Socket Mode and type "ChatGPT-Bot" in Token Name
9. Copy the token and replace SLACK_APP_TOKEN in settings.json
10. Select "Event Subscriptions" in the side menu
11. Enable Events and add the following to bot event
    - channels:history
    - channels:manage
    - groups:history
    - groups:read
    - groups:write
    - users.profile:read
    - users:read
12.  Select "Install App" in the side menu and install ChatGPT-Bot to your workspace
13.  Copy the token and replace SLACK_BOT_TOKEN in settings.json
14.  Add ChatGPT-Bot to the channel integrations you want to use
15.  Create OpenAI API key [here](https://platform.openai.com/account/api-keys)
16.  Replace OPENAI_API_KEY in settings.json with the obtained API key 
17.  Run ChatGPT-Bot
```shell
node index.js
```
<!--
## Additional settings(Option)
If you use the command, please add the following settings
1. Open Slack App settings page
2. Select "Slash Commands" in the side menu
3. Click "Create New Commands"
4. Enter "/chatgpt" in the command field and "ChatGPT Bot Settings" in the description field and save
5. 
-->