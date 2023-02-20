module.exports = [{
    name: "help",
    aliases: ['cmds', 'commands', 'comandos', 'ayuda'],
    code: `
    #(send 
        #(newEmbed
            #(setTitle Ayuda de #(jsEval d.client.user.username))
            #(addField Módulos | Anime
            %BR%Configuración
            %BR%Diversión
            %BR%Información
            %BR%Misceláneos
            %BR%Tickets)
            #(setFooter Ejecutado por: #(author tag) | #(author avatar))
            #(setColor #(getVar blueDark | colors))
        )
        #(newActionRow
            #(addSelectMenu Selecciona un módulo | menu_#(author id) | 
                #(addOption Anime | Comandos de anime. | opt1 | false)
                #(addOption Configuración | Comandos para personalizar las caracteristicas del bot. | opt2 | false)
                #(addOption Diversión | Comandos divertidos. | opt3 | false)
                #(addOption Información | Comandos informativos del bot. | opt4 | false)
                #(addOption Misceláneos | Comandos variados del bot. | opt5 | false)
                #(addOption Tickets | Sistema de tickets del bot. | opt6 | false)
            | 1 | 1 | false)
        )
    )
    `
},{
    type: "interaction",
    code: `
    #(if #(includes #(interaction customId) | menu_) == false |
        #(break)
    )
    #(if #(includes #(interaction customId) | #(author id)) == false |
        #(interactionReply 
            #(newEmbed
                #(setTitle Acción denegada.)
                #(setDescription No puedes usar este menú.)
                #(setFooter Intenta a invocar tu propio menú.)
                #(setColor #(getVar redDark | colors))
            )
        | true | false)
        #(break)
    )
    #(if #(interaction selected) == opt1 |
        #(interactionUpdate
            #(newEmbed
                #(setTitle Módulo: Anime)
                #(setDescription **Comandos**
                %BR%\`\`\`angry, blush, cry, happy, sleep\`\`\`)
                #(setFooter #(client name) #(getVar version | bot))
                #(setColor #(getVar blueNotSoSoDark | colors))
            )
        )
    )
    #(if #(interaction selected) == opt2 |
        #(interactionUpdate
            #(newEmbed
                #(setTitle Módulo: Configuración)
                #(setDescription **Comandos**
                %BR%\`\`\`disable-afk, enable-afk, prefix\`\`\`)
                #(setFooter #(client name) #(getVar version | bot))
                #(setColor #(getVar blueNotSoSoDark | colors))
            )
        )
    )
    #(if #(interaction selected) == opt3 |
        #(interactionUpdate
            #(newEmbed
                #(setTitle Módulo: Diversión)
                #(setDescription **Comandos**
                %BR%\`\`\`8ball, ascii, owoify, trivia\`\`\`)
                #(setFooter #(client name) #(getVar version | bot))
                #(setColor #(getVar blueNotSoSoDark | colors))
            )
        )
    )
    #(if #(interaction selected) == opt4 |
        #(interactionUpdate
            #(newEmbed
                #(setTitle Módulo: Información)
                #(setDescription **Comandos**
                %BR%\`\`\`avatar, botinfo, help, serverinfo, userinfo\`\`\`)
                #(setFooter #(client name) #(getVar version | bot))
                #(setColor #(getVar blueNotSoSoDark | colors))
            )
        )
    )
    #(if #(interaction selected) == opt5 |
        #(interactionUpdate
            #(newEmbed
                #(setTitle Módulo: Misceláneos)
                #(setDescription **Comandos**
                %BR%\`\`\`afk, embedbuilder, setgender\`\`\`)
                #(setFooter #(client name) #(getVar version | bot))
                #(setColor #(getVar blueNotSoSoDark | colors))
            )
        )
    )
    #(if #(interaction selected) == opt6 |
        #(interactionUpdate
            #(newEmbed
                #(setTitle Módulo: Tickets)
                #(setDescription **Comandos**
                %BR%\`\`\`disable-tickets, enable-tickets, open, set-ticket-category\`\`\`)
                #(setFooter #(client name) #(getVar version | bot))
                #(setColor #(getVar blueNotSoSoDark | colors))
            )
        )
    )
    `
}]