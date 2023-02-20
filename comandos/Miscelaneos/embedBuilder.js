module.exports = [{
    name: "embedbuilder",
    aliases: ['embed-builder', 'fabricar-embed', 'fabricarembed', 'construirembed', 'construir-embed'],
    code: `
        #(send
            #(newEmbed
                #(setTitle Constructor de embeds.)
                #(setDescription Presiona el botón "Construir" para fabricar el embed.
                %BR%Presiona el botón "Eliminar" para borrar este mensaje.)
                #(setColor #(getVar blueDark | colors))
                #(newActionRow
                    #(addButton secondary | Construir | buildEmbed_#(author id) | false |#(getVar star | emojis))
                    #(addButton danger | Eliminar | deleteEmbedBuilder_#(author id) | false | #(getVar cross | emojis))
                )
            )
        )
    `
},{
    type: "interaction",
    code: `
        #(if #(includes #(interaction customId) | buildEmbed_) == false |
            #(break)
        )
        #(if #(includes #(interaction customId) | #(author id)) == false |
            #(interactionReply 
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription No puedes usar este botón.)
                    #(setFooter Intenta a invocar tu propio constructor de embeds.)
                    #(setColor #(getVar redDark | colors))
                )
            | true | false)
            #(break)
        )
        #(newModal Embed Builder | embedBuilder | 
            #(newActionRow
                #(addTextInput
                    #(setLabel Titulo)
                    #(setCustomID embedTitle)
                    #(setPlaceholder Escribe un título para el embed.)
                    #(setStyle short)
                    #(setRequired true)
                    #(setLength 1 | 256)
                )
            )
            #(newActionRow
                #(addTextInput
                    #(setLabel Descripción)
                    #(setCustomID embedDescription)
                    #(setPlaceholder Escribe una descripción para el embed.)
                    #(setStyle paragraph)
                    #(setRequired false)
                    #(setLength 1 | 4000)
                )
            )
            #(newActionRow
                #(addTextInput
                    #(setLabel Imagen)
                    #(setCustomID embedImage)
                    #(setPlaceholder Pega el enlace de una imagen.)
                    #(setStyle paragraph)
                    #(setRequired false)
                    #(setLength 1 | 2000)
                )
            )
            #(newActionRow
                #(addTextInput
                    #(setLabel Pie de mensaje)
                    #(setCustomID embedFooter)
                    #(setPlaceholder Escribe un pie de mensaje para el embed.)
                    #(setStyle paragraph)
                    #(setRequired false)
                    #(setLength 1 | 1000)
                )
            )
            #(newActionRow
                #(addTextInput
                    #(setLabel Color)
                    #(setCustomID embedColor)
                    #(setPlaceholder Escribe un color hexadecimal para el embed.)
                    #(setStyle short)
                    #(setRequired false)
                    #(setLength 6 | 6)
                )
            )
        )
    `
},{
    name: "embedBuilder",
    type: "modalSubmitInteraction",
    code: `
        #(set EmbedTitle | #(interaction modalComponent | textInput | embedTitle))
        #(set EmbedDescription | #(interaction modalComponent | textInput | embedDescription))
        #(set EmbedImage | #(interaction modalComponent | textInput | embedImage))
        #(set EmbedFooter | #(interaction modalComponent | textInput | embedFooter))
        #(set EmbedColor | #(interaction modalComponent | textInput | embedColor))
        #(if #(get EmbedColor) != |
            #(if #(isValidHex #(get EmbedColor)) == false |
                #(interactionReply 
                    #(newEmbed
                        #(setTitle Acción denegada.)
                        #(setDescription Debes escribir un color hexadecimal válido.)
                        #(setColor #(getVar redDark | colors))
                    )
                | true | false)
                #(break)
            )
        )
        #(if #(get EmbedImage) != |
            #(if #(isValidImageLink #(get EmbedImage)) == false |
                #(interactionReply 
                    #(newEmbed
                        #(setTitle Acción denegada.)
                        #(setDescription Debes escribir un enlace de imagen válido.)
                        #(setColor #(getVar redDark | colors))
                    )
                | true | false)
                #(break)
            )
        )
        #(interactionReply
            #(newEmbed
                #(setTitle Mensaje enviado.)
                #(setColor #(getVar greenDark | colors))
            )
        | true)
        #(send
            #(newEmbed
                #(setTitle #(get EmbedTitle))
                #(if #(escape #(get EmbedDescription)) != |
                    #(setDescription #(get EmbedDescription))
                )
                #(if #(get EmbedImage) != |
                    #(setImage #(get EmbedImage))
                )
                #(if #(get EmbedFooter) != |
                    #(setFooter #(get EmbedFooter))
                )
                #(if #(get EmbedColor) != |
                    #(setColor #(get EmbedColor))
                )
            )    
        )
    `
},{
    type: "interaction",
    code: `
        #(if #(includes #(interaction customId) | deleteEmbedBuilder_) == false |
            #(break)
        )
        #(if #(includes #(interaction customId) | #(author id)) == false |
            #(interactionReply 
                #(newEmbed
                    #(setTitle Acción denegada.)
                    #(setDescription No puedes usar este botón.)
                    #(setFooter Intenta a invocar tu propio constructor de embeds.)
                    #(setColor #(getVar redDark | colors))
                )
            | true | false)
            #(break)
        )
        #(deleteMessage)
    `
}]