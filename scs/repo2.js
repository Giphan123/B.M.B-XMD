"use strict";
const { adams } = require("../Ibrahim/adams");
const axios = require("axios");

adams({ 
  nomCom: "repo2", 
  categorie: "General",
  reaction: "🔎",
  aliases: ["source", "script"],
  desc: "Show bot repository information",
  nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
  const { repondre, prefixe } = commandeOptions;
  const githubRepo = 'https://api.github.com/repos/bmb200/B.M.B-XMD';
  const thumbnailImg = 'https://files.catbox.moe/9gp8tr.jpg';
  const channelThumbnail = 'https://files.catbox.moe/9gp8tr.jpg';

  try {
    // Fetch repository data
    const response = await axios.get(githubRepo, { timeout: 10000 });
    const data = response.data;

    if (!data) {
      return repondre("Could not fetch data");
    }

    const repoInfo = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdate: new Date(data.updated_at).toLocaleDateString('en-GB'),
      owner: data.owner.login,
    };

    const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');

    // Enhanced cage design with channel information
    const gitdata = `
╭━━━〔 *𝙱.𝙼.𝙱-𝚇𝙼𝙳* 〕━━━┈⊷
┃★╭──────────────
┃★│ *Prefix : [ ${prefixe} ]*
┃★│ *Baileys : Multi Device*
┃★│ *Type : NodeJs*
┃★│ *Platform : Heroku*
┃★│ *Version : 1.0*
┃★│ *Owner : PkDriller*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷

╭━━━〔 *Repository Info* 〕━━━┈⊷
┃★ *𝐑𝐞𝐩𝐨:* ${data.html_url}
┃★ *𝐒𝐭𝐚𝐫𝐞𝐫𝐬:* ${repoInfo.stars}
┃★ *𝐅𝐨𝐫𝐤𝐬:* ${repoInfo.forks}
┃★ *𝐑𝐞𝐥𝐞𝐚𝐬𝐞 𝐃𝐚𝐭𝐞:* ${releaseDate}
┃★ *𝐋𝐚𝐬𝐭 𝐔𝐩𝐝𝐚𝐭𝐞:* ${repoInfo.lastUpdate}
╰━━━━━━━━━━━━━━━━━━━━━━━━┈⊷

*Join our channel for updates!*`;

    await zk.sendMessage(dest, { 
      image: { url: thumbnailImg }, 
      caption: gitdata,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363382023564830@newsletter',
          newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
          serverMessageId: -1,
        },
        forwardingScore: 999,
        externalAdReply: {
          title: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
          body: "Next Generation",
          thumbnailUrl: channelThumbnail,
          sourceUrl: 'https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });

  } catch (error) {
    console.log("Error fetching data:", error);
    repondre("An error occurred while fetching repository data.");
  }
});
      
