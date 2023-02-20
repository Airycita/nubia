module.exports = {
    name: "blush",
    aliases: ['sonrrojado', 'sonrrojada'],
    code: `
        #(try
            #(newObject owo | #(httpsGet https://api.miduwu.ga/anime/gifs/blush | data))
            #(set gender | #(replace #(replace #(replace #(getUserVar gender | gender | #(author id)) | mujer | a) | hombre | o) | otro | @))
            #(send
                #(newEmbed
                    #(setAuthor %BAR% ¡#(author name) está roj#(get gender) como un tomate! | #(author avatar))
                    #(setImage #(objectProperty owo | url))
                    #(setFooter Anime: #(objectProperty owo | name))
                    #(setColor #(getVar blueNotSoDark | colors))
                )    
            )
        |
            #(send
                #(newEmbed
                    #(setTitle Error inesperado.)
                    #(setDescription No se pudo obtener respuesta de la API.)
                    #(setColor #(getVar yellowDark | colors))
                )
            )
        )
    `
}