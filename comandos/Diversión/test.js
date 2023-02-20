module.exports = {
    name: "d",
    code: `
    #(newObject owo | #(httpsGet https://api.miduwu.ga/json/8ball?text=#(encodeURI #(args))&idiom=es | data))
            #(send
                #(newEmbed
                    #(setTitle Bola 8)
                    #(setDescription #(author name) pregunta: 
                    %BR%\`#(args)\`
                    %BR%Respuesta:
                    %BR%#(objectProperty owo | response))
                    #(setColor #(getVar blueNotSoDark | colors))
                )    
            )
    `
}