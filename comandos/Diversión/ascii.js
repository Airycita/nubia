module.exports = {
    name: "ascii",
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
            #(newObject owo | #(httpsGet https://api.miduwu.ga/json/ascii?text=#(encodeURI #(args))))
            #(send \`\`\`#(objectProperty owo | data)\`\`\`)
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