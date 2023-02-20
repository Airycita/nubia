module.exports = {
    name: "sleep",
    aliases: ['dormir', 'siesta'],
    code: `
        #(try
            #(newObject owo | #(httpsGet https://api.miduwu.ga/anime/gifs/sleep | data))
            #(send
                #(newEmbed
                    #(setAuthor %BAR% #(author name) tiene mucho sueño... parece que irá a dormir. | #(author avatar))
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