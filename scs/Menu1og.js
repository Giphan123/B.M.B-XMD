const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../Ibrahim/adams");
const { format } = require(__dirname + "/../Ibrahim/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "list", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../Ibrahim//adams");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭──────────────────❂
┊❂╭───*𝙱.𝙼.𝙱-𝚇𝙼𝙳*────❂
┊✺┊ *User* : ${s.OWNER_NAME}
┊✺┊ *Mode* : ${mode}
┊✺╰───────────────❂
┊✺┊ *Time* : ${temps}  
┊✺┊ *Ram* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┊❂╰───────────────❂
╰──────────────────❂ \n\n`;
 
    let menuMsg=`  
  **𝙱.𝙼.𝙱-𝚇𝙼𝙳 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓*
`;

    for (const cat in coms) {
        menuMsg += `*╭────❂* *${cat}* *❂*`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*┊❂* ${cmd}`;
        }
        menuMsg += `
*╰═════════════❂* \n`
    }

    menuMsg += `
◇            ◇
*—————✺✺✺✺—————*

  *B.M.B-XMD*                                         
*╰═════════════❂*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𝙱.𝙼.𝙱-𝚇𝙼𝙳*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*Ibrahim-tech*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
      
