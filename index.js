import fs from "fs"
import fetch from "node-fetch"
import HttpsProxyAgent from "https-proxy-agent"
import Slack from "@slack/bolt"
const { App } = Slack

const settings = JSON.parse(fs.readFileSync("settings.json"))

const max_tokens = 1024
const temperature = 0.9

const proxy = settings.proxy || process.env.https_proxy

async function chatgptRequest(messages) {

    const payload = {
        model: settings.openai.model,
        max_tokens: settings.openai.max_tokens,
        temperature: settings.openai.temperature,
        messages
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${settings.openai.api_key}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
        agent: proxy
            ? new HttpsProxyAgent(proxy)
            : undefined
    })

    if (!res.ok) {
        const errmsg = await res.json()
        throw new Error(errmsg?.error?.message)
    }

    return await res.json()
}

function saveSettings(){
    fs.writeFileSync("settings.json", JSON.stringify(settings, null, 4))
}

function updateSettings(type, arg){
    console.log(arg)
    switch(type){
        case "openai_api_key":
        case "model":
            settings.openai[type] = arg[0]
            break
        case "max_tokens":
        case "temperature":
            settings.openai[type] = Number(arg[0])
            break
        case "system_role":
            if(settings.openai.system_roles[Number(arg[0])]){
                settings.openai.system_roles[Number(arg[0])].content = arg[1]
            }else{
                throw new Error("selected system role not found")
            }
            break
        default:
            throw new Error("type not found")
    }

    saveSettings()
}

const app = new App({
    // logLevel: 'debug',
    socketMode: true,
    token: settings.slack.bot_token,
    appToken: settings.slack.app_token,
    agent: proxy
        ? new HttpsProxyAgent(proxy)
        : undefined
})

app.event("message", async (e) => {
    if (e?.message?.subtype || !e?.message) return

    const messages = [
        ...settings.openai.system_roles
    ]

    if (e?.message?.thread_ts) {
        const results = await app.client.conversations.replies({
            token: settings.slack.bot_token,
            channel: e.message.channel,
            ts: e.message.thread_ts
        })
        for (const msg of results.messages) {
            if (msg?.app_id) {
                if (msg.app_id != settings.slack.app_id) continue
                messages.push({
                    role: "assistant",
                    content: msg.text
                })
            } else {
                messages.push({
                    role: "user",
                    content: msg.text
                })
            }
        }
    } else {
        messages.push({
            role: "user",
            content: e.message.text
        })
    }

    const ts = e.message.ts

    try {
        const chatgptResponse = await chatgptRequest(messages)
        for (const choice of chatgptResponse?.choices) {
            const text = choice.message?.content.split("\n").map(v=>{
                if(v.match(/^```.+$/)){
                    return "```"
                }
                return v
            }).join("\n")
            
            e.say({
                text,
                thread_ts: ts
            })
        }
    } catch (err) {
        e.say({
            text: err.message,
            thread_ts: ts
        })
    }

})

app.command("/chatgpt", async(e)=>{
    try{
        await e.ack()
        
        const user_id = e.command.user_id
        
        if(!settings.admin.includes(user_id)) {
            return await e.client.chat.postMessage({
                channel: user_id,
                text: "You don't have permission"
            })
        }
    
        const command = e.command.text.split(" ")
    
        let text, tmp
    
        switch(command[0]){
            case "add_system_role":
                try{
                    settings.openai.system_roles.push({
                        role: "system",
                        content: command[1]
                    })
                    saveSettings()
                    text = "Successfully add system_role!"
                }catch(e){
                    text = "Error occurred"
                }
                break
            case "update":
                try{
                    updateSettings(command[1], command.splice(2))
                    text = "Successfully update settings!"
                }catch(e){
                    text = `Error occurred\nreasons: ${e.message}`
                }
                break
            case "get":
                text = '```' + JSON.stringify(settings, null, 4) + '```'
                break
            case "help":
                text = "Preparing"
                break
            case "reload_settings":
                tmp = JSON.parse(fs.readFileSync("settings.json"))
                for(let key in tmp){
                    settings[key] = tmp[key]
                }
                text = "Successfully reload settings"
                break
            default:
                text = "command not found"
        }

        await e.client.chat.postMessage({
            channel: user_id,
            text
        })
    }catch(e){
        console.log(e)
    }
})

!(async () => {
    await app.start()
})()