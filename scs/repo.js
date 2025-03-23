const { adams } = require(__dirname + "/../Ibrahim/adams");    
const axios = require("axios");    

adams({ nomCom: "repo", categorie: "General" }, async (dest, zk, commandeOptions) => {    
    let { ms, repondre } = commandeOptions;    

    const repoUrl = "https://api.github.com/repos/bmb200/B.M.B-XMD";    
    const imageUrl = "https://files.catbox.moe/cwda81.jpg";    

    try {    
        const response = await axios.get(repoUrl);    
        const repo = response.data;    

        let repoInfo = `    
╭══════════════⊷❍    
┃ 🔥 *BMB XMD REPOSITORY* 🔥    
┃ ❏ 𝗡𝗮𝗺𝗲: *${repo.name}*    
┃ ❏ 𝗢𝘄𝗻𝗲𝗿: *${repo.owner.login}*    
┃ ❏ 𝗦𝘁𝗮𝗿𝘀: ⭐ *${repo.stargazers_count}*    
┃ ❏ 𝗙𝗼𝗿𝗸𝘀: 🍴 *${repo.forks_count}*    
┃ ❏ 𝗜𝘀𝘀𝘂𝗲𝘀: 🛠️ *${repo.open_issues_count}*    
┃ ❏ 𝗪𝗮𝘁𝗰𝗵𝗲𝗿𝘀: 👀 *${repo.watchers_count}*    
┃ ❏ 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲: 🖥️ *${repo.language}*    
┃ ❏ 𝗕𝗿𝗮𝗻𝗰𝗵𝗲𝘀: 🌿 *${repo.default_branch}*    
┃ ❏ 𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗼𝗻: 📅 *${new Date(repo.updated_at).toLocaleString()}*    
┃ ❏ 𝗥𝗲𝗽𝗼 𝗟𝗶𝗻𝗸: 🔗 [Click Here](${repo.html_url})    
╰══════════════⊷❍    
        `;    

        await zk.sendMessage(dest, {    
            image: { url: imageUrl },    
            caption: repoInfo,    
            footer: "*BMB XMD GitHub Repository*",    
            contextInfo: {    
                forwardingScore: 999,    
                isForwarded: true,    
            },    
        }, { quoted: ms });    

    } catch (e) {    
        console.log("🥵 Error fetching repository data: " + e);    
        repondre("🥵 Error fetching repository data, please try again later.");    
    }    
});
