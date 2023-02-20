const { DiscordClient } = require('hytescript.js');

new DiscordClient({
    token: "",
    intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
    prefix: "#(getGuildVar prefix | bot)",
    logErrors: false,
    logJSErrors: true
})
    .addEvents('messageCreate', 'interactionCreate')
    .addStatus({
        text: '#(getVar prefix | bot)help | v#(getVar version | bot)',
        type: 'playing',
        time: '30s'
    })
    .readFolder('comandos')
    .addDatabase('colors', {
        blueDark: "040E80",
        blueNotSoDark: "0E15FF",
        blueSuperDark: "020740",
        blueNotSoSoDark: "080C94",
        redDark: "800003",
        yellowDark: "7D8002",
        greenDark: "0C8008"
    })
    .addDatabase('bot', {
        prefix: "!!",
        version: "0.0.3",
        codename: "A3",
        owner: "_____#0000"
    })
    .addDatabase('rank', {
        XP: "0",
        reqXP: "250",
        level: "0"
    })
    .addDatabase('tickets', {
        category: "",
        isEnabled: "false"
    })
    .addDatabase('gender', {
        gender: "otro"
    })
    .addDatabase('trivia', {
        puntos: "0",
        correcta: "",
        incorrectas: "",
        object: ""
    })
    .addDatabase('afk', {
        estado: 'habilitado',
        razon: '',
        userEstado: 'deshabilitado',
        tiempo: '0'
    })
    .addFunctions({
        name: "encodeURI",
        code: async (d, text) => {
            if(text === undefined) return d.throwError.required(d, "text", text);
            let encoded = encodeURIComponent(text);
            return encoded;
        }
    })
    .addFunctions({
        name: "isValidImageLink",
        code: async (d, link) => {
            const axios = require('axios');
            if(link === undefined) return d.throwError.required(d, "link", link);
            let response = false;
            try {
                response = await axios.get(link).then((res) => res.headers["content-type"].startsWith("image"));
            } catch(err) {
                response = false;
            }
            return response;
        }
    })
    .addFunctions({
        name: "isValidHex",
        code: async (d, hex) => {
            if(hex === undefined) return d.throwError.required(d, "hex color", hex);
            hex = hex.replace('#', '');
            let result = isNaN(parseInt(hex, 16)) ? false : true;
            return result;
        }
    })
    .addFunctions({
        name: "isCategory",
        code: async (d, categoryId, guildId = d.guild?.id) => {
            const guild = d.client.guilds.cache.get(guildId)
            if (!guild) return new d.error("invalid", d, 'guild ID', guildId)
            const channel = guild.channels.cache.get(categoryId)
            if (!channel) return new d.error('invalid', d, 'channel ID', categoryId)
            let result = channel.type === 4 ? true : false;
            //4 = GuildCategory type
            return result;
        }
    })
    .addFunctions({
        name: "translate",
        description: "Translates the given text.",
        usage: "from | to | text",
        parameters: [
            {
                name: "From",
                description: "The language of the given text.",
                optional: "true",
                defaultValue: "none"
            },{
                name: "To",
                description: "The language to translate.",
                optional: "false",
                defaultValue: "none"
            },{
                name: "Text",
                description: "The text to translate.",
                optional: "false",
                defaultValue: "none"
            }
        ],
        code: async (d, from, to, text) => {
            if(from === undefined) return d.throwError.required(d, "from language", from);
            if(to === undefined) return d.throwError.required(d, "target language", to);
            if(text === undefined) return d.throwError.required(d, "text", text);
            const translate = require('translate-google');
            let result = translate(text, {
                from: from,
                to: to
            });
            return result;
        }
    })
    .addCommands({
        type: 'ready',
        code: `
            #(jsEval const color = require('chalk');
                console.log(color.green('¡Sesión iniciada en #(jsEval d.client.user.tag)!'), "|" , color.blue('Versión: #(getVar version | bot)'), "|", color.magenta('Luna Developers'))
            )
            #(newArray guilds | #(allGuilds) | ,)
            #(arrayMap guilds | #(allGuildMembers , | {arrElement}))
        `
    })
    //console.log(color.magenta('Luna Developers'), color.blue('https://discord.gg/fyUwMagxDx'))