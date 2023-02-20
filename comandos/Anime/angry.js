module.exports = {
    name: "angry",
    aliases: ['enojado', 'enojada'],
    code: `
        #(try
            #(newObject owo | #(httpsGet https://api.miduwu.ga/anime/gifs/angry | data))
            #(set gender | #(replace #(replace #(replace #(getUserVar gender | gender | #(author id)) | mujer | a) | hombre | o) | otro | @))
            #(send
                #(newEmbed
                    #(setAuthor %BAR% ¡#(author name) está enojad#(get gender)! | #(author avatar))
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