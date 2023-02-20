module.exports = {
    name: "happy",
    aliases: ['feliz'],
    code: `
        #(try
            #(newObject owo | #(httpsGet https://api.miduwu.ga/anime/gifs/happy | data))
            #(send
                #(newEmbed
                    #(setAuthor %BAR% #(author name) está muy feliz. | #(author avatar))
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