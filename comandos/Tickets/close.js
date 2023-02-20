module.exports = [{
    name: "closeTicket",
    type: "buttonInteraction",
    code: `
        #(set gender | #(replace #(replace #(replace #(getUserVar gender | gender | #(author id)) | mujer | a) | hombre | o) | otro | @))
        #(interactionReply
            #(newEmbed
                #(setTitle ¿Estás segur#(get gender) de cerrar el ticket?)
                #(setDescription Usa los botones de abajo para confirmar o cancelar tu acción.)
                #(setColor #(getVar yellowDark | colors))
            )
            #(newActionRow
                #(addButton danger | Confirmar | confirmClose | false | #(getVar box | emojis))
                #(addButton primary | Cancelar | cancelClose | false | #(getVar cross | emojis))
            )
        )
    `
},{
    name: "cancelClose",
    type: "buttonInteraction",
    code: `
        #(interactionUpdate
            #(newEmbed
                #(setTitle Acción cancelada)
                #(setDescription El ticket seguirá abierto.)
                #(setColor #(getVar greenDark | colors))
            )
        | true)
    `
},{
    name: "confirmClose",
    type: "buttonInteraction",
    code: `
        #(deleteChannel)
    `
}]