module.exports = {
    name: "bot-info",
    aliases: ['botinfo', 'about', 'acercade', 'acerca'],
    code: `
        #(send
            #(newEmbed
                #(setTitle #(jsEval d.client.user.username))
                #(setThumbnail #(jsEval d.client.user.displayAvatarURL()))
                #(addField Estadísticas | Servidores: \`#(client guildsCount)\`
                %BR%Usuarios: \`#(client totalUsersCount)\`)
                #(addField Información | Creadora: \`#(getVar owner | bot)\`
                %BR%Librería: \`HyteScript.js #(version)\`)
                #(setFooter Bot en etapa de desarrollo.)
                #(setColor #(getVar blueNotSoSoDark | colors))
            )
        )
    `
}