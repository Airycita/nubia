module.exports = {
    name: "8ball",
    aliases: ['bola8'],
    code: `
        #(if #(argsCount) == 0 | 
            #(send
                #(newEmbed
                    #(setTitle Argumentos faltantes.)
                    #(setDescription ¡Debes escribir un texto!)
                    #(setColor #(getVar redDark | colors))
                )    
            )
            #(break)
        )
        #(try
            #(newObject owo | #(httpsGet https://api.miduwu.ga/json/8ball?text=#(encodeURI #(args))&idiom=es | data))
            #(send
                #(newEmbed
                    #(setTitle Bola 8)
                    #(setThumbnail #(author avatar))
                    #(setDescription #(author name) pregunta: 
                    %BR%\`#(args)\`
                    %BR%Respuesta:
                    %BR%\`#(objectProperty owo | response)\`)
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