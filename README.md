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
2. Create Slack App [here](https://api.slack.com/apps?new_app=1)
3. Select "From Scratch"
4. Type "ChatGPT-Bot" in App Name field and Select Your WorkSpace
5. Copy the App ID and set it in the environment variable SLACK_APP_ID
6. Select "Socket Mode" in the side menu
7. Enable Socket Mode and type "ChatGPT-Bot" in Token Name
8. Copy the token and set it in the environment variable SLACK_APP_TOKEN
9. Select "Event Subscriptions" in the side menu
10. Enable Events and add the following to bot event
- message.channels
- message.groups

11. Select "Install App" in the side menu and install ChatGPT-Bot to your workspace
12. Copy the token and set it in the environment variable SLACK_BOT_TOKEN
13. Add ChatGPT-Bot to the channel integrations you want to use
14. Create OpenAI API key [here](https://platform.openai.com/account/api-keys)
15. Set the obtained API key to the environment variable OPENAI_API_KEY
16. Run ChatGPT-Bot
```shell
node index.js
```
