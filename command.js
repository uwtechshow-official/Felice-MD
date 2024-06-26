require("./config.js");
const fs = require("fs");

const {
    getGroupAdmins,
} = require("./lib/library.js");

module.exports = async (fell, m) => {
    try {
        const body = (
            (m.mtype === 'conversation' && m.message.conversation) ||
            (m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
            (m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
            (m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
            (m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
            (m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
            (m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
        ) ? (
            (m.mtype === 'conversation' && m.message.conversation) ||
            (m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
            (m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
            (m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
            (m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
            (m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
            (m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
        ) : '';

        const budy = (typeof m.text === 'string') ? m.text : '';
        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1);
        const text = q = args.join(" ");
        const sender = m.key.fromMe ? (fell.user.id.split(':')[0] + '@s.whatsapp.net' || fell.user.id) : (m.key.participant || m.key.remoteJid);
        const botNumber = await fell.decodeJid(fell.user.id);
        const senderNumber = sender.split('@')[0];
        const pushname = m.pushName || `${senderNumber}`;
        const isBot = botNumber.includes(senderNumber);
        const fatkuns = (m.quoted || m);
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m;
        const mime = (quoted.m || quoted).mimetype || '';
        const qmsg = (quoted.m || quoted);
        const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;

        const groupMetadata = m.isGroup ? await fell.groupMetadata(m.chat).catch(e => { }) : '';
        const groupName = m.isGroup ? groupMetadata.subject : '';
        const participants = m.isGroup ? await groupMetadata.participants : '';
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '';
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
        const groupOwner = m.isGroup ? groupMetadata.owner : '';
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false;

        if (isCmd) console.log("~> [CMD]", command, "from", pushname, "in", m.isGroup ? "Group Chat" : "Private Chat", '[' + args.length + ']');

        switch (command) {
            case 'start':
                fell.sendMessage(m.chat, {
                    image: { url: "Media/logo.jpg" },
                    caption: "Hi 😎,\nThis Is Udavin Wijesudara Photography\n How Can I Help You ?\n1️⃣ Our Services\n2️⃣ Our Pricing\n3️⃣ Find Us On Social Media\n4️⃣ Contact Owner\n\n> Udavin Wijesundara Photography",
                    viewOnce: false
                }, { quoted: m });
                break;

            case '1':
                m.reply('We Do\n✅ Model Shoot\n✅ Birthday Shoot\n✅ Event Photography\n✅ Photo Editing Services\n✅ Photo Retouching Services\n✅ Video Editings Services\n ✅ Albem Design Services\n✅ Social Media Post Design\nTo Get Some Samples Done By Us Please Type As *.s*\n\n> Udavin Wijesundara Photography');
                break;

            case 's':
                const images = [
                    { url: "Media/Social Media Sample 1.jpg", caption: "Social Media Sample 1" },
                    { url: "Media/Social Media Sample 2.jpg", caption: "Social Media Sample 2" },
                    { url: "Media/Social Media Sample 3.jpg", caption: "Social Media Sample 3" },
                    { url: "Media/Model Shoot Sample 1.jpg", caption: "Model Shoot Sample 1" },
                    { url: "Media/Model Shoot Sample 2.jpg", caption: "Model Shoot Sample 2" },
                    { url: "Media/Retouching 1.jpg", caption: "Retouching 1" },
                    { url: "Media/Retouching 2.jpg", caption: "Retouching 2" },
                    { url: "Media/Retouching 3.jpg", caption: "Retouching 3" }
                ];

                for (const image of images) {
                    await fell.sendMessage(m.chat, {
                        image: { url: image.url },
                        caption: image.caption,
                        viewOnce: false
                    }, { quoted: m });
                }
                break;

            case '2':
                m.reply('2️⃣ Our Pricing\nPlease reply with the number:\n2️⃣.1️⃣ Model Shoot\n2️⃣.2️⃣ Birthday Shoot\n2️⃣.3️⃣ Event Photography\n2️⃣.4️⃣ Photo Editing Services\n2️⃣.5️⃣ Video Editing Services\n2️⃣.6️⃣ Album Design\n2️⃣.7️⃣ Social Media Post Design\n\n> Udavin Wijesundara Photography');
                break;

            case '2.1':
                m.reply('*Model Shoot Pricing*\n*Lite*\n✔️ Price: Rs 6000/=\n✔️ 20 Photos\n✔️ 2 hrs Shoot\n✔️ Soft Copies Only\n\n> Udavin Wijesundara Photography');
                break;

            case '2.2':
                m.reply('*Birthday Shoot Pricing*\n*Lite*\n✔️ Price: Rs 7000/=\n✔️ 20 Photos\n✔️ 2 hrs Shoot\n✔️ Soft Copies Only\n\n> Udavin Wijesundara Photography');
                break;

            case '2.3':
                m.reply('*Event Photography Pricing*\n*Lite*\n✔️ Price: Rs 15000/=\n✔️ Single Photographer\n✔️ 2 hrs\n✔️ 150 Photos\n✔️ Soft Copies Only\n\n> Udavin Wijesundara Photography');
                break;

            case '2.4':
                m.reply('*Photo Editing Pricing*\n✔️ Price: Rs 100/=\n✔️ Per Image\n\n> Udavin Wijesundara Photography');
                break;

            case '2.5':
                m.reply('*Video Editing Pricing*\n✔️ Price: Rs 1000/= Upwards\n\n> Udavin Wijesundara Photography');
                break;

            case '2.6':
                m.reply('*Album Design Pricing*\n✔️ Price: Rs 2500/= Upwards\n\n> Udavin Wijesundara Photography');
                break;

            case '2.7':
                m.reply('*Social Media Post Design Pricing*\n✔️ Price: Rs 1500/= Upwards\n\n> Udavin Wijesundara Photography');
                break;

            case '3':
                const links = [
                    { url: "https://www.facebook.com/profile.php?id=100089528666222", text: "Facebook", preview: true },
                    { url: "https://www.instagram.com/udavin_wijesundara_photography/", text: "Instagram", preview: true },
                    { url: "https://udavinwijesundaraphotography.com/", text: "Official Website", preview: true }
                ];

                for (const link of links) {
                    await fell.sendMessage(m.chat, {
                        text: `${link.text}: ${link.url}`,
                        linkPreview: link.preview
                    }, { quoted: m });
                }
                break;

            case '4':
                m.reply('Please wait, we will contact you soon via WhatsApp.\n\n> Udavin Wijesundara Photography');
                break;

            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return;
                    try {
                        m.reply(require('util').format(eval(`(async () => { return ${budy.slice(3)} })()`)));
                    } catch (e) {
                        m.reply(String(e));
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return;
                    let kode = budy.trim().split(/ +/)[1];
                    let teks;
                    try {
                        teks = /await/i.test(kode) ? eval("(async() => { " + kode + " })()") : eval(kode);
                    } catch (e) {
                        teks = e;
                    } finally {
                        await m.reply(require('util').format(teks));
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return;
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return m.reply(`${err}`);
                        if (stdout) return m.reply(stdout);
                    });
                }
                break;
        }
    } catch (err) {
        console.log(require('util').format(err));
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update ${__filename}`);
    delete require.cache[file];
    require(file);
});
