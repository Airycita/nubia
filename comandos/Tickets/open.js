module.exports = [{
    name: "open",
    aliases: ['ticket'],
    code: `
        #(if #(hasPerm ManageChannels | #(client) | #(guild)) == false |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription No tengo permiso para crear canales.
                    %BR%**Permiso requerido:** \`Gestionar canales\`)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(if #(getGuildVar isEnabled | tickets | #(guild id)) == false |
            #(send
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription El sistema de tickets no está encendido.)
                    #(setColor #(getVar redDark | colors))
                )
            )
            #(break)
        )
        #(set razón | #(if #(argsCount) == 0 | Sin razón provista. | #(args)))
        #(set guildChannels | #(allGuildChannels))
        #(set categoría | 
            #(if #(getGuildVar category | tickets | #(guild)) == | 
                undefined 
            | 
                #(getGuildVar category | tickets | #(guild))
            )
        )
        #(try
            #(set channelID | 
                #(createChannel ticket-#(author discriminator) | text |
                    #(setTopic Sistema de tickets #(client name)
                    %BR%Autor: #(author name)
                    %BR%ID: #(author id)
                    %BR%Razón: #(get razón))
                    #(setNSFW false)
                    #(addPermissions everyone | -ViewChannel)
                    #(addPermissions #(author id) | +ViewChannel | +SendMessages | +AttachFiles)
                    #(addPermissions #(client id) | +ViewChannel | +SendMessages)
                    #(if #(includes #(get guildChannels) | #(get categoría)) == true |
                        #(setParent #(getGuildVar category | tickets | #(guild)))
                    )
                | #(guild) | true | #(author tag) abrió un ticket.)
            )
            #(set gender | #(replace #(replace #(replace #(getUserVar gender | gender | #(author id)) | mujer | a) | hombre | o) | otro | @))
            #(send
                <@#(author id)>
                #(newEmbed
                    #(setTitle ¡Bienvenid#(get gender) a tu ticket!)
                    #(setDescription Porfavor, escribe tu problema y todos los detalles mientras un staff te atiende lo más pronto posible.
                    %BR%Si eres staff: 
                    %BR%> #(getVar hand | emojis) Usa el botón "Reclamar" para reclamar el ticket.
                    %BR%Si tu problema ya ha sido resuelto:
                    %BR%> #(getVar box | emojis) Usa el botón "Cerrar" para cerrar el ticket.)
                    #(setColor #(getVar blueDark | colors))
                )
                #(newActionRow
                    #(addButton primary | Reclamar | claimTicket | false | #(getVar hand | emojis))
                    #(addButton danger | Cerrar | closeTicket | false | #(getVar box | emojis))
                )
            | #(get channelID))
        |
            #(send
                #(newEmbed
                    #(setTitle Error inesperado.)
                    #(setDescription Ocurrió un error interno, porfavor reportelo a los desarrolladores.)
                    #(setColor #(getVar redDark | colors))
                )
            )
        )
    `
}]