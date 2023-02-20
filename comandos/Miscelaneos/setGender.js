module.exports = [{
    name: "setgender",
    aliases: ['set-gender', 'elegirgenero', 'elegirsexo', 'setsex'],
    code: `
        #(send
            #(newEmbed
                #(setTitle Elige tu género.)
                #(setDescription Selecciona el menú de abajo.)
                #(setColor #(getVar blueDark | colors))
            )
            #(newActionRow
                #(addSelectMenu Elige tu género | gender_#(author id) | 
                    #(addOption Mujer | Te identificas como mujer. | mujer | false)
                    #(addOption Hombre | Te identificas como hombre. | hombre | false)
                    #(addOption Otro | Cualquier pronunciación. | otro | false)
                | 1 | 1 | false)
            )
        )
    `
},{
    type: "interaction",
    code: `
        #(if #(includes #(interaction customId) | gender_) == false |
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
        #(if #(interaction selected) == mujer |
            #(setUserVar gender | mujer | gender | #(author id))
            #(interactionReply
                #(newEmbed
                    #(setTitle Género configurado.)
                    #(setDescription Tu género se ha modificado como "Mujer".
                    %BR%Los mensajes del bot serán con la pronunciación correspondiente.)
                    #(setFooter #(client name) #(getVar version | bot))
                    #(setColor #(getVar blueNotSoSoDark | colors))
                )
            | true)
        )
        #(if #(interaction selected) == hombre |
            #(setUserVar gender | hombre | gender | #(author id))
            #(interactionReply
                #(newEmbed
                    #(setTitle Género configurado.)
                    #(setDescription Tu género se ha modificado como "Hombre".
                    %BR%Los mensajes del bot serán con la pronunciación correspondiente.)
                    #(setFooter #(client name) #(getVar version | bot))
                    #(setColor #(getVar blueNotSoSoDark | colors))
                )
            | true)
        )
        #(if #(interaction selected) == otro |
            #(setUserVar gender | otro | gender | #(author id))
            #(interactionReply
                #(newEmbed
                    #(setTitle Género configurado.)
                    #(setDescription Tu género se ha modificado como "Otro".
                    %BR%Los mensajes del bot serán con la pronunciación correspondiente.)
                    #(setFooter #(client name) #(getVar version | bot))
                    #(setColor #(getVar blueNotSoSoDark | colors))
                )
            | true)
        )
    `
}]