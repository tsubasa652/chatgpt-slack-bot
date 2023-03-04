import fetch from "node-fetch"
import Slack from "@slack/bolt"
const { App } = Slack

const max_tokens = 1024
const temperature = 0.9

async function chatgptRequest(model, messages) {

    const payload = {
        model,
        max_tokens,
        temperature,
        messages
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    if (!res.ok) {
        const errmsg = await res.json()
        throw new Error(errmsg?.error?.message)
    }

    return await res.json()
}

const app = new App({
    // logLevel: 'debug',
    socketMode: true,
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN
})

app.event("message", async (e) => {
    if (e?.message?.subtype || !e?.message) return

    // console.log(e)
    const messages = [
        {
            role: "system",
            content: "You are a programmer assistant."
        }
    ]

    if (e?.message?.thread_ts) {
        const results = await app.client.conversations.replies({
            token: process.env.SLACK_BOT_TOKEN,
            channel: e.message.channel,
            ts: e.message.thread_ts
        })
        for (const msg of results.messages) {
            if (msg?.app_id) {
                if (msg.app_id != "A04SCL9EHSP") continue
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
        const chatgptResponse = await chatgptRequest("gpt-3.5-turbo", messages)
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

!(async () => {
    await app.start()
})()